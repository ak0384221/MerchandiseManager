import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <nav className=" w-full print:hidden  ">
      <div className="logo  text-4xl font-Aladin text-center space-x-2 p-4 ">
        <span>M</span>
        <span>Manager</span>
      </div>
    </nav>
  );
}
