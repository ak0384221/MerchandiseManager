import { Link, useParams } from "react-router-dom";
import { DataContext } from "../store/store";
import { useContext } from "react";
import { useTransactionById } from "./hooks/findTransactionsById";
import PrevNavigation from "./micro/PrevNavigation";

export default function TransactionDetails() {
  const { id } = useParams();
  const { data, isPending } = useTransactionById(id);
  const { totalDue } = useContext(DataContext);
  return (
    <div className="w-full border border-transparent  md:w-3/5 lg:w-1/2 mx-auto   text-sm font-Inter    ">
      <div className="md:border border-neutral-800 my-7 p-5">
        <PrevNavigation />
        <h2 className="text-2xl font-bold mb-4  ">Transaction Details</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Company Name:</span>
            <span className="uppercase font-bold text-md">
              {data?.companyName}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Type:</span>
            <span className="font-bold text-yellow-500 uppercase ">
              {data?.type}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Date:</span>
            <span>{data?.date.toDate().toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Product:</span>
            <span>{data?.product}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">State:</span>
            <span
              className={`px-2 text-white  ${
                data?.state?.toLowerCase() === "paid"
                  ? "bg-green-700"
                  : "bg-red-700"
              }`}
            >
              {data?.state}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Payment Method:</span>
            <span className="text-green-500">{data?.payBy}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Price/unit:</span>
            <span>{data?.unitPrice?.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Quantity:</span>
            <span>{data?.quantity}</span>
          </div>
          <hr />
          <div className="flex justify-between">
            <span className="font-medium">Price in total:</span>
            <span className="text-yellow-300">
              {(data?.unitPrice * data?.quantity)?.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Total paid:</span>
            <span className="text-green-500">
              {data?.totalPaid?.toLocaleString()}
            </span>
          </div>
          <hr />
          <div className="flex justify-between">
            <span className="font-medium">Total due:</span>
            <span className="text-red-800 font-bold bg-white px-2">
              {totalDue(
                data?.quantity,
                data?.unitPrice,
                data?.totalPaid
              )?.toLocaleString()}
            </span>
          </div>
        </div>
        <div className="flex justify-center items-center gap-5 mt-5 ">
          {totalDue(data?.quantity, data?.unitPrice, data?.totalPaid) > 0 && (
            <Link
              className="w-1/2"
              to={{
                pathname: `/m-manager/transaction/${data?.transactionId}/edit`,
                search: "?update=true",
              }}
            >
              <button className="h-10 w-full text-white bg-[#12415a] rounded-sm hover:bg-[#0076b681] active:scale-85 transition-all">
                Update
              </button>
            </Link>
          )}
          <button
            onClick={() => window.print()}
            className="w-1/2  text-white flex justify-center items-center h-10  bg-[#094347]  rounded-sm hover:bg-[#395d66fa] active:scale-85 transition-all"
          >
            Print
          </button>
        </div>
      </div>
    </div>
  );
}
