import { useContext, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Form, useNavigate } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import { useTransactionById } from "./hooks/findTransactionsById";
import { DataContext } from "../store/store";
//
export default function UpdateTransaction() {
  //
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const update = searchParams.get("update");
  const { id } = useParams(); // ✅ returns the value of ":id"
  const { data, isLoading, isError, error } = useTransactionById(id);
  //
  const paymentAmountEl = useRef();
  const paymentMethodEl = useRef();
  const updatedByEl = useRef();
  const { updateTransaction } = useContext(DataContext);
  //
  const totalPrice = data?.unitPrice * data?.quantity;
  const totalDue = totalPrice - data?.totalPaid;
  async function updatedForm(evt) {
    evt.preventDefault();
    const paymentAmount = Number(paymentAmountEl.current.value);
    const paymentMethod = paymentMethodEl.current.value;
    const updatedBy = updatedByEl.current.value;

    await updateTransaction(
      data,
      paymentAmount,
      paymentMethod,
      updatedBy,
      totalPrice,
      totalDue
    );
  }

  return (
    <>
      {update == "true" && (
        <Form
          onSubmit={updatedForm}
          className="w-4/5 md:w-3/5  lg:w-1/2 py-10 mx-auto h-full  "
        >
          <div className="w-full mx-auto space-y-3  border-neutral-500 p-5 bg-[#043235]">
            <IoArrowBackCircle
              className="text-4xl  mb-3 active:scale-90 transition-all"
              onClick={() => navigate(-1)}
            />
            <h2 className="text-2xl font-bold mb-6 text-center  pb-2">
              Transaction Update
            </h2>

            <div className="flex justify-between  ">
              <span className="font-medium">Transaction ID:</span>
              <span className="">{data?.transactionId}</span>
            </div>

            <div className="flex justify-between  ">
              <span className="font-medium">Company Name:</span>
              <span className="font-bold">{data?.companyName}</span>
            </div>

            <div className="flex justify-between  ">
              <span className="font-medium">Product Name:</span>
              <span className="">{data?.product}</span>
            </div>

            <div className="flex justify-between  ">
              <span className="font-medium">Transaction Date:</span>
              <span className="text-sm">
                {data?.date.toDate().toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between  ">
              <span className="font-medium">Total Due:</span>
              <span className="bg-red-800  text-[#f3efef]  px-2 font-semibold">
                {totalDue.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between  ">
              <span className="font-medium">New received:</span>
              <span className="text-white font-semibold">
                <input
                  ref={paymentAmountEl}
                  type="number"
                  onWheel={(e) => e.target.blur()}
                  placeholder="amount"
                  className=" w-30 border-b px-2 focus:outline-0 placeholder:font-extralight "
                />
              </span>
            </div>
            <div>
              <label className="block mb-3 font-medium">Payment Method</label>
              <div className="flex gap-4 flex-wrap">
                {["cash", "bank", "bkash"].map((method) => (
                  <label key={method}>
                    <input
                      type="radio"
                      ref={paymentMethodEl}
                      name="paymentMethod"
                      value={method}
                    />{" "}
                    {method.charAt(0).toUpperCase() + method.slice(1)}
                  </label>
                ))}
              </div>
            </div>
            <div className="">
              <div className="font-medium">Updated by</div>
              <span className="text-white font-semibold">
                <input
                  placeholder="In-charge name"
                  ref={updatedByEl}
                  type="text"
                  className=" w-full mb-1 py-2 focus:outline-0 placeholder:font-extralight border-b"
                />
              </span>
            </div>
            <div className=" w-full flex justify-center">
              <button
                onClick={() => navigate(-1)}
                className="bg-[#095358] px-10 py-2  hover:bg-[#3a696d] transition-all rounded-sm active:scale-85"
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
