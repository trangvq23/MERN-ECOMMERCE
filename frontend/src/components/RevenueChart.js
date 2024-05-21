import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import 'chart.js/auto';

const RevenueChart = () => {
    const [monthlyRevenue, setMonthlyRevenue] = useState([]);

    useEffect(() => {
        const fetchMonthlyRevenue = async () => {
            try {
                const response = await fetch(SummaryApi.getMonthlyRevenue.url, {
                    method: SummaryApi.getMonthlyRevenue.method,
                    credentials: 'include',
                    headers: {
                        "content-type": 'application/json'
                    }
                });
                const data = await response.json();
                if (data.success) {
                    setMonthlyRevenue(data.data);
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                toast.error('Error fetching monthly revenue');
                console.error('Error fetching monthly revenue:', error);
            }
        };

        fetchMonthlyRevenue();
    }, []);

    const data = {
        labels: [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ],
        datasets: [
            {
                label: 'Revenue',
                data: monthlyRevenue,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <div className='bg-white p-4 rounded-lg shadow-lg'>
            <h2 className='text-2xl font-bold text-gray-800 mb-4'>Monthly Revenue</h2>
            <Bar data={data} options={options} />
        </div>
    );
};

export default RevenueChart;
