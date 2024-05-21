const Order = require('../../models/orderModel');

const getMonthlyRevenue = async (req, res) => {
    try {
        const orders = await Order.find({ status: 'Completed' });

        const revenue = orders.reduce((acc, order) => {
            const month = new Date(order.createdAt).getMonth();
            acc[month] = (acc[month] || 0) + order.totalAmount;
            return acc;
        }, {});

        const monthlyRevenue = Array.from({ length: 12 }, (v, i) => revenue[i] || 0);

        res.status(200).json({ success: true, data: monthlyRevenue });
    } catch (error) {
        console.error('Error calculating monthly revenue:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = { getMonthlyRevenue };
