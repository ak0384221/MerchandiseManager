import { useContext, useRef, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { DataContext } from "../../store/store";
import { useForm } from "react-hook-form";
import { IoArrowBackCircle } from "react-icons/io5";
import ConfirmTransactionModal from "../portals/confirmTransaction";

export default function TransactionForm() {
  const { addNewItem } = useContext(DataContext);
  const { register, handleSubmit } = useForm();
  const [isWarningOpen, setWarningOpen] = useState(false);
  const [data, setData] = useState();
  const navigate = useNavigate();
  function onSubmit(data) {
    const finalData = {
      ...data,
      state:
        data?.quantity * data?.unitPrice === data?.totalPaid ? "paid" : "due",
    };
    setData(finalData);
    setWarningOpen(true);
  }

  return (
    <>
      <div className=" w-4/5 mx-auto  py-5 ">
        <Form
          onSubmit={handleSubmit(onSubmit)}
          method="post"
          className=" mx-auto p-5 bg-[#065A60] space-y-4  shadow-md "
        >
          <IoArrowBackCircle
            className="text-4xl mb-5 active:scale-85 transition-all"
            onClick={() => navigate(-1)}
          />

          <div>
            <div>
              <label className="block mb-1 font-medium">Company Name</label>
              <input
                {...register("companyName")}
                className="w-full focus:outline-0 border-b border-neutral-300 "
              />
            </div>
            <label className="block mb-1 font-medium my-4">
              Transaction Type
            </label>
            <div className="flex gap-4">
              <label>
                <input {...register("type")} type="radio" value="sold" /> Sold
              </label>
              <label>
                <input {...register("type")} type="radio" value="purchased" />{" "}
                Purchased
              </label>
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Product Name</label>
            <input
              {...register("product")}
              className="w-full focus:outline-0 border-b border-neutral-300 "
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Quantity</label>
            <input
              {...register("quantity")}
              type="number"
              onWheel={(e) => e.target.blur()}
              className="w-full focus:outline-0 border-b border-neutral-300 "
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Price Per Unit</label>
            <input
              {...register("unitPrice")}
              type="number"
              onWheel={(e) => e.target.blur()}
              className="w-full focus:outline-0 border-b border-neutral-300 "
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Total Paid</label>
            <input
              {...register("totalPaid")}
              type="number"
              onWheel={(e) => e.target.blur()}
              className="w-full focus:outline-0 border-b border-neutral-300 "
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Payment Method</label>
            <div className="flex gap-4 flex-wrap">
              {["cash", "bank", "bkash"].map((method) => (
                <label key={method}>
                  <input {...register("payBy")} type="radio" value={method} />{" "}
                  {method.charAt(0).toUpperCase() + method.slice(1)}
                </label>
              ))}
            </div>
          </div>

          <button className="w-full active:scale-80 transition-all bg-blue-600 text-white py-2  hover:bg-blue-700 ">
            Submit
          </button>
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
