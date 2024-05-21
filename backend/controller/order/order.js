const Order = require('../../models/orderModel');
const addToCartModel = require('../../models/cartProduct');

const createOrder = async (req, res) => {
    try {
        const userId = req.userId;
        const { fullName, phone, address, notes } = req.body;

        const cartItems = await addToCartModel.find({ userId }).populate('productId');

        if (cartItems.length === 0) {
            return res.status(400).json({ success: false, message: 'Cart is empty' });
        }

        const orderItems = cartItems.map(item => ({
            productId: item.productId._id,
            quantity: item.quantity
        }));

        const totalAmount = cartItems.reduce((total, item) => total + (item.quantity * item.productId.sellingPrice), 0);

        const newOrder = new Order({
            userId,
            items: orderItems,
            totalAmount,
            shippingInfo: { fullName, phone, address, notes },
            status: 'Pending'
        });

        await newOrder.save();

        // Xóa các mục trong giỏ hàng sau khi tạo đơn hàng
        await addToCartModel.deleteMany({ userId });

        res.status(201).json({ success: true, message: 'Order placed successfully' });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('items.productId').populate('userId');
        console.log('Orders:', orders);
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        order.status = status;
        await order.save();

        res.status(200).json({ success: true, message: 'Order status updated', order });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.body;
        const order = await Order.findByIdAndDelete(orderId);

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        res.status(200).json({ success: true, message: 'Order deleted', order });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = { createOrder, getAllOrders, updateOrderStatus, deleteOrder };
