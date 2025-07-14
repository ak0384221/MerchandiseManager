import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div className="my-10">
        <Outlet />
      </div>
    </>
  );
}

export default App;
