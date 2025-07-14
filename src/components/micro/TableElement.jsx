import { useContext } from "react";
import { DataContext } from "../../store/store";

export default function TableElement({ idx, items, admin = false }) {
  const { totalDue, formatDate } = useContext(DataContext);
  return (
    <div
      key={idx}
      className={`bg-[#0b393f] text-sm rounded-sm p-3 my-2 font-Ubuntu capitalize `}
    >
      <div
        className={`grid items-center gap-3 ${
          admin ? "grid-cols-5" : "grid-cols-4"
        }`}
      >
        <span className="truncate   ">{items?.companyName}</span>
        <span className="truncate   text-sm ">{items?.type}</span>
        <span className="truncate   font-bold ">
          {totalDue(
            items?.quantity,
            items?.unitPrice,
            items?.totalPaid
          )?.toLocaleString()}
        </span>
        <span className=" truncate    rounded-sm uppercase text-sm ">
          {formatDate(items?.date)}
        </span>
        {admin && (
          <span className="truncate   ">{items.updateHistory?.length}</span>
        )}
      </div>
    </div>
  );
}
