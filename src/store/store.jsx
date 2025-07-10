import { useQuery } from "@tanstack/react-query";
import { addDoc, getDocs, serverTimestamp, setDoc } from "firebase/firestore";
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
      return snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
    } catch (err) {
      return "some err", err;
    }
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
        { ...newObj, transacionId: docRef.id },
        { merge: true }
      );
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <DataContext.Provider value={{ data, isPending, error, addNewItem }}>
      {children}
    </DataContext.Provider>
  );
}
