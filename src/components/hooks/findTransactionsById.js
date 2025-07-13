// useTransactionById.js
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { transactionsRef } from "../../configuration/firebaseConfig";
async function fetchTransactionById(id) {
  const docRef = doc(transactionsRef, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error("Transaction not found");
  }

  return docSnap.data();
}

export const useTransactionById = (id) => {
  return useQuery({
    queryKey: ["transaction", id],
    queryFn: () => fetchTransactionById(id),
    enabled: !!id, // only runs if id is truthy
  });
};
