import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function PrevNavigation({ className }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-end items-center">
        <IoArrowBackCircle
          className={`text-4xl  mb-5 active:scale-85 transition-all hover:text-blue-500 cursor-pointer ${className}`}
          onClick={() => navigate(-1)}
        />
      </div>
    </>
  );
}
