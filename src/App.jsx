import { Link, Outlet } from "react-router-dom";
import Header from "./components/header";
import DataContextProvider from "./store/store";

function App() {
  return (
    <>
      <DataContextProvider>
        <Header />
        <Outlet />
      </DataContextProvider>
    </>
  );
}

export default App;
