import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import { useContext } from "react";
import { DataContext } from "../store/store";

export default function TransactionList() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { merchandiseData } = useContext(DataContext);
  const selectedCompany = merchandiseData.find(
    (item) => item?.transactionId === id
  );

  let totalPrice =
    selectedCompany?.pricePerUnit * selectedCompany?.productQuantity;
  let totalDue = totalPrice - selectedCompany?.totalPaid;

  return (
    <>
      <div className="w-full min-h-screen">
        <IoArrowBackCircle
          className="text-4xl m-5 active:scale-85 transition-all"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-3xl text-center font-bold">
          {selectedCompany?.companyName}
        </h1>
        <div className="max-w-md mx-auto p-6">
          <h2 className="text-xl font-bold mb-4">Transaction Details</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Type:</span>
              <span className="font-bold text-yellow-500 uppercase ">
                {selectedCompany?.transactionType}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Date:</span>
              <span>{selectedCompany?.transactionDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Product:</span>
              <span>{selectedCompany?.productName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">State:</span>
              <span
                className={`px-2 ${
                  selectedCompany?.paymentState?.toLowerCase() === "paid"
                    ? "bg-green-700"
                    : "bg-red-700"
                }`}
              >
                {selectedCompany?.paymentState}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Price/unit:</span>
              <span>{selectedCompany?.pricePerUnit?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Quantity:</span>
              <span>{selectedCompany?.productQuantity}</span>
            </div>
            <hr />
            <div className="flex justify-between">
              <span className="font-medium">Price in total:</span>
              <span className="text-yellow-500">
                {(
                  selectedCompany?.pricePerUnit *
                  selectedCompany?.productQuantity
                )?.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Total paid:</span>
              <span className="text-green-500">
                {selectedCompany?.totalPaid?.toLocaleString()}
              </span>
            </div>
            <hr />
            <div className="flex justify-between">
              <span className="font-medium">Total due:</span>
              <span className="text-red-600 font-bold bg-white px-2">
                {(
                  selectedCompany?.pricePerUnit *
                    selectedCompany?.productQuantity -
                  selectedCompany?.totalPaid
                )?.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Company ID:</span>
              <span>{selectedCompany?.companyId}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Company Name:</span>
              <span>{selectedCompany?.companyName}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center gap-5">
          <button className="px-5 py-2 border rounded-3xl active:scale-85 transition-all">
            update
          </button>
          <button className="px-5 py-2 border rounded-3xl active:scale-85 transition-all">
            Print
          </button>
        </div>
      </div>
    </>
  );
}
