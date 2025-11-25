import React, { useState, useEffect } from 'react';
import AdminLayout from '../../Components/AdminLayout';
import { getAllOrders, updateOrderStatus } from '../../utils/orderService';

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        loadOrders();
    }, []);

    useEffect(() => {
        filterOrders();
    }, [orders, statusFilter, searchQuery]);

    const loadOrders = () => {
        const allOrders = getAllOrders();
        setOrders(allOrders);
    };

    const filterOrders = () => {
        let filtered = [...orders];

        // Filter by status
        if (statusFilter !== 'all') {
            filtered = filtered.filter(order => order.status === statusFilter);
        }

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(order =>
                order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.customer.email.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Sort by date (newest first)
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setFilteredOrders(filtered);
    };

    const handleStatusUpdate = (orderId, newStatus) => {
        updateOrderStatus(orderId, newStatus);
        loadOrders();
    };

    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800',
        processing: 'bg-blue-100 text-blue-800',
        completed: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800'
    };

    return (
        <AdminLayout>
            <div className="p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">Order Management</h1>
                    <p className="text-slate-600">Manage and track all customer orders</p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Search by order ID, customer name, or email..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                            />
                        </div>

                        {/* Status Filter */}
                        <div className="md:w-48">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-4 text-sm text-slate-600">
                        Showing {filteredOrders.length} of {orders.length} orders
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    {filteredOrders.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Order ID</th>
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Customer</th>
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Items</th>
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Total</th>
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Status</th>
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Date</th>
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredOrders.map((order) => (
                                        <tr key={order.id} className="border-b border-slate-100 hover:bg-slate-50">
                                            <td className="py-4 px-6">
                                                <span className="font-mono text-sm text-slate-700">{order.id}</span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div>
                                                    <p className="font-semibold text-slate-800">{order.customer.name}</p>
                                                    <p className="text-sm text-slate-500">{order.customer.email}</p>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-sm text-slate-700">
                                                {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="font-bold text-cyan-600">${order.total.toFixed(2)}</span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold capitalize cursor-pointer border-0 ${statusColors[order.status]}`}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="processing">Processing</option>
                                                    <option value="completed">Completed</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                            </td>
                                            <td className="py-4 px-6 text-sm text-slate-600">
                                                {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </td>
                                            <td className="py-4 px-6">
                                                <button
                                                    onClick={() => setSelectedOrder(order)}
                                                    className="text-cyan-600 hover:text-cyan-700 font-semibold text-sm"
                                                >
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-16 text-slate-500">
                            <div className="text-6xl mb-4">📦</div>
                            <h3 className="text-xl font-semibold text-slate-700 mb-2">No orders found</h3>
                            <p>Try adjusting your search or filter criteria</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedOrder(null)}>
                    <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-slate-800">Order Details</h2>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Order Info */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-slate-500 mb-1">Order ID</p>
                                    <p className="font-mono text-sm font-semibold">{selectedOrder.id}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 mb-1">Date</p>
                                    <p className="font-semibold">{new Date(selectedOrder.createdAt).toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 mb-1">Status</p>
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusColors[selectedOrder.status]}`}>
                                        {selectedOrder.status}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 mb-1">Total</p>
                                    <p className="text-xl font-bold text-cyan-600">${selectedOrder.total.toFixed(2)}</p>
                                </div>
                            </div>

                            {/* Customer Info */}
                            <div className="bg-slate-50 rounded-lg p-4">
                                <h3 className="font-bold text-slate-800 mb-3">Customer Information</h3>
                                <div className="space-y-2 text-sm">
                                    <p><span className="text-slate-500">Name:</span> <span className="font-semibold">{selectedOrder.customer.name}</span></p>
                                    <p><span className="text-slate-500">Email:</span> {selectedOrder.customer.email}</p>
                                    <p><span className="text-slate-500">Phone:</span> {selectedOrder.customer.phone}</p>
                                    <p><span className="text-slate-500">Address:</span> {selectedOrder.customer.address}, {selectedOrder.customer.city}, {selectedOrder.customer.state} {selectedOrder.customer.zipCode}</p>
                                    {selectedOrder.customer.notes && (
                                        <p><span className="text-slate-500">Notes:</span> {selectedOrder.customer.notes}</p>
                                    )}
                                </div>
                            </div>

                            {/* Order Items */}
                            <div>
                                <h3 className="font-bold text-slate-800 mb-3">Order Items</h3>
                                <div className="space-y-3">
                                    {selectedOrder.items.map((item) => (
                                        <div key={item.id} className="flex gap-4 p-3 bg-slate-50 rounded-lg">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-16 h-16 object-cover rounded"
                                                onError={(e) => {
                                                    e.target.src = 'https://images.unsplash.com/photo-1585837575652-2c962605a207?auto=format&fit=crop&q=80&w=200';
                                                }}
                                            />
                                            <div className="flex-grow">
                                                <h4 className="font-semibold text-slate-800">{item.name}</h4>
                                                <p className="text-sm text-slate-500">{item.category}</p>
                                                <p className="text-sm text-slate-600 mt-1">
                                                    {item.quantity} × ${item.price} = <span className="font-bold text-cyan-600">${(item.price * item.quantity).toFixed(2)}</span>
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="bg-slate-50 rounded-lg p-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-slate-600">
                                        <span>Subtotal</span>
                                        <span className="font-semibold">${selectedOrder.subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-600">
                                        <span>Shipping</span>
                                        <span className="font-semibold">
                                            {selectedOrder.shipping === 0 ? 'FREE' : `$${selectedOrder.shipping.toFixed(2)}`}
                                        </span>
                                    </div>
                                    <div className="border-t pt-2 flex justify-between text-lg font-bold">
                                        <span>Total</span>
                                        <span className="text-cyan-600">${selectedOrder.total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
