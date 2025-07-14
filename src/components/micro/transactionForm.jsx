import { useContext, useRef, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { DataContext } from "../../store/store";
import { useForm } from "react-hook-form";
import { IoIosCloseCircle } from "react-icons/io";
import ConfirmTransactionModal from "../portals/confirmTransaction";

export default function TransactionForm() {
  const { addNewItem } = useContext(DataContext);
  const { register, handleSubmit, watch } = useForm();
  const [isWarningOpen, setWarningOpen] = useState(false);
  const [data, setData] = useState();
  const navigate = useNavigate();

  const totalPaid = watch("totalPaid") || 0;
  const quantity = watch("quantity") || 0;
  const unitPrice = watch("unitPrice") || 0;
  const total = Number(quantity) * Number(unitPrice);
  const due = Number(total) - Number(totalPaid);

  function onSubmit(data) {
    const finalData = {
      ...data,
      state:
        data?.quantity * data?.unitPrice == data?.totalPaid
          ? "paid"
          : "pending",
    };
    setData(finalData);
    setWarningOpen(true);
  }

  return (
    <>
      <div className="px-2 md:px-5 lg:w-1/2 mx-auto py-6 relative">
        <Form
          onSubmit={handleSubmit(onSubmit)}
          method="post"
          className="p-6 rounded-lg bg-[#032a2e] shadow-lg space-y-6 text-sm font-Inter text-white"
        >
          <div className="flex items-center gap-3 mb-4">
            <IoIosCloseCircle
              className="absolute  top-0 right-0 m-2 text-4xl hover:text-cyan-400 active:scale-90 transition-all cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <h2 className="text-xl font-semibold tracking-wide">
              New Transaction
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Company Name */}
            <div className="md:col-span-2">
              <label className="block mb-1 font-medium">Company Name</label>
              <input
                {...register("companyName")}
                className="w-full px-3 py-2 rounded-md bg-[#094247] focus:outline-none "
                placeholder="e.g. Sonali Bank"
              />
            </div>

            {/* Transaction Type */}
            <div className="md:col-span-2">
              <label className="block mb-1 font-medium">Transaction Type</label>
              <div className="flex gap-6 text-sm text-neutral-200">
                {["sold", "purchased"].map((type) => (
                  <label key={type} className="flex items-center gap-1">
                    <input
                      {...register("type")}
                      type="radio"
                      value={type}
                      className="accent-cyan-500"
                    />
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </label>
                ))}
              </div>
            </div>

            {/* Product */}
            <div>
              <label className="block mb-1 font-medium">Product Name</label>
              <input
                {...register("product")}
                className="w-full px-3 py-2 rounded-md bg-[#094247] focus:outline-none "
                placeholder="e.g. Leather Shoes"
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block mb-1 font-medium">Quantity</label>
              <input
                {...register("quantity", { valueAsNumber: true })}
                type="number"
                onWheel={(e) => e.target.blur()}
                className="w-full px-3 py-2 rounded-md bg-[#094247] focus:outline-none "
              />
            </div>

            {/* Unit Price */}
            <div>
              <label className="block mb-1 font-medium">Price Per Unit</label>
              <input
                {...register("unitPrice", { valueAsNumber: true })}
                type="number"
                onWheel={(e) => e.target.blur()}
                className="w-full px-3 py-2 rounded-md bg-[#094247] focus:outline-none "
              />
            </div>

            {/* Paid */}
            <div>
              <label className="block mb-1 font-medium">Paid Amount</label>
              <input
                {...register("totalPaid", { valueAsNumber: true })}
                type="number"
                onWheel={(e) => e.target.blur()}
                className="w-full px-3 py-2 rounded-md bg-[#094247] focus:outline-none "
              />
            </div>

            {/* Total & Due */}
            <div className="md:col-span-2 text-neutral-300 text-sm">
              <p>
                Total amount:{" "}
                <span className="text-white font-semibold">
                  {total.toLocaleString()}
                </span>
              </p>
              <p>
                Due amount:{" "}
                <span className="text-white font-semibold">
                  {due.toLocaleString()}
                </span>
              </p>
            </div>

            {/* Payment Method */}
            <div className="md:col-span-2">
              <label className="block mb-1 font-medium">Payment Method</label>
              <div className="flex gap-6 text-sm text-neutral-200">
                {["cash", "bank", "bkash"].map((method) => (
                  <label key={method} className="flex items-center gap-1">
                    <input
                      {...register("payBy")}
                      type="radio"
                      value={method}
                      className="accent-cyan-500"
                    />
                    {method.charAt(0).toUpperCase() + method.slice(1)}
                  </label>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="md:col-span-2">
              <button className="w-full py-2 rounded-md bg-cyan-600 hover:bg-cyan-700 text-white font-medium active:scale-95 transition-transform">
                Submit Transaction
              </button>
            </div>
          </div>
        </Form>

        <ConfirmTransactionModal
          isOpen={isWarningOpen}
          onClose={setWarningOpen}
          onConfirm={addNewItem}
          data={data}
        />
      </div>
    </>
  );
}
