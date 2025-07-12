import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import { useContext, useState } from "react";
import { DataContext } from "../store/store";
import UpdateTransaction from "./updateTransaction";
import TransactionDetails from "./TransactionDetails";

export default function TransactionList() {
  const navigate = useNavigate();
  const [isUpdate, setUpdate] = useState(false);
  const { data, isPending } = useContext(DataContext);
  const { id } = useParams();
  const selectedCompany = data.find((item) => item?.transactionId == id);
  let totalPrice = selectedCompany?.unitPrice * selectedCompany?.quantity;
  let totalDue = totalPrice - selectedCompany?.totalPaid;
  console.log(selectedCompany);
  return (
    <>
      {selectedCompany ? (
        isUpdate ? (
          <UpdateTransaction
            selectedCompany={selectedCompany}
            totalPrice={totalPrice}
            totalDue={totalDue}
          />
        ) : (
          <>
            <TransactionDetails
              selectedCompany={selectedCompany}
              totalPrice={totalPrice}
              totalDue={totalDue}
            />
            <div className="flex justify-center items-center gap-5 mt-2 ">
              {totalDue !== 0 && (
                <button
                  onClick={() => setUpdate(true)}
                  className="w-25 h-8  bg-green-700 rounded-sm hover:scale-90 active:scale-85 transition-all"
                >
                  Update
                </button>
              )}
              <button className="w-25 h-8  bg-blue-700 rounded-sm hover:scale-90 active:scale-85 transition-all">
                Print
              </button>
            </div>
          </>
        )
      ) : null}
    </>
  );
}
