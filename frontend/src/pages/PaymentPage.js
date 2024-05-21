import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const PaymentPage = ({ totalAmount }) => {
    const [form, setForm] = useState({ fullName: '', phone: '', address: '', notes: '' });
    const navigate = useNavigate();
    const context = useContext(Context);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({ ...prevForm, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(SummaryApi.createOrder.url, {
                method: SummaryApi.createOrder.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify({ ...form })
            });

            const responseData = await response.json();
            console.log('Response Data:', responseData);

            if (responseData.success) {
                toast.success(responseData.message);
                context.fetchUserAddToCart(); // Cập nhật lại giỏ hàng
                navigate('/');
            } else {
                toast.error(responseData.message);
            }
        } catch (error) {
            toast.error('Error placing order');
            console.error('Error placing order:', error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Payment Information</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={form.fullName}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Notes</label>
                        <textarea
                            name="notes"
                            value={form.notes}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-lg font-semibold text-gray-800">Total Amount: {totalAmount}</p>
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Place Order
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PaymentPage;
