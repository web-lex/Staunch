import { FormData } from "./types";

interface BillingFormPreviewProps {
    formData: FormData;
}
  
  export const Invoice: React.FC<BillingFormPreviewProps> = ({ formData }) => {
    const today = new Date().toJSON().slice(0, 10).replace(/-/g, '-')
    return (
      <div className="lg:w-4/5 max-lg:mt-4 flex flex-col justify-start items-start p-6 max-lg:p-2 rounded-3xl bg-neutral-100">
        <p className="text-xl font-semibold text-[#101828] mb-3 max-lg:my-3">Preview</p>
        <div className="w-full p-6 rounded-2xl bg-white shadow-lg">
          <p className="text-lg font-semibold text-[#101828]">New Invoice</p>
          <hr className='w-full bg-slate-800 h-[.05em] mt-3 mb-4' />
  
          <div className="space-y-4">
            <div className="lg:grid grid-cols-2 gap-8">
              <div className="">
                <p className="text-[#76787d] mb-1">Invoice Date</p>
                <div className="font-medium text-[#101828] space-y-1">
                  <p className="overflow-hidden text-ellipsis">{today}</p>
                </div>
              </div>
              <div className="max-lg:mt-2">
                <p className="text-[#76787d] mb-1">Payment Terms</p>
                <div className="font-medium text-[#101828] space-y-1">
                  <p className="overflow-hidden text-ellipsis">{formData.paymentTerms}</p>
                </div>
              </div>
            </div>
            <div className="lg:grid grid-cols-2 gap-8">
              <div className="">
                <p className="text-[#76787d] mb-1">Billed From</p>
                <div className="font-medium text-[#101828] space-y-1">
                  <p className="overflow-hidden text-ellipsis">{formData.companyName}</p>
                  <p className="overflow-hidden text-ellipsis">{formData.companyEmail}</p>
                  <p className="overflow-hidden text-ellipsis">{formData.streetAddress}</p>
                  <p className="overflow-hidden text-ellipsis">{formData.city}, {formData.postalCode}</p>
                  <p className="overflow-hidden text-ellipsis">{formData.country}</p>
                </div>
              </div>
              <div className="max-lg:mt-2">
                <p className="text-[#76787d] mb-1">Billed To</p>
                <div className="font-medium text-[#101828] space-y-1">
                  <p className="overflow-hidden text-ellipsis">{formData.clientName}</p>
                  <p className="overflow-hidden text-ellipsis">{formData.clientEmail}</p>
                  <p className="overflow-hidden text-ellipsis">{formData.clientStreetAddress}</p>
                  <p className="overflow-hidden text-ellipsis">{formData.clientCity}, {formData.clientPostalCode}</p>
                  <p className="overflow-hidden text-ellipsis">{formData.clientCountry}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="my-4 space-y-1">
            <p className="text-[#76787d]">Project Description</p>
            <p className="font-medium text-[#101828]">{formData.projectDescription}</p>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="min-w-full text-[#76787d] rounded">
              <thead className='bg-neutral-100 rounded-md overflow-hidden'>
                <tr className='[&>th]:p-[.5em]'>
                  <th className="">Item</th>
                  <th className="">Qty.</th>
                  <th className="">Price</th>
                  <th className="">Total Amount</th>
                </tr>
              </thead>
              <tbody className="text-[#101828] text-center">
                {formData.items?.map((item, index) => (
                  <tr key={index} className='[&>*]:p-[.5em] [&>*]:text-ellipsis [&>*]:max-w-14 [&>*]:overflow-hidden'>
                    <td className="">{item.itemName}</td>
                    <td className="">{item.qty}</td>
                    <td className="">{item.price}</td>
                    <td className="">{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <hr className='w-full bg-slate-800 h-[.05em] mt-3 mb-4' />
          <div className="w-full text-end">
            <div className="grid grid-cols-2 gap-1 font-semibold">
              <p className="">Subtotal</p>
              <p className="">${formData.items.reduce((acc, item) => acc + parseFloat(item.total), 0).toFixed(2)}</p>
              <p className="">Tax</p>
              <p className="">10%</p>
              <p className="text-lg font-bold">Total</p>
              <p className="text-lg font-bold">${(formData.items.reduce((acc, item) => acc + parseFloat(item.total), 0) * 1.1).toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };