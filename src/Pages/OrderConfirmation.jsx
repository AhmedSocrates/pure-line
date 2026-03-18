import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import { formatPrice } from '../utils/formatters';

export default function OrderConfirmation() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            setLoading(true);
            try {
                // Note: The backend route /api/orders/:id might require being logged in 
                // OR it might have logic to allow viewing if the token matches.
                // For now, we use our api utility which attaches the token.
                const { data } = await api.get(`/orders/${orderId}`);
                setOrder(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching order:', err);
                setError('Order not found or access denied.');
            } finally {
                setLoading(false);
            }
        };

        if (orderId) {
            fetchOrder();
        }
    }, [orderId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
                    <h2 className="text-3xl font-bold text-slate-800 mb-4">Order Not Found</h2>
                    <p className="text-slate-500 mb-6">We couldn't find the order with ID: {orderId}</p>
                    <Link to="/products" className="btn-primary">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Success Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-16">
                <div className="container-max text-center">
                    <div className="inline-block mb-6">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto">
                            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Order Confirmed!</h1>
                    <p className="text-xl text-green-50">
                        Thank you for your purchase. Your order has been received.
                    </p>
                </div>
            </div>

            <div className="container-max py-12">
                <div className="max-w-3xl mx-auto">
                    {/* Order Details Card */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 mb-8">
                        <div className="border-b pb-6 mb-6">
                            <h2 className="text-2xl font-bold text-slate-800 mb-2">Order Details</h2>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <p className="text-sm text-slate-500">Order Number</p>
                                    <p className="text-lg font-bold text-cyan-600 truncate max-w-[200px]">{order._id}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">Order Date</p>
                                    <p className="font-semibold text-slate-800">
                                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">Status</p>
                                    <span className="inline-block px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-semibold capitalize">
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Customer Information */}
                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-slate-800 mb-4">Shipping Information</h3>
                            <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                                <p className="font-semibold text-slate-800">{order.customer.name}</p>
                                <p className="text-slate-600">{order.customer.email}</p>
                                <p className="text-slate-600">{order.customer.phone}</p>
                                <p className="text-slate-600">
                                    {order.customer.address}<br />
                                    {order.customer.city}, {order.customer.state} {order.customer.zipCode}
                                </p>
                                {order.customer.notes && (
                                    <div className="pt-2 border-t border-slate-200">
                                        <p className="text-sm text-slate-500">Notes:</p>
                                        <p className="text-slate-600">{order.customer.notes}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-slate-800 mb-4">Order Items</h3>
                            <div className="space-y-4">
                                {order.items.map((item) => (
                                    <div key={item._id || item.product} className="flex gap-4 pb-4 border-b border-slate-100 last:border-0">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-20 h-20 object-cover rounded-lg"
                                            onError={(e) => {
                                                e.target.src = 'https://images.unsplash.com/photo-1585837575652-2c962605a207?auto=format&fit=crop&q=80&w=200';
                                            }}
                                        />
                                        <div className="flex-grow">
                                            <h4 className="font-semibold text-slate-800">{item.name}</h4>
                                            <p className="text-sm text-slate-500">{item.category}</p>
                                            <p className="text-sm text-slate-600 mt-1">
                                                Quantity: {item.quantity} × {formatPrice(item.price)}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-cyan-600">
                                                {formatPrice(item.price * item.quantity)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="bg-slate-50 rounded-lg p-6">
                            <h3 className="text-lg font-bold text-slate-800 mb-4">Order Summary</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between text-slate-600">
                                    <span>Subtotal</span>
                                    <span className="font-semibold">{formatPrice(order.subtotal || 0)}</span>
                                </div>
                                <div className="flex justify-between text-slate-600">
                                    <span>Shipping</span>
                                    <span className="font-semibold">
                                        {order.shipping === 0 ? 'FREE' : formatPrice(order.shipping || 0)}
                                    </span>
                                </div>
                                <div className="border-t pt-3">
                                    <div className="flex justify-between text-xl font-bold">
                                        <span className="text-slate-800">Total</span>
                                        <span className="text-gradient">{formatPrice(order.total || 0)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Next Steps */}
                    <div className="bg-cyan-50 rounded-2xl p-8 border border-cyan-100 mb-8">
                        <h3 className="text-xl font-bold text-slate-800 mb-4">What's Next?</h3>
                        <div className="space-y-3 text-slate-700">
                            <div className="flex items-start gap-3">
                                <span className="text-cyan-600 mt-1">📧</span>
                                <p>You'll receive an email confirmation at <strong>{order.customer.email}</strong></p>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-cyan-600 mt-1">📦</span>
                                <p>We'll send you tracking information once your order ships</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-cyan-600 mt-1">💬</span>
                                <p>Our support team is available 24/7 if you have any questions</p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/products" className="btn-primary text-center">
                            Continue Shopping
                        </Link>
                        <Link to="/" className="btn-secondary text-center">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
