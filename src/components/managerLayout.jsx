import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { DataContext } from "../store/store";
import { FaCirclePlus } from "react-icons/fa6";
import Fallback from "./fallback/fallback";

export default function ManagerLayout() {
  const { type } = useParams();
  const { data, isPending, error, formatDate } = useContext(DataContext);

  return (
    <>
      <div className="box  relative  min-h-screen  px-5 py-2 overflow-hidden">
        <div className=" flex justify-end items-center">
          <Link to="/m-manager/add-new-item">
            <FaCirclePlus className="text-3xl mx-2 my-2 hover:scale-110 transition-all" />
          </Link>
        </div>

        {data && (
          <div className=" ">
            <div className=" rounded-sm p-3 my-2 flex justify-between items-center gap-3 font-Ubuntu capitalize ">
              <span className=" font-medium text-md w-40 ">Company</span>
              <span className=" font-medium text-md w-24    ">type</span>
              <span className=" font-medium text-md w-20 ">Product</span>
              <span className=" font-medium text-md w-32 ">Unit/Quantity</span>
              <span
                className={` font-medium text-md w-20 text-center  px-2 py-1 rounded-sm uppercase  `}
              >
                Date
              </span>
            </div>

            {data?.map((items, idx) =>
              type === "all" || items?.type === type ? (
                <Link key={idx} to={`transaction/${items?.transactionId}`}>
                  <div
                    key={idx}
                    className={`bg-[#0b393f] text-sm rounded-sm p-3 my-2 flex justify-between items-center gap-3 font-Ubuntu capitalize ${
                      items?.state?.toLowerCase().trim() === "pending" &&
                      " border-1 border-[#940139]"
                    } `}
                  >
                    <span className="w-40 truncate">{items?.companyName}</span>
                    <span className="w-24 truncate  text-sm ">
                      {items?.type}
                    </span>
                    <span className="w-32 truncate">{items?.product}</span>
                    <span className="w-20 truncate">{items?.quantity}</span>

                    <span
                      className={`w-20 text-center truncate px-2 py-1 rounded-sm uppercase text-sm `}
                    >
                      {formatDate(items?.date)}
                    </span>
                  </div>
                </Link>
              ) : null
            )}
          </div>
        )}

        {error && <p>some error</p>}
      </div>
      {isPending && <Fallback />}
    </>
  );
}
