import { createContext, useState } from "react";

export const DataContext = createContext([]);

export default function DataContextProvider({ children }) {
  const [merchandiseData, setMerchandiseData] = useState([
    {
      transactionId: "154hjgbcvdfvcd",
      transactionType: "sold",
      transactionDate: "2025-07-09",
      productName: "Oppo F3",
      productQuantity: 12,
      paymentState: "Due",
      pricePerUnit: 13000,
      totalPaid: 10000,
      paymentMethod: "cash",
      companyId: "ghfdewvfdewbfv44",
      companyName: "KBV Merchandise",
    },
  ]);

  function addNewItem(newItemObj) {
    setMerchandiseData((prev) => {
      const newItem = [...prev, newItemObj];
      return newItem;
    });
  }

  return (
    <DataContext.Provider value={{ merchandiseData, addNewItem }}>
      {children}
    </DataContext.Provider>
  );
}
