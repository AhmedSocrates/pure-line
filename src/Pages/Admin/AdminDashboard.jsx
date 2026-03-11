import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../Components/AdminLayout';
import api from '../../utils/api';

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const { data: orders } = await api.get('/orders');

            const totalOrders = orders.length;
            const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

            const statusBreakdown = {
                pending: orders.filter(o => o.status === 'pending').length,
                processing: orders.filter(o => o.status === 'processing').length,
                completed: orders.filter(o => o.status === 'completed').length,
                cancelled: orders.filter(o => o.status === 'cancelled').length
            };

            const recentOrders = [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

            setStats({
                totalOrders,
                totalRevenue,
                statusBreakdown,
                recentOrders
            });
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            setError('Failed to load dashboard data.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
                </div>
            </AdminLayout>
        );
    }

    if (error || !stats) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-screen">
                    <div className="text-xl text-red-600">{error || 'Something went wrong.'}</div>
                </div>
            </AdminLayout>
        );
    }

    const statCards = [
        {
            title: 'Total Orders',
            value: stats.totalOrders,
            icon: '📦',
            color: 'from-blue-500 to-blue-600',
            textColor: 'text-blue-600'
        },
        {
            title: 'Total Revenue',
            value: `$${stats.totalRevenue.toFixed(2)}`,
            icon: '💰',
            color: 'from-green-500 to-green-600',
            textColor: 'text-green-600'
        },
        {
            title: 'Pending Orders',
            value: stats.statusBreakdown.pending,
            icon: '⏳',
            color: 'from-yellow-500 to-yellow-600',
            textColor: 'text-yellow-600'
        },
        {
            title: 'Completed Orders',
            value: stats.statusBreakdown.completed,
            icon: '✅',
            color: 'from-cyan-500 to-cyan-600',
            textColor: 'text-cyan-600'
        }
    ];

    return (
        <AdminLayout>
            <div className="p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">Dashboard</h1>
                    <p className="text-slate-600">Welcome back! Here's what's happening with your store.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {statCards.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`text-4xl p-3 rounded-xl bg-gradient-to-r ${stat.color} bg-opacity-10`}>
                                    {stat.icon}
                                </div>
                            </div>
                            <h3 className="text-sm font-semibold text-slate-600 mb-1">{stat.title}</h3>
                            <p className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Order Status Breakdown */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                        <h2 className="text-xl font-bold text-slate-800 mb-6">Order Status Breakdown</h2>
                        <div className="space-y-4">
                            {Object.entries(stats.statusBreakdown).map(([status, count]) => {
                                const percentage = stats.totalOrders > 0 ? (count / stats.totalOrders) * 100 : 0;
                                const colors = {
                                    pending: 'bg-yellow-500',
                                    processing: 'bg-blue-500',
                                    completed: 'bg-green-500',
                                    cancelled: 'bg-red-500'
                                };
                                return (
                                    <div key={status}>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-sm font-semibold text-slate-700 capitalize">{status}</span>
                                            <span className="text-sm font-bold text-slate-800">{count}</span>
                                        </div>
                                        <div className="w-full bg-slate-200 rounded-full h-2">
                                            <div
                                                className={`${colors[status]} h-2 rounded-full transition-all duration-500`}
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                        <h2 className="text-xl font-bold text-slate-800 mb-6">Quick Actions</h2>
                        <div className="space-y-3">
                            <Link
                                to="/admin/orders"
                                className="flex items-center justify-between p-4 rounded-lg bg-slate-50 hover:bg-cyan-50 border border-slate-200 hover:border-cyan-200 transition-all duration-300 group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center group-hover:bg-cyan-200 transition-colors">
                                        <span className="text-xl">📋</span>
                                    </div>
                                    <span className="font-semibold text-slate-700 group-hover:text-cyan-700">View All Orders</span>
                                </div>
                                <svg className="w-5 h-5 text-slate-400 group-hover:text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>

                            <Link
                                to="/"
                                className="flex items-center justify-between p-4 rounded-lg bg-slate-50 hover:bg-cyan-50 border border-slate-200 hover:border-cyan-200 transition-all duration-300 group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center group-hover:bg-cyan-200 transition-colors">
                                        <span className="text-xl">🏠</span>
                                    </div>
                                    <span className="font-semibold text-slate-700 group-hover:text-cyan-700">View Website</span>
                                </div>
                                <svg className="w-5 h-5 text-slate-400 group-hover:text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-slate-800">Recent Orders</h2>
                        <Link to="/admin/orders" className="text-cyan-600 hover:text-cyan-700 font-semibold text-sm">
                            View All →
                        </Link>
                    </div>

                    {stats.recentOrders.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-200">
                                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Order ID</th>
                                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Customer</th>
                                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Total</th>
                                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Status</th>
                                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.recentOrders.map((order) => (
                                        <tr key={order._id} className="border-b border-slate-100 hover:bg-slate-50">
                                            <td className="py-3 px-4 text-sm font-mono text-slate-700 truncate max-w-[120px] inline-block">{order._id}</td>
                                            <td className="py-3 px-4 text-sm text-slate-700">{order.customer.name}</td>
                                            <td className="py-3 px-4 text-sm font-bold text-cyan-600">${order.total.toFixed(2)}</td>
                                            <td className="py-3 px-4">
                                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                                        order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                            'bg-red-100 text-red-800'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-sm text-slate-600">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-12 text-slate-500">
                            <div className="text-6xl mb-4">📦</div>
                            <p>No orders yet</p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
