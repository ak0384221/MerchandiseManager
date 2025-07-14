export default function TableHeading({ admin }) {
  return (
    <div
      className={`rounded-sm p-3 my-2 font-Ubuntu capitalize text-sm grid items-center gap-3 ${
        admin ? "grid-cols-5" : "grid-cols-4"
      }`}
    >
      <span className="font-medium  truncate ">Company</span>
      <span className="font-medium  truncate ">Type</span>
      <span className="font-medium  truncate ">Due</span>
      <span className="font-medium  truncate ">Date</span>
      {admin && <span className="font-medium  truncate ">Updates</span>}
    </div>
  );
}
