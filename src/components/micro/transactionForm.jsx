import { useContext, useRef } from "react";
import { Form, useNavigate } from "react-router-dom";
import { DataContext } from "../../store/store";
import { useForm } from "react-hook-form";

export default function TransactionForm() {
  const { addNewItem } = useContext(DataContext);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    addNewItem(data);
    navigate(-1); // { paymentMethod: 'cash' or 'bank' or 'upi' }
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      method="post"
      className="max-w-xl mx-auto p-6 space-y-4  shadow-md rounded-md"
    >
      <button
        onClick={() => navigate(-1)}
        className="border px-4 py-1 active:scale-85 transition-all"
      >
        goback
      </button>

      <div>
        <label className="block mb-1 font-medium">Transaction Type</label>
        <div className="flex gap-4">
          <label>
            <input {...register("transactionType")} type="radio" value="sold" />{" "}
            Sold
          </label>
          <label>
            <input
              {...register("transactionType")}
              type="radio"
              value="purchased"
            />{" "}
            Purchased
          </label>
        </div>
      </div>

      <div>
        <label className="block mb-1  font-medium">Date</label>
        <input
          {...register("transactionDate")}
          type="date"
          className="w-full p-2  border rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Product Name</label>
        <input
          {...register("productName")}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Quantity</label>
        <input
          {...register("productQuantity")}
          type="number"
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Payment State</label>
        <div className="flex gap-4">
          <label>
            <input {...register("paymentState")} type="radio" value="Paid" />{" "}
            Paid
          </label>
          <label>
            <input {...register("paymentState")} type="radio" value="Due" /> Due
          </label>
        </div>
      </div>

      <div>
        <label className="block mb-1 font-medium">Price Per Unit</label>
        <input
          {...register("pricePerUnit")}
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
              <input
                {...register("paymentMethod")}
                type="radio"
                value={method}
              />{" "}
              {method.charAt(0).toUpperCase() + method.slice(1)}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block mb-1 font-medium">Company ID</label>
        <input
          {...register("companyId")}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Company Name</label>
        <input
          {...register("companyName")}
          className="w-full p-2 border rounded"
        />
      </div>

      <button className="w-full active:scale-80 transition-all bg-blue-600 text-white py-2 rounded hover:bg-blue-700 ">
        Submit
      </button>
    </Form>
  );
}
