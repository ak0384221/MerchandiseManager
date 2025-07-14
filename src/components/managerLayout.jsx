import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { DataContext } from "../store/store";
import { FaCirclePlus } from "react-icons/fa6";
import Fallback from "./fallback/fallback";
import TableHeading from "./micro/TableHeading";
import TableElement from "./micro/TableElement";

export default function ManagerLayout() {
  const { type } = useParams();
  const { data, isPending, error } = useContext(DataContext);

  return (
    <>
      <div className="box  md:w-4/5 mx-auto relative  min-h-[70vh]   py-2 overflow-hidden px-2">
        <div className=" flex justify-end items-center ">
          <Link to="/m-manager/add-new-item">
            <FaCirclePlus className="text-3xl  hover:scale-110 transition-all mr-5" />
          </Link>
        </div>

        {data && (
          <div className="  border border-[#0d3f41] p-2 my-4">
            <TableHeading />

            {data?.map((items, idx) => (
              <Link
                key={idx}
                to={`/m-manager/transaction/${items?.transactionId}`}
              >
                <TableElement idx={idx} items={items} />
              </Link>
            ))}
          </div>
        )}

        {error && <p>some error</p>}
      </div>
      {isPending && <Fallback />}
    </>
  );
}
