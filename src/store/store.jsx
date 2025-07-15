import { useQuery } from "@tanstack/react-query";
import {
  addDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { transactionsRef } from "../configuration/firebaseConfig";

export const DataContext = createContext([]);

export default function DataContextProvider({ children }) {
  const [dataObj, setDataObj] = useState({
    data: [],
    isLoading: false,
    isError: false,
  });
  const [filter, setFilter] = useState({
    state: "all",
    type: "all",
    orderBy: "desc",
  });

  useEffect(() => {
    let q = transactionsRef;

    if (filter.type && filter.type !== "all") {
      q = query(q, where("type", "==", filter.type));
    }
    // Apply "state" filter if it's not "all"

    if (filter.state && filter.state !== "all") {
      q = query(q, where("state", "==", filter.state));
    }

    if (filter.orderBy && filter.orderBy == "desc") {
      q = query(q, orderBy("date", "desc"));
    }
    if (filter.orderBy && filter.orderBy == "asc") {
      q = query(q, orderBy("date", "asc"));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setDataObj((prev) => {
        return {
          ...prev,
          data: docs,
        };
      });
    });

    return () => unsubscribe();
  }, [filter]);

  function formatDate(timestamp) {
    const date = timestamp?.toDate(); // Convert Firestore Timestamp to JS Date
    const day = date?.getDate();
    const month = date?.getMonth() + 1; // JS months are 0-indexed
    const year = date?.getFullYear()?.toString()?.slice(-2); // Last 2 digits
    return `${day}/${month}/${year}`;
  }
  function formatToK(num) {
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num.toString();
  }

  async function addNewItem(obj) {
    console.log(obj);
    const newObj = {
      ...obj,
      date: serverTimestamp(),
      updateHistory: [],
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
  function totalDue(quantity, unitPrice, paid) {
    const totalPrice = unitPrice * quantity;
    return totalPrice - paid;
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
      prevDue: totalDue,
      newDue: totalDue - paymentAmount,
    };

    const obj = {
      ...data,
      totalPaid: finalPayment,
      state: finalPayment == totalPrice ? "paid" : "pending",
      updateHistory: [...data.updateHistory, historyObj],
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
        dataObj,
        filter,
        addNewItem,
        updateTransaction,
        formatDate,
        totalDue,
        setFilter,
        formatToK,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
