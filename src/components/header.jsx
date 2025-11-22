import { GrInsecure } from "react-icons/gr";
import { Link } from "react-router-dom";

export default function Header({ Heading }) {
  return (
    <>
      <button className="  w-full  bg-[#1f2124] text-white font-bold  px-2 py-2 text-center  hover:bg-neutral-800 space-x-2  ">
        <Link to={`${Heading === "M-Pannel" ? "/" : "/secret/alahomora"}`}>
          <span className="text-xs capitalize">
            {Heading === "M-Pannel" ? "Use as User" : "Use as Admin"}
          </span>
        </Link>
      </button>
      <nav className=" w-full print:hidden text-center  pt-6 mb-4 flex justify-center items-center gap-2">
        <img src="/logo2.png" className="size-[2rem]  " alt="" />{" "}
        <h1 className="logo  text-4xl font-Aladin text-center  ">{Heading}</h1>
      </nav>
    </>
  );
}
