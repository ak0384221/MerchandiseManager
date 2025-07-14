import { Link, Outlet } from "react-router-dom";
import Header from "./components/header";
import DataContextProvider from "./store/store";

function App() {
  return (
    <>
      <Header />
      <div className="mt-[20vh]">
        <Outlet />
      </div>
    </>
  );
}

export default App;
