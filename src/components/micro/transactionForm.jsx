import { useContext, useRef } from "react";
import { Form, useNavigate } from "react-router-dom";
import { DataContext } from "../../store/store";
import { useForm } from "react-hook-form";
import { IoArrowBackCircle } from "react-icons/io5";

export default function TransactionForm() {
  const { addNewItem } = useContext(DataContext);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  function onSubmit(data) {
    addNewItem(data);
    navigate(-1); // { paymentMethod: 'cash' or 'bank' or 'upi' }
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      method="post"
      className="max-w-xl mx-auto p-6 space-y-4  shadow-md rounded-md"
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
            className="w-full p-2 border rounded"
          />
        </div>
        <label className="block mb-1 font-medium my-4">Transaction Type</label>
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
        <input {...register("product")} className="w-full p-2 border rounded" />
      </div>

      <div>
        <label className="block mb-1 font-medium">Quantity</label>
        <input
          {...register("quantity")}
          type="number"
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Payment State</label>
        <div className="flex gap-4">
          <label>
            <input {...register("state")} type="radio" value="Paid" /> Paid
          </label>
          <label>
            <input {...register("state")} type="radio" value="Due" /> Due
          </label>
        </div>
      </div>

      <div>
        <label className="block mb-1 font-medium">Price Per Unit</label>
        <input
          {...register("unitPrice")}
          type="number"
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Total Paid</label>
        <input
          {...register("totalPaid")}
          type="number"
          className="w-full p-2 border rounded"
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

      <button className="w-full active:scale-80 transition-all bg-blue-600 text-white py-2 rounded hover:bg-blue-700 ">
        Submit
      </button>
    </Form>
  );
}
