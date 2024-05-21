import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const AllOrders = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await fetch(SummaryApi.allOrders.url, {
                method: SummaryApi.allOrders.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                }
            });
            const data = await response.json();
            console.log('Orders Data:', data);
            if (data.success) {
                setOrders(data.data);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Error fetching orders');
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateOrderStatus = async (orderId, status) => {
        try {
            const response = await fetch(SummaryApi.updateOrderStatus.url, {
                method: SummaryApi.updateOrderStatus.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify({ orderId, status })
            });
            const data = await response.json();
            if (data.success) {
                toast.success(data.message);
                fetchOrders();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Error updating order status');
        }
    };

    const deleteOrder = async (orderId) => {
        try {
            const response = await fetch(SummaryApi.deleteOrder.url, {
                method: SummaryApi.deleteOrder.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify({ orderId })
            });
            const data = await response.json();
            if (data.success) {
                toast.success(data.message);
                fetchOrders();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Error deleting order');
        }
    };

    return (
        <div className='bg-white pb-4'>
            <table className='w-full userTable'>
                <thead>
                <tr className='bg-black text-white'>
                    <th>Order ID</th>
                    <th>User</th>
                    <th>Items</th>
                    <th>Total Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order, index) => (
                    <tr key={index}>
                        <td>{order._id}</td>
                        <td>{order.userId.name}</td>
                        <td>
                            {order.items.map((item, idx) => (
                                <div key={idx}>{item.productId.productName} (x{item.quantity})</div>
                            ))}
                        </td>
                        <td>{order.totalAmount}</td>
                        <td>
                            <select
                                value={order.status}
                                onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                            >
                                <option value="Pending">Pending</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </td>
                        <td>
                            <button
                                className='bg-red-500 text-white px-2 py-1 rounded'
                                onClick={() => deleteOrder(order._id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllOrders;
