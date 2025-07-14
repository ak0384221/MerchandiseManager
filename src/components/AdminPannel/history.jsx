import { useNavigate, useParams } from "react-router-dom";
import { useTransactionById } from "../hooks/findTransactionsById";
import { IoArrowBackCircle } from "react-icons/io5";

export default function History() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isPending } = useTransactionById(id);
  let totalPrice = data?.unitPrice * data?.quantity;
  let totalDue = totalPrice - data?.totalPaid;
  return (
    <>
      <div className=" p-5">
        <IoArrowBackCircle
          className="text-4xl print:hidden hover:scale-110 mx-3 mb-3 active:scale-90 transition-all"
          onClick={() => navigate(-1)}
        />

        <div className="w-full md:w-3/5 lg:w-1/2  mx-auto p-6 bg-[#043235] text-sm font-Inter  ">
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
              <span className="font-medium">Price/unit:</span>
              <span>৳ {Number(data?.unitPrice)?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Quantity:</span>
              <span>{data?.quantity}</span>
            </div>
            <hr />
            <div className="flex justify-between">
              <span className="font-medium">Price in total:</span>
              <span className="text-yellow-300">
                ৳ {(data?.unitPrice * data?.quantity)?.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Total paid:</span>
              <span className="text-green-500">
                ৳ {data?.totalPaid?.toLocaleString()}
              </span>
            </div>
            <hr />
            <div className="flex justify-between">
              <span className="font-medium">Total due:</span>
              <span className="text-red-800 font-bold bg-white px-2">
                ৳ {totalDue?.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center my-2">Update history</h1>
        {data?.updateHistory?.map((item) => (
          <div className="bg-[#043235] rounded-xl shadow-md  p-4 w-full md:w-3/5 lg:w-1/3 mx-auto mt-5 ">
            <h2 className="text-lg font-semibold mb-2">Payment Info</h2>

            <div className="flex justify-between text-sm">
              <span className="font-medium">In Charge:</span>
              <span className="">{item?.InCharge}</span>
            </div>

            <div className="flex justify-between text-sm mt-1">
              <span className="font-medium">Date:</span>
              <span className="">
                {new Date(Number(item?.date)).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="font-medium">Prev Due:</span>
              <span className="text-green-500 font-medium">
                ৳{item?.prevDue?.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between text-sm mt-1">
              <span className="font-medium">Payment:</span>
              <span className="text-green-600 font-semibold">
                ৳ {item?.paymentAmount.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between text-sm mt-1">
              <span className="font-medium">Method:</span>
              <span className=" capitalize">{item?.paymentMethod}</span>
            </div>

            <div className="flex justify-between text-sm mt-1">
              <span className="font-medium">Due Left:</span>
              <span className="text-red-500">
                {item?.newDue === 0 ? "Cleared" : `৳${item?.newDue}`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
