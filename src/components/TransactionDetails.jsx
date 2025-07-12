export default function TransactionDetails({
  selectedCompany,
  totalPrice,
  totalDue,
}) {
  console.log(totalDue);
  return (
    <div className="max-w-md mx-auto p-6   ">
      <h2 className="text-2xl font-bold mb-4  my-2">Transaction Details</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="font-medium">Company Name:</span>
          <span className="uppercase font-bold text-md">
            {selectedCompany?.companyName}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Type:</span>
          <span className="font-bold text-yellow-500 uppercase ">
            {selectedCompany?.type}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Date:</span>
          <span>{selectedCompany?.date.toDate().toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Product:</span>
          <span>{selectedCompany?.product}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">State:</span>
          <span
            className={`px-2 ${
              selectedCompany?.state?.toLowerCase() === "paid"
                ? "bg-green-700"
                : "bg-red-700"
            }`}
          >
            {selectedCompany?.state}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Price/unit:</span>
          <span>{selectedCompany?.unitPrice?.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Quantity:</span>
          <span>{selectedCompany?.quantity}</span>
        </div>
        <hr />
        <div className="flex justify-between">
          <span className="font-medium">Price in total:</span>
          <span className="text-yellow-500">
            {(
              selectedCompany?.unitPrice * selectedCompany?.quantity
            )?.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Total paid:</span>
          <span className="text-green-500">
            {selectedCompany?.totalPaid?.toLocaleString()}
          </span>
        </div>
        <hr />
        <div className="flex justify-between">
          <span className="font-medium">Total due:</span>
          <span className="text-red-600 font-bold bg-white px-2">
            {totalDue.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
