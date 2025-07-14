import { Link, NavLink } from "react-router-dom";
import { DataContext } from "../../store/store";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getDocs } from "firebase/firestore";
import { transactionsRef } from "../../configuration/firebaseConfig";
import { FaCirclePlus } from "react-icons/fa6";
import TableHeading from "../micro/TableHeading";
import TableElement from "../micro/TableElement";

export default function AdminPannel() {
  const { data, isPending, error, formatDate } = useContext(DataContext);

  return (
    <>
      <nav className=" w-full print:hidden py-2 ">
        <div className="logo  text-4xl font-Aladin text-center space-x-2 p-4 ">
          <span>M Pannel</span>
        </div>
      </nav>

      {data && (
        <div className="md:w-4/5 mx-auto border border-[#0d3f41] p-2 ">
          <TableHeading admin={true} />

          {data?.map((items, idx) => (
            <Link key={idx} to={`transaction/${items?.transactionId}`}>
              <TableElement idx={idx} items={items} admin={true} />
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
