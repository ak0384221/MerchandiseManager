import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { DataContext } from "../store/store";

export default function ManagerLayout() {
  const { type } = useParams();
  const { data, isPending, error } = useContext(DataContext);
  console.log(data);
  ``;
  return (
    <>
      <div className="box border relative  min-h-screen my-5 border-neutral-800 px-5 py-2 overflow-hidden">
        <div className=" flex justify-end items-center">
          <Link
            to="/m-manager/add-new-item"
            className="bg-green-700 px-3 text-sm rounded-md py-2 font-bold "
          >
            Add
          </Link>
        </div>
        {isPending && <div>loading</div>}
        {data && (
          <div className="">
            {data?.map((items, idx) =>
              type === "all" || items?.type === type ? (
                <Link key={idx} to={`transaction/${items?.transactionId}`}>
                  <div
                    key={idx}
                    className={`border border-neutral-700 rounded-md p-3 my-2 flex justify-between items-center`}
                  >
                    <span>{items?.companyName}</span>
                    <span>{items?.type} </span>
                    <span>{items?.quantity} </span>
                    <span>{items?.product} </span>
                    <span
                      className={`px-2 ${
                        items?.state?.toLowerCase().trim() === "paid"
                          ? "bg-green-700"
                          : "bg-red-700"
                      }`}
                    >
                      {items?.state}
                    </span>
                  </div>
                </Link>
              ) : null
            )}
          </div>
        )}

        {error && <p>some error</p>}
      </div>
    </>
  );
}
