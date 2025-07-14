import Loader from "../loader";

export default function Fallback() {
  return (
    <>
      <div className="absolute size-15  left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-999  ">
        <Loader />
      </div>
    </>
  );
}
