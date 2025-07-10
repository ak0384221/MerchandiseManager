import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <nav>
      <ul className="flex justify-evenly border py-2 border-neutral-800">
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
