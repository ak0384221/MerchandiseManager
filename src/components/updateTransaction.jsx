import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { Form, useNavigate } from "react-router-dom";
import { db, transactionsRef } from "../configuration/firebaseConfig";
import { IoArrowBackCircle } from "react-icons/io5";
export default function UpdateTransaction({
  selectedCompany,
  totalPrice,
  totalDue,
}) {
  const paymentAmountEl = useRef();
  const paymentMethodEl = useRef();
  const updatedByEl = useRef();
  const navigate = useNavigate();

  async function updatedForm(evt) {
    evt.preventDefault();
    const paymentAmount = Number(paymentAmountEl.current.value);
    const paymentMethod = paymentMethodEl.current.value;
    const updatedBy = updatedByEl.current.value;
    const finalPayment = Number(selectedCompany?.totalPaid) + paymentAmount;

    const newObj = {
      date: Date.now(),
      paymentAmount,
      paymentMethod,
      InCharge: updatedBy,
      newDue: totalDue - paymentAmount,
    };

    const obj = {
      ...selectedCompany,
      totalPaid: finalPayment,
      state: finalPayment == totalPrice ? "paid" : "due",
      updateHistory: [newObj],
    };
    const docRef = doc(transactionsRef, selectedCompany.transactionId); // ✅ Step 2

    await updateDoc(docRef, obj) // ✅ Step 3
      .then(() => {
        console.log("Document updated successfully.");
      })
      .catch((err) => {
        console.error("Error updating document:", err);
      });
  }
  console.log(selectedCompany);

  return (
    <>
      <Form
        onSubmit={updatedForm}
        className=" w-full mx-auto h-full text-neutral-200 "
      >
        <div className="w-full mx-auto space-y-3  border-neutral-500 p-5 bg-[#065A60]">
          <IoArrowBackCircle
            className="text-4xl  mb-3 active:scale-90 transition-all"
            onClick={() => navigate(-1)}
          />
          <h2 className="text-2xl font-bold mb-6 text-center  pb-2">
            Transaction Update
          </h2>

          <div className="flex justify-between  ">
            <span className="font-medium">Transaction ID:</span>
            <span className="">{selectedCompany?.transactionId}</span>
          </div>

          <div className="flex justify-between  ">
            <span className="font-medium">Company Name:</span>
            <span className="font-bold">{selectedCompany?.companyName}</span>
          </div>

          <div className="flex justify-between  ">
            <span className="font-medium">Product Name:</span>
            <span className="">{selectedCompany?.product}</span>
          </div>

          <div className="flex justify-between  ">
            <span className="font-medium">Transaction Date:</span>
            <span className="">
              {selectedCompany?.date.toDate().toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between  ">
            <span className="font-medium">Total Due:</span>
            <span className="bg-red-800  text-[#f3efef]  px-2 font-semibold">
              {totalDue}
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
              className="bg-[#16828a] px-10 py-2  hover:scale-105 transition-all rounded-sm active:scale-85"
            >
              Update
            </button>
          </div>
        </div>
      </Form>
    </>
  );
}
