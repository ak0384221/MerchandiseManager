import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";

export default function ConfirmTransactionModal({
  isOpen,
  onClose,
  onConfirm,
  data,
}) {
  const navigate = useNavigate();
  if (!isOpen) return null;
  const DUE = data?.unitPrice * data?.quantity - data?.totalPaid;
  const totalPrice = data?.unitPrice * data?.quantity;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 backdrop-blur-2xl flex items-center justify-center z-50">
      <div className=" border border-neutral-600 bg-neutral-900 rounded-lg shadow-xl w-[95%] max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">Confirm Transaction Details</h2>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="font-medium">Company Name:</span>
            <span>{data.companyName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Type:</span>
            <span className="font-bold uppercase">{data.type}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Product:</span>
            <span>{data.product}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Quantity:</span>
            <span>{data.quantity}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Payment method:</span>
            <span className="bg-green-600 px-2 uppercase">{data.payBy}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Unit Price:</span>
            <span>{Number(data.unitPrice).toLocaleString()}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Total Price:</span>
            <span>{Number(totalPrice).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium"> Paid:</span>
            <span>{Number(data.totalPaid).toLocaleString()}</span>
          </div>
          <hr className="text-neutral-400" />
          <div className="flex justify-between">
            <span className="font-medium">Due:</span>
            <span className="bg-red-700 text-white px-2">
              {Number(DUE).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => onClose(false)}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-red-700 hover:text-white text-black transition-all"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm(data);
              navigate("/m-manager/all");
            }}
            className="px-4 py-2 rounded-md bg-blue-600 hover:bg-green-700 text-white transition-all"
          >
            Confirm
          </button>
        </div>
        <p className="text-sm  border border-yellow-300 rounded-md p-2 my-4">
          ⚠️ Please review all the transaction details carefully. <br />
          <span className="font-medium">
            Once confirmed, this record cannot be edited or changed.
          </span>
          Make sure everything is correct before proceeding.
        </p>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}
