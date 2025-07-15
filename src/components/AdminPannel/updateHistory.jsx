export default function UpdateHistory({ item, index }) {
  return (
    <div
      key={index}
      className="border border-[#043235] rounded-sm   p-2 gap-2 w-full  "
    >
      <div className="flex justify-between text-sm">
        <span className="font-medium">In Charge:</span>
        <span className="">{item?.InCharge}</span>
      </div>

      <div className="flex justify-between text-sm mt-1">
        <span className="font-medium">Date:</span>
        <span className="">
          {new Date(Number(item?.date)).toLocaleString()}
        </span>
      </div>
      <div className="flex justify-between text-sm mt-1">
        <span className="font-medium">Prev Due:</span>
        <span className="text-green-500 font-medium">
          ৳{item?.prevDue?.toLocaleString()}
        </span>
      </div>

      <div className="flex justify-between text-sm mt-1">
        <span className="font-medium">Payment:</span>
        <span className="text-green-600 font-semibold">
          ৳ {item?.paymentAmount.toLocaleString()}
        </span>
      </div>

      <div className="flex justify-between text-sm mt-1">
        <span className="font-medium">Method:</span>
        <span className=" capitalize">{item?.paymentMethod}</span>
      </div>

      <div className="flex justify-between text-sm mt-1">
        <span className="font-medium">Due Left:</span>
        <span className="text-red-500">
          {item?.newDue === 0 ? "Cleared" : `৳${item?.newDue}`}
        </span>
      </div>
    </div>
  );
}
