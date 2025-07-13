import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <nav className=" w-full print:hidden fixed top-0 left-0 backdrop-blur-xl h-[20vh]  z-10 ">
      <div className="logo  text-4xl font-Aladin text-center space-x-2 p-4 ">
        <span>M</span>
        <span>Manager</span>
      </div>
      <ul className="flex justify-evenly uppercase font-Aladin py-2 border-neutral-800">
        <li className=" w-max px-2 cursor-pointer  ">
          <NavLink
            to="/m-manager/all"
            className={({ isActive }) =>
              isActive
                ? "border-b border-white px-5 py-1"
                : "border-b border-transparent px-5 py-1"
            }
          >
            {" "}
            All
          </NavLink>
        </li>
        <li className=" w-max px-2 cursor-pointer ">
          <NavLink
            to="/m-manager/sold"
            className={({ isActive }) =>
              isActive
                ? "border-b border-white px-5 py-1"
                : "border-b border-transparent px-5 py-1"
            }
          >
            {" "}
            sold
          </NavLink>
        </li>
        <li className=" w-max px-2 cursor-pointer ">
          <NavLink
            to="/m-manager/purchased"
            className={({ isActive }) =>
              isActive
                ? "border-b border-white px-5 py-1"
                : "border-b border-transparent px-5 py-1"
            }
          >
            {" "}
            purchased
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
