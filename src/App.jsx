import { Link, Outlet } from "react-router-dom";
import Header from "./components/header";
import DataContextProvider from "./store/store";

function App() {
  return (
    <>
      <DataContextProvider>
        <Header />
        <div className="mt-[20vh]">
          <Outlet />
        </div>
      </DataContextProvider>
    </>
  );
}

export default App;
