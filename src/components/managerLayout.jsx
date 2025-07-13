import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { DataContext } from "../store/store";
import { FaCirclePlus } from "react-icons/fa6";

export default function ManagerLayout() {
  const { type } = useParams();
  const { data, isPending, error } = useContext(DataContext);
  console.log(data);
  ``;
  return (
    <>
      <div className="box  relative  min-h-screen  border-neutral-800 px-5 py-2 overflow-hidden">
        <div className=" flex justify-end items-center">
          <Link to="/m-manager/add-new-item">
            <FaCirclePlus className="text-3xl mx-2 my-2 hover:scale-110 transition-all" />
          </Link>
        </div>
        {isPending && <div>loading</div>}
        {data && (
          <div className=" ">
            {data?.map((items, idx) =>
              type === "all" || items?.type === type ? (
                <Link key={idx} to={`transaction/${items?.transactionId}`}>
                  <div
                    key={idx}
                    className=" bg-[#0B525B] text-sm rounded-md p-3 my-2 flex justify-between items-center gap-3 font-Ubuntu capitalize  "
                  >
                    <span className="w-40 truncate">{items?.companyName}</span>
                    <span className="w-24 truncate  text-sm ">
                      {items?.type}
                    </span>
                    <span className="w-20 truncate">{items?.quantity}</span>
                    <span className="w-32 truncate">{items?.product}</span>
                    <span
                      className={`w-20 text-center truncate px-2 py-1 rounded-sm uppercase text-sm ${
                        items?.state?.toLowerCase().trim() === "paid"
                          ? "bg-green-700"
                          : "bg-red-800"
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
