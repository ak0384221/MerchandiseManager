import { useContext } from "react";
import {
  useSearchParams,
  useParams,
  Form,
  useNavigate,
} from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import { useTransactionById } from "./hooks/findTransactionsById";
import { DataContext } from "../store/store";
import { useForm } from "react-hook-form";

export default function UpdateTransaction() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const update = searchParams.get("update");
  const { id } = useParams();
  const { data, isLoading } = useTransactionById(id);
  const { updateTransaction, totalDue } = useContext(DataContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const totalDueV = totalDue(data?.quantity, data?.unitPrice, data?.totalPaid);
  const totalPrice = data?.quantity * data?.unitPrice;
  if (isLoading || !data) return null;

  const onSubmit = async ({ paymentAmount, paymentMethod, updatedBy }) => {
    await updateTransaction(
      data,
      paymentAmount,
      paymentMethod,
      updatedBy,
      totalPrice,
      totalDueV
    );
    navigate(-1);
  };
  console.log(data);

  return (
    <>
      {update === "true" && (
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="px-1 md:w-3/5 lg:w-1/2 mx-auto h-full"
        >
          <div className="w-full mx-auto space-y-3 font-Inter text-sm border-neutral-500 p-5 bg-[#043235]">
            <IoArrowBackCircle
              className="text-4xl mb-3 active:scale-90 transition-all cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <h2 className="text-2xl font-bold mb-6 text-center pb-2">
              Transaction Update
            </h2>

            <div className="flex justify-between">
              <span className="font-medium">Transaction ID:</span>
              <span>{data.transactionId}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Company Name:</span>
              <span className="font-bold">{data.companyName}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Product Name:</span>
              <span>{data.product}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Transaction Date:</span>
              <span className="text-sm">
                {data.date.toDate().toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Total Due:</span>
              <span className="bg-red-800 text-[#f3efef] px-2 font-semibold">
                {totalDueV?.toLocaleString()}
              </span>
            </div>

            {/* New Payment Amount */}
            <div className="flex justify-between">
              <span className="font-medium">New Received:</span>
              <span className="text-white font-semibold">
                <input
                  type="number"
                  placeholder="amount"
                  {...register("paymentAmount", {
                    required: "Amount is required",
                    min: { value: 1, message: "Minimum is 1" },
                    max: {
                      value: totalDue,
                      message: `Cannot exceed ${totalDueV?.toLocaleString()}`,
                    },
                    valueAsNumber: true,
                  })}
                  onWheel={(e) => e.target.blur()}
                  className="w-30 border-b px-2 focus:outline-0 placeholder:font-extralight bg-transparent"
                />
                {errors.paymentAmount && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.paymentAmount.message}
                  </p>
                )}
              </span>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block mb-3 font-medium">Payment Method</label>
              <div className="flex gap-4 flex-wrap">
                {["cash", "bank", "bkash"].map((method) => (
                  <label key={method} className="flex items-center gap-1">
                    <input
                      type="radio"
                      value={method}
                      {...register("paymentMethod", {
                        required: "Select a payment method",
                      })}
                      className="accent-cyan-500"
                    />
                    {method.charAt(0).toUpperCase() + method.slice(1)}
                  </label>
                ))}
              </div>
              {errors.paymentMethod && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.paymentMethod.message}
                </p>
              )}
            </div>

            {/* Updated By */}
            <div>
              <div className="font-medium">Updated by</div>
              <input
                type="text"
                placeholder="In-charge name"
                {...register("updatedBy", {
                  required: "Updated by name is required",
                  pattern: {
                    value: /^[A-Za-z].*$/,
                    message: "Must start with a letter, not a number",
                  },
                  minLength: {
                    value: 2,
                    message: "Too short",
                  },
                })}
                className="w-full mb-1 py-2 focus:outline-0 placeholder:font-extralight border-b bg-transparent"
              />
              {errors.updatedBy && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.updatedBy.message}
                </p>
              )}
            </div>

            <div className="w-full flex justify-center">
              <button
                type="submit"
                className="bg-[#095358] w-1/2 px-10 py-2 hover:bg-[#3a696d] transition-all rounded-sm active:scale-85"
              >
                Update
              </button>
            </div>
          </div>
        </Form>
      )}
    </>
  );
}
