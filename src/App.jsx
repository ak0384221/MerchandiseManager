import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen">
        <Outlet />
      </div>
    </>
  );
}

export default App;
