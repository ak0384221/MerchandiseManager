import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { DataContext } from "../store/store";

export default function ManagerLayout() {
  const { type } = useParams();
  const { merchandiseData } = useContext(DataContext);

  return (
    <>
      <div className="box border relative  min-h-screen my-5 border-neutral-800 px-5 py-2 overflow-hidden">
        <div className=" flex justify-end items-center">
          <Link
            to="/m-manager/add-new-item"
            className="bg-green-700 px-5 rounded-md py-2 font-bold "
          >
            Add New
          </Link>
        </div>

        <div className="">
          {merchandiseData.map((items, idx) =>
            type === "all" || items?.transactionType === type ? (
              <Link key={idx} to={`transaction/${items?.transactionId}`}>
                <div
                  key={idx}
                  className={`border border-neutral-700 rounded-md p-3 my-2 flex justify-between items-center ${
                    items?.type == "sold" && "bg-neutral-700"
                  }`}
                >
                  <span>{items?.companyName}</span>
                  <span>{items?.transactionType} </span>
                  <span>{items?.productQuantity} </span>
                  <span>{items?.productName} </span>
                  <span
                    className={`px-2 ${
                      items?.paymentState?.toLowerCase().trim() === "paid"
                        ? "bg-green-700"
                        : "bg-red-700"
                    }`}
                  >
                    {items?.paymentState}
                  </span>
                </div>
              </Link>
            ) : null
          )}
        </div>
      </div>
    </>
  );
}
