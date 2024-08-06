import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaTrash } from 'react-icons/fa';
import { FormData } from '../Components/types';
import { Invoice } from '../Components/Invoice';
import { My_Notification } from '../Components/Notification';
import request, { gql } from 'graphql-request';

const BillingForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        companyName: '',
        companyEmail: '',
        country: 'USA',
        city: '',
        postalCode: '',
        streetAddress: '',
        clientName: '',
        clientEmail: '',
        clientCountry: 'USA',
        clientCity: '',
        clientPostalCode: '',
        clientStreetAddress: '',
        invoiceDate: '',
        paymentTerms: 'Net 10 days',
        projectDescription: '',
        items: [
            { itemName: '', qty: '', price: '', total: '' }
        ]
    });

    type NoficationText = {
        message: string, title: string
    }
    const [showNotification, setShowNotification] = useState<boolean>(false);
    const [Notificationtxt, setNotificationtxt] = useState<NoficationText>({ message: "", title: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: type === 'checkbox' ? checked : value
        }));
    };

    const handleItemChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        const newItems = [...formData.items];
        newItems[index] = { ...newItems[index], [id]: value };
        setFormData(prevData => ({
            ...prevData,
            items: newItems
        }));
    };

    const addItem = () => {
        setFormData(prevData => ({
            ...prevData,
            items: [...prevData.items, { itemName: '', qty: '', price: '', total: '' }]
        }));
    };

    const deleteItem = (index: number) => {
        const newItems = [...formData.items];
        newItems.splice(index, 1);
        setFormData(prevData => ({
            ...prevData,
            items: newItems
        }));
    };

    const reset = () => {
        setFormData({
            companyName: '',
            companyEmail: '',
            country: 'USA',
            city: '',
            postalCode: '',
            streetAddress: '',
            clientName: '',
            clientEmail: '',
            clientCountry: 'USA',
            clientCity: '',
            clientPostalCode: '',
            clientStreetAddress: '',
            invoiceDate: '',
            paymentTerms: 'Net 10 days',
            projectDescription: '',
            items: [{ itemName: '', qty: '', price: '', total: '' }]
        });
        setNotificationtxt({ message: "Reset Successful!", title: "Reset" })
        setShowNotification(true);
    };

    const handleSubmit = async () => {
        setNotificationtxt({ message: "Invoice created successfully!", title: "Your invoice has been created." })
        setShowNotification(true);

        const mutation = gql`
          mutation CreateInvoice($input: InvoiceInput!) {
            createInvoice(input: $input) {
              id
            }
          }
        `;

        try {
            const variables = { input: formData };
            const response = await request('https://sse-frontend-assessment-api-823449bb66ac.herokuapp.com/graphql', mutation, variables);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (showNotification) {
            const timer = setTimeout(() => {
                setShowNotification(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showNotification]);

    return (<>
        <main className='font-inter p-6 max-lg:p-3'>
            {showNotification && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 transition-all duration-500">
                    <My_Notification icon={FaCheckCircle} message={Notificationtxt.message} title={Notificationtxt.title} />
                </div>
            )}
            <div className='flex items-center justify-between mt-6'>
                <div>
                    <p className="text-xl font-semibold text-[#101828] mb-1">New Invoice</p>
                    <p className='text-[#76787d] text-xs'>Create new invoice for your customers</p>
                </div>
                <div className='flex gap-3 text-sm'>
                    <button
                        type="button"
                        className="w-full px-4 py-2 hover:bg-slate-200 transition-all duration-300 border border-slate-500 rounded-lg"
                        onClick={reset}
                    >
                        Reset
                    </button>
                    <button
                        type="button"
                        className="w-full px-4 py-2 hover:bg-purple-700 transition-all duration-300 bg-[#7F56D9] text-white rounded-lg"
                        onClick={handleSubmit}
                    >
                        Save
                    </button>
                </div>
            </div>
            <section className='lg:flex justify-center gap-6 my-6'>
                <form className="w-full space-y-4 border border-slate-300 rounded-2xl p-5">
                    <p className="text-xl font-semibold text-[#101828] mb-3">Bill From</p>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className='flex flex-col font-normal text-sm gap-1 flex-1'>
                            <label htmlFor="companyName">Company Name</label>
                            <input
                                type="text"
                                id="companyName"
                                placeholder='Company Name'
                                className='p-2 border border-slate-300 rounded-lg'
                                value={formData.companyName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='flex flex-col font-normal text-sm gap-1 flex-1'>
                            <label htmlFor="companyEmail">Company Email</label>
                            <input
                                type="email"
                                id="companyEmail"
                                placeholder='Company Email'
                                className='p-2 border border-slate-300 rounded-lg'
                                value={formData.companyEmail}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className='flex flex-col font-normal text-sm gap-1 flex-1'>
                            <label htmlFor="country">Country</label>
                            <select
                                id="country"
                                className='p-2 border border-slate-300 rounded-lg'
                                value={formData.country}
                                onChange={handleChange}
                            >
                                <option value="USA">USA</option>
                                <option value="Canada">Canada</option>
                                <option value="UK">UK</option>
                            </select>
                        </div>
                        <div className='flex flex-col font-normal text-sm gap-1 flex-1'>
                            <label htmlFor="city">City</label>
                            <input
                                type="text"
                                id="city"
                                placeholder='City'
                                className='p-2 border border-slate-300 rounded-lg'
                                value={formData.city}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='flex flex-col font-normal text-sm gap-1 flex-1'>
                            <label htmlFor="postalCode">Postal Code</label>
                            <input
                                type="text"
                                id="postalCode"
                                placeholder='Postal Code'
                                className='p-2 border border-slate-300 rounded-lg'
                                value={formData.postalCode}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col font-normal text-sm gap-1'>
                        <label htmlFor="streetAddress">Street Address</label>
                        <textarea
                            id="streetAddress"
                            placeholder='Street Address'
                            className='p-2 border border-slate-300 rounded-lg'
                            value={formData.streetAddress}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <p className="text-xl font-semibold text-[#101828] mb-3">Bill To</p>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className='flex flex-col font-normal text-sm gap-1 flex-1'>
                            <label htmlFor="clientName">Client’s Name</label>
                            <input
                                type="text"
                                id="clientName"
                                placeholder='Client’s Name'
                                className='p-2 border border-slate-300 rounded-lg'
                                value={formData.clientName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='flex flex-col font-normal text-sm gap-1 flex-1'>
                            <label htmlFor="clientEmail">Client’s Email</label>
                            <input
                                type="email"
                                id="clientEmail"
                                placeholder='Client’s Email'
                                className='p-2 border border-slate-300 rounded-lg'
                                value={formData.clientEmail}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className='flex flex-col font-normal text-sm gap-1 flex-1'>
                            <label htmlFor="clientCountry">Country</label>
                            <select
                                id="clientCountry"
                                className='p-2 border border-slate-300 rounded-lg'
                                value={formData.clientCountry}
                                onChange={handleChange}
                            >
                                <option value="USA">USA</option>
                                <option value="Canada">Canada</option>
                                <option value="UK">UK</option>
                            </select>
                        </div>
                        <div className='flex flex-col font-normal text-sm gap-1 flex-1'>
                            <label htmlFor="clientCity">City</label>
                            <input
                                type="text"
                                id="clientCity"
                                placeholder='City'
                                className='p-2 border border-slate-300 rounded-lg'
                                value={formData.clientCity}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='flex flex-col font-normal text-sm gap-1 flex-1'>
                            <label htmlFor="clientPostalCode">Postal Code</label>
                            <input
                                type="text"
                                id="clientPostalCode"
                                placeholder='Postal Code'
                                className='p-2 border border-slate-300 rounded-lg'
                                value={formData.clientPostalCode}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col font-normal text-sm gap-1'>
                        <label htmlFor="clientStreetAddress">Street Address</label>
                        <textarea
                            id="clientStreetAddress"
                            placeholder='Street Address'
                            className='p-2 border border-slate-300 rounded-lg'
                            value={formData.clientStreetAddress}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <div className='flex flex-col font-normal text-sm gap-1 flex-1'>
                            <label htmlFor="invoiceDate">Invoice Date</label>
                            <input
                                type="date"
                                id="invoiceDate"
                                placeholder='Invoice Date'
                                className='p-2 border border-slate-300 rounded-lg'
                                value={formData.invoiceDate}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='flex flex-col font-normal text-sm gap-1 flex-1'>
                            <label htmlFor="paymentTerms">Payment Terms</label>
                            <select
                                id="paymentTerms"
                                className='p-2 border border-slate-300 rounded-lg'
                                value={formData.paymentTerms}
                                onChange={handleChange}
                            >
                                <option value="Net 10 days">Net 10 days</option>
                                <option value="Net 30 days">Net 30 days</option>
                                <option value="Net 60 days">Net 60 days</option>
                            </select>
                        </div>
                    </div>

                    <div className='flex flex-col font-normal text-sm gap-1'>
                        <label htmlFor="projectDescription">Project Description</label>
                        <textarea
                            id="projectDescription"
                            placeholder='Project Description'
                            className='p-2 border border-slate-300 rounded-lg'
                            value={formData.projectDescription}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <p className="text-xl font-semibold text-[#101828] mb-3">Items List</p>
                    {formData.items.map((item, index) => (
                        <div key={index} className="lg:flex flex-col md:flex-row gap-3 items-center">
                            <div className='flex flex-col font-normal text-sm gap-1 flex-1'>
                                <label htmlFor="itemName">Item Name</label>
                                <input
                                    type="text"
                                    id="itemName"
                                    placeholder='Item Name'
                                    className='p-2 border border-slate-300 rounded-lg w-full'
                                    value={item.itemName}
                                    onChange={(e) => handleItemChange(index, e)}
                                />
                            </div>
                            <div className='flex flex-col font-normal text-sm gap-1 flex-1'>
                                <label htmlFor="qty">Qty.</label>
                                <input
                                    type="number"
                                    id="qty"
                                    placeholder='Qty.'
                                    className='p-2 border border-slate-300 rounded-lg w-full'
                                    value={item.qty}
                                    onChange={(e) => handleItemChange(index, e)}
                                />
                            </div>
                            <div className='flex flex-col font-normal text-sm gap-1 flex-1'>
                                <label htmlFor="price">Price</label>
                                <input
                                    type="text"
                                    id="price"
                                    placeholder='Price'
                                    className='p-2 border border-slate-300 rounded-lg w-full'
                                    value={item.price}
                                    onChange={(e) => handleItemChange(index, e)}
                                />
                            </div>
                            <div className='flex flex-col font-normal text-sm gap-1 flex-1'>
                                <label htmlFor="total">Total</label>
                                <input
                                    type="text"
                                    id="total"
                                    placeholder='Total'
                                    className='p-2 border border-slate-300 rounded-lg w-full'
                                    value={item.total}
                                    onChange={(e) => handleItemChange(index, e)}
                                />
                            </div>
                            <button
                                type="button"
                                className="text-red-500 mt-6"
                                onClick={() => deleteItem(index)}
                            >
                                <FaTrash />
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="w-full py-2 bg-[#7F56D9] hover:bg-purple-700 transition-all duration-300 text-white rounded-lg"
                        onClick={addItem}
                    >
                        Add New Item
                    </button>
                </form>
                <Invoice formData={formData} />
            </section>
        </main>
    </>);
};

export default BillingForm;
