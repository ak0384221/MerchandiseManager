import { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../store/store";
import Fallback from "./fallback/fallback";
import TableHeading from "./micro/TableHeading";
import TableElement from "./micro/TableElement";
import Header from "./header";
import FilterTable from "./micro/filterTable";

export default function ManagerLayout() {
  const { dataObj, setFilter, filter } = useContext(DataContext);

  return (
    <>
      <Header Heading={"M-Manager"} />
      <div className="box  md:w-3/5 mx-auto relative  min-h-[70vh]     overflow-hidden px-2">
        {dataObj?.data && (
          <div className="   px-2">
            <TableHeading />
            <FilterTable filter={filter} setFilter={setFilter} />
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
