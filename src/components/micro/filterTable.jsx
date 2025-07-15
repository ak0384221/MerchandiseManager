import { FaLongArrowAltUp } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { FaLongArrowAltDown } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function FilterTable({ filter, setFilter, admin = false }) {
  return (
    <>
      <div className=" flex justify-between items-center p-2">
        {/* Left: Filter + Sort UI */}
        <div className="flex items-center gap-2">
          {/* Example: Filter Dropdown */}

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
            className="border   px-2 py-1 rounded text-sm "
          >
            <option className="bg-[#0d3f41]" value="all">
              All
            </option>
            <option className="bg-[#0d3f41]" value="pending">
              Pending
            </option>
            <option className="bg-[#0d3f41]" value="paid">
              Paid
            </option>
          </select>

          {/* Example: Sort Dropdown */}
          <span
            onClick={(e) =>
              setFilter((prevObj) => {
                return {
                  ...prevObj,
                  orderBy: "desc",
                };
              })
            }
            className={`active:scale-85  hover:bg-[#0d3f41]  p-1 transition-colors `}
            title="Latest first"
          >
            <FaLongArrowAltUp
              className={`text-xl ${
                filter.orderBy == "desc" && "text-blue-500"
              }`}
            />
          </span>
          <span
            onClick={(e) =>
              setFilter((prevObj) => {
                return {
                  ...prevObj,
                  orderBy: "asc",
                };
              })
            }
            className=" active:scale-85 hover:bg-[#0d3f41] p-1 transition-colors"
            title="oldest first"
          >
            <FaLongArrowAltDown
              className={`text-xl ${
                filter.orderBy == "asc" && "text-blue-500"
              }`}
            />
          </span>
        </div>

        {/* Right: Add New Item Button */}
        {admin == false && (
          <Link to="/m-manager/add-new-item">
            <FaCirclePlus className="text-2xl hover:scale-110 transition-all  text-white" />
          </Link>
        )}
      </div>
    </>
  );
}
