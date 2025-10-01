import { useContext } from "react";
import { DataContext } from "../../store/store";

export default function TableElement({ idx, items, admin = false }) {
  const { totalDue, formatDate, formatToK } = useContext(DataContext);
  return (
    <div
      key={idx}
      className="relative  bg-[#181a1a] text-sm text-center rounded-sm p-3 my-4 font-Ubuntu capitalize"
    >
      {admin && items?.updateHistory?.length > 0 && (
        <span
          title="Updates"
          className=" absolute -top-3 left-0 md:top-1/2 md:transform  md:-translate-y-1/2 bg-blue-500 rounded-full size-5 text-xs flex justify-center items-center mr-1"
        >
          {items?.updateHistory?.length}
        </span>
      )}

      <div className={` grid items-center gap-3 grid-cols-12`}>
        {/* Company Name – span 3 */}
        <span className="truncate  col-span-3">{items?.companyName}</span>

        {/* Product – span 3 */}
        <span className="truncate  text-sm col-span-3">{items?.product}</span>

        {/* Total Due – span 2 */}
        <span className="truncate  font-bold col-span-2">
          {formatToK(
            totalDue(items?.quantity, items?.unitPrice, items?.totalPaid)
          )}
        </span>

        {/* Type – span 1 */}
        <span className={`truncate  text-sm col-span-2`}>{items?.type[0]}</span>

        {/* Date – span 2 */}
        <span className="truncate  uppercase text-sm col-span-2">
          {formatDate(items?.date)}
        </span>

        {/* Update History – span 1 if admin */}
      </div>
    </div>
  );
}
