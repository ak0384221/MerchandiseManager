export default function TableHeading({ admin = false }) {
  return (
    <div
      className={`rounded-sm py-3 my-2 font-Ubuntu capitalize text-center  text-sm grid items-center gap-3 grid-cols-12 `}
    >
      <span className="font-medium truncate  col-span-3">Company</span>
      <span className="font-medium truncate  col-span-3">Product</span>
      <span className="font-medium truncate  col-span-2">Due</span>
      <span className="font-medium truncate  col-span-2">Type</span>

      <span className="font-medium truncate  col-span-2">Date</span>
    </div>
  );
}
