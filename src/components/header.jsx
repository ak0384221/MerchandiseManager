import { GrInsecure } from "react-icons/gr";
import { Link } from "react-router-dom";

export default function Header({ Heading }) {
  return (
    <nav className=" w-full print:hidden text-center  pt-6 mb-4 flex justify-center items-center gap-2">
      <img src="/logo2.png" className="size-[2rem]  " alt="" />{" "}
      <h1 className="logo  text-4xl font-Aladin text-center  ">{Heading}</h1>
      <button className="  absolute top-0 right-0 m-4 font-bold  text-white px-2 py-1 text-center  hover:bg-neutral-800 space-x-2  border border-neutral-500 rounded-md">
        <Link to={`${Heading === "M-Pannel" ? "/" : "/secret/alahomora"}`}>
          <span className="text-sm capitalize">
            {Heading === "M-Pannel" ? "Visit User Page" : "Visit Admin Page"}
          </span>
        </Link>
      </button>
    </nav>
  );
}
