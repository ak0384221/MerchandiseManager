import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <nav className=" w-full print:hidden text-center  ">
      <Link to={"/"} className="logo  text-4xl font-Aladin text-center  p-1 ">
        M-Manager
      </Link>
    </nav>
  );
}
