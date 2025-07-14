import { Link } from "react-router-dom";

export default function TransactionDetails({ data }) {
  let totalPrice = data?.unitPrice * data?.quantity;
  let totalDue = totalPrice - data?.totalPaid;
  return (
    <>
      <div className="w-full  mx-auto p-6 bg-[#043235] text-sm font-Inter  ">
        <h2 className="text-2xl font-bold mb-4  my-2">Transaction Details</h2>
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
              className={`px-2  ${
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
              {totalDue.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center gap-5 mt-5 my-5">
        {totalDue !== 0 && (
          <Link
            to={{
              pathname: `/m-manager/${data?.type}/transaction/${data?.transactionId}/edit`,
              search: "?update=true",
            }}
          >
            <button className="w-25 h-8  bg-[#0077b6] rounded-sm hover:scale-95 active:scale-85 transition-all">
              Update
            </button>
          </Link>
        )}
        <button
          onClick={() => window.print()}
          className="w-25 flex justify-center items-center h-8  bg-[#094347]  rounded-sm hover:bg-[#395d66fa] active:scale-85 transition-all"
        >
          Print
        </button>
      </div>
    </>
  );
}
