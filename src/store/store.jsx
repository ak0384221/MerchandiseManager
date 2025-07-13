import { useQuery } from "@tanstack/react-query";
import {
  addDoc,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { createContext, useState } from "react";
import { transactionsRef } from "../configuration/firebaseConfig";

export const DataContext = createContext([]);

export default function DataContextProvider({ children }) {
  const { data, isPending, error } = useQuery({
    queryKey: ["transactionData"],
    queryFn: fetchTransactions,
  });

  async function fetchTransactions() {
    try {
      const snapshot = await getDocs(transactionsRef);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (err) {
      console.error("Error fetching transactions:", err);
      throw err;
    }
  }
  function formatDate(timestamp) {
    const date = timestamp.toDate(); // Convert Firestore Timestamp to JS Date
    const day = date.getDate();
    const month = date.getMonth() + 1; // JS months are 0-indexed
    const year = date.getFullYear().toString().slice(-2); // Last 2 digits

    return `${day}/${month}/${year}`;
  }

  async function addNewItem(obj) {
    const newObj = {
      ...obj,
      date: serverTimestamp(),
    };
    try {
      const docRef = await addDoc(transactionsRef, newObj);
      await setDoc(
        docRef,
        { ...newObj, transactionId: docRef.id },
        { merge: true }
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function updateTransaction(
    data,
    paymentAmount,
    paymentMethod,
    updatedBy,
    totalPrice,
    totalDue
  ) {
    console.log(data);
    const finalPayment = Number(data?.totalPaid) + paymentAmount;

    const historyObj = {
      date: Date.now(),
      paymentAmount,
      paymentMethod,
      InCharge: updatedBy,
      newDue: totalDue - paymentAmount,
    };

    const obj = {
      ...data,
      totalPaid: finalPayment,
      state: finalPayment == totalPrice ? "paid" : "due",
      updateHistory: [historyObj],
    };
    const docRef = doc(transactionsRef, data?.transactionId); // ✅ Step 2
    await updateDoc(docRef, obj) // ✅ Step 3
      .then(() => {
        console.log("Document updated successfully.");
      })
      .catch((err) => {
        console.error("Error updating document:", err);
      });
  }

  return (
    <DataContext.Provider
      value={{
        data,
        isPending,
        error,
        addNewItem,
        updateTransaction,
        formatDate,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
