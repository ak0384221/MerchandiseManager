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

export default function AdminPannel() {
  const { dataObj, setFilter, filter } = useContext(DataContext);

  return (
    <>
      <nav className=" w-full print:hidden py-2 ">
        <div className="logo  text-4xl font-Aladin text-center space-x-2 p-4 ">
          <span>M Pannel</span>
        </div>
      </nav>

      {dataObj.data && (
        <div className="md:w-4/5 mx-auto border border-[#0d3f41] p-2 ">
          <div className="flex items-center  justify-end gap-3">
            <span
              onClick={(e) =>
                setFilter((prevObj) => {
                  return {
                    ...prevObj,
                    OrderBy: "desc",
                  };
                })
              }
              className="active:scale-85  hover:bg-[#0d3f41] p-1 transition-colors "
              title="Latest first"
            >
              <FaLongArrowAltUp className="text-xl" />
            </span>
            <span
              onClick={(e) =>
                setFilter((prevObj) => {
                  return {
                    ...prevObj,
                    OrderBy: "asc",
                  };
                })
              }
              className=" active:scale-85 hover:bg-[#0d3f41] p-1 transition-colors"
              title="oldest first"
            >
              <FaLongArrowAltDown className="text-xl" />
            </span>
            {/* Example: Filter Dropdown */}
            <select
              value={filter.state}
              onChange={(e) =>
                setFilter((prevObj) => {
                  return {
                    ...prevObj,
                    state: e.target.value.trim(),
                  };
                })
              }
              className="border px-2 py-1 rounded text-sm "
            >
              <option className="bg-[#0d3f41]" value="all">
                all
              </option>
              <option className="bg-[#0d3f41]" value="pending">
                Pending
              </option>
              <option className="bg-[#0d3f41]" value="paid">
                Paid
              </option>
            </select>
            <select
              value={filter.type}
              onChange={(e) =>
                setFilter((prevObj) => {
                  return {
                    ...prevObj,
                    type: e.target.value.trim(),
                  };
                })
              }
              className="border px-2 py-1 rounded text-sm "
            >
              <option className="bg-[#0d3f41]" value="purchased">
                Purchased
              </option>
              <option className="bg-[#0d3f41]" value="sold">
                Sold
              </option>
              <option className="bg-[#0d3f41]" value="all">
                All
              </option>
            </select>

            {/* Example: Sort Dropdown */}
          </div>
          <TableHeading admin={true} />

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
