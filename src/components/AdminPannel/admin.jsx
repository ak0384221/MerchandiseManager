import { Link, NavLink } from "react-router-dom";
import { DataContext } from "../../store/store";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getDocs } from "firebase/firestore";
import { transactionsRef } from "../../configuration/firebaseConfig";
import { FaCirclePlus } from "react-icons/fa6";
import TableHeading from "../micro/TableHeading";
import TableElement from "../micro/TableElement";
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
import Header from "../header";
import FilterTable from "../micro/filterTable";

export default function AdminPannel() {
  const { dataObj, setFilter, filter } = useContext(DataContext);

  return (
    <>
      <Header Heading={"M-Pannel"} />

      {dataObj.data && (
        <div className="md:w-4/5 mx-auto  px-2 ">
          <div className=""></div>
          <TableHeading admin={true} />
          <FilterTable filter={filter} setFilter={setFilter} admin={true} />

          {dataObj.data?.map((items, idx) => (
            <Link key={idx} to={`transaction/${items?.transactionId}`}>
              <TableElement idx={idx} items={items} admin={true} />
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
