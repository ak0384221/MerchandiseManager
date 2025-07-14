import { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../store/store";
import { FaCirclePlus } from "react-icons/fa6";
import Fallback from "./fallback/fallback";
import TableHeading from "./micro/TableHeading";
import TableElement from "./micro/TableElement";
import Header from "./header";
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";

export default function ManagerLayout() {
  const { dataObj, setFilter, filter } = useContext(DataContext);

  return (
    <>
      <Header />
      <div className="box  md:w-4/5 mx-auto relative  min-h-[70vh]   py-2 overflow-hidden px-2">
        <div className=" flex justify-between items-center px-4 py-2">
          {/* Left: Filter + Sort UI */}
          <div className="flex items-center gap-3">
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
            <span
              onClick={(e) =>
                setFilter((prevObj) => {
                  return {
                    ...prevObj,
                    OrderBy: "desc",
                  };
                })
              }
              className="  hover:bg-[#0d3f41] p-1 transition-colors "
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
              className="  hover:bg-[#0d3f41] p-1 transition-colors"
              title="oldest first"
            >
              <FaLongArrowAltDown className="text-xl" />
            </span>
          </div>

          {/* Right: Add New Item Button */}
          <Link to="/m-manager/add-new-item">
            <FaCirclePlus className="text-3xl hover:scale-110 transition-all mr-2 text-white" />
          </Link>
        </div>

        {dataObj?.data && (
          <div className="  border border-[#0d3f41] p-2 my-4">
            <TableHeading />

            {dataObj?.data?.map((items, idx) => (
              <Link
                key={idx}
                to={`/m-manager/transaction/${items?.transactionId}`}
              >
                <TableElement idx={idx} items={items} />
              </Link>
            ))}
          </div>
        )}
      </div>
      {/* {isPending && <Fallback />} */}
    </>
  );
}
