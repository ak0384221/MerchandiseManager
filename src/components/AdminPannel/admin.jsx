import { Link, NavLink } from "react-router-dom";
import { DataContext } from "../../store/store";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getDocs } from "firebase/firestore";
import { transactionsRef } from "../../configuration/firebaseConfig";
import { FaCirclePlus } from "react-icons/fa6";

export default function AdminPannel() {
  const { data, isPending, error } = useQuery({
    queryKey: ["transactionData"],
    queryFn: fetchTransactions,
  });

  async function fetchTransactions() {
    try {
      const snapshot = await getDocs(transactionsRef);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (err) {
      console.error("Error fetching transactions:", err);
      throw err;
    }
  }
  function formatDate(timestamp) {
    const date = timestamp.toDate(); // Convert Firestore Timestamp to JS Date
    const day = date.getDate();
    const month = date.getMonth() + 1; // JS months are 0-indexed
    const year = date.getFullYear().toString().slice(-2); // Last 2 digits

    return `${day}/${month}/${year}`;
  }

  console.log(data);
  return (
    <>
      <nav className=" w-full print:hidden py-2  ">
        <div className="logo  text-4xl font-Aladin text-center space-x-2 p-4 ">
          <span>M Pannel</span>
        </div>
        {/* <ul className="flex justify-evenly uppercase font-Aladin py-2 border-neutral-800">
          <li className=" w-max px-2 cursor-pointer  ">
            <NavLink
              to="/m-Pannel/updates"
              className={({ isActive }) =>
                isActive
                  ? "border-b border-white px-5 py-1"
                  : "border-b border-transparent px-5 py-1"
              }
            >
              {" "}
              Updates
            </NavLink>
          </li>
          <li className=" w-max px-2 cursor-pointer ">
            <NavLink
              to="/m-pannel/store"
              className={({ isActive }) =>
                isActive
                  ? "border-b border-white px-5 py-1"
                  : "border-b border-transparent px-5 py-1"
              }
            >
              {" "}
              store
            </NavLink>
          </li>
        </ul> */}
      </nav>
      <div className="updates">
        <div className="box min-h-screen px-5 py-4 overflow-hidden">
          {isPending && <div>Loading...</div>}

          {data && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  p-5">
              {data.map((items, idx) => (
                <Link key={idx} to={`transaction/${items?.transactionId}`}>
                  <div
                    className={`bg-[#116D6E] hover:bg-[#116c6ec2] rounded-sm p-4  text-sm font-Ubuntu text-white space-y-2 transition-all duration-200 ${
                      items?.state?.toLowerCase().trim() === "due" &&
                      "border-2 border-[#a01f1f]"
                    }`}
                  >
                    <div className="text-lg font-semibold truncate">
                      {items?.companyName}
                    </div>

                    <div>
                      <span className="">Product:</span>{" "}
                      <span className="truncate">{items?.product}</span>
                    </div>

                    <div>
                      <span className="">Quantity:</span> {items?.quantity}
                    </div>

                    <div>
                      <span className="">Status</span>{" "}
                      <span
                        className={`bg-white px-1 font-bold mx-1  ${
                          items?.state?.toLowerCase().trim() === "due"
                            ? "text-red-400"
                            : "text-green-400"
                        } uppercase`}
                      >
                        {items?.state}
                      </span>
                    </div>

                    <div>
                      <span className="">Transaction Date:</span>{" "}
                      {formatDate(items?.date)}
                    </div>

                    <div>
                      <span className="">Updates:</span>{" "}
                      {items?.updateHistory?.length || 0}
                    </div>

                    {/* <div>
                      <span className="">Last Update:</span>{" "}
                      {items?.updateHistory?.length
                        ? formatDate(
                            items?.updateHistory[
                              items.updateHistory.length - 1
                            ]?.date.toDate()
                          )
                        : "—"}
                    </div> */}
                  </div>
                </Link>
              ))}
            </div>
          )}

          {error && <p className="text-red-500">Something went wrong.</p>}
        </div>
      </div>
    </>
  );
}
