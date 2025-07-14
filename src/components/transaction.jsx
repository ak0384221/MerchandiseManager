import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import TransactionDetails from "./TransactionDetails";
import { useTransactionById } from "./hooks/findTransactionsById";
import Fallback from "./fallback/fallback";
//
export default function TransactionList() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isPending } = useTransactionById(id);
  //
  return (
    <>
      <div className=" w-4/5 md:w-3/5 lg:w-1/2 mx-auto   py-5">
        {data && (
          <>
            <IoArrowBackCircle
              className="text-4xl print:hidden hover:scale-110 mx-3 mb-3 active:scale-90 transition-all"
              onClick={() => navigate(-1)}
            />
            <TransactionDetails data={data} />
          </>
        )}
        {isPending && <Fallback />}
      </div>
    </>
  );
}
