import { useNavigate, useParams } from "react-router-dom";
import { useTransactionById } from "../hooks/findTransactionsById";
import PrevNavigation from "../micro/PrevNavigation";
import UpdateHistory from "./updateHistory";

export default function History() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isPending } = useTransactionById(id);
  let totalPrice = data?.unitPrice * data?.quantity;
  let totalDue = totalPrice - data?.totalPaid;
  return (
    <>
      <div className=" dark:bg-black dark:text-white min-h-screen">
        <div className=" p-4 md:w-3/5 lg:w-1/2  mx-auto">
          <PrevNavigation />

          <div className=" mx-auto  text-sm font-Inter  border border-neutral-700 p-4">
            <h2 className="text-2xl font-bold mb-4  my-2">
              Transaction Details
            </h2>
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

          {data?.updateHistory.length > 0 && (
            <h1 className="text-xl font-bold text-center mt-[5vh] font-Inter">
              Update history
            </h1>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 my-5 gap-5">
            {data?.updateHistory?.map((item, index) => (
              <UpdateHistory item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
