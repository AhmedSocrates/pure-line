import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import api from '../utils/api';

export default function Checkout() {
    const navigate = useNavigate();
    const { cart, getCartTotal, clearCart } = useCart();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        notes: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Redirect if cart is empty
    if (cart.length === 0) {
        navigate('/products');
        return null;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone is required';
        } else if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, ''))) {
            newErrors.phone = 'Phone must be at least 10 digits';
        }
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Calculate costs
            const subtotal = getCartTotal();
            const shippingCost = subtotal >= 500 ? 0 : 25;
            const total = subtotal + shippingCost;

            // Map cart items to the backend format
            const orderItems = cart.map(item => ({
                product: item._id, // MongoDB _id
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.image,
                category: item.category
            }));

            // Create order via API
            const response = await api.post('/orders', {
                customer: formData,
                items: orderItems,
                subtotal,
                shipping: shippingCost,
                total
            });

            const createdOrder = response.data;

            // Clear cart
            clearCart();

            // Navigate to confirmation page
            navigate(`/order-confirmation/${createdOrder._id}`);
        } catch (error) {
            console.error('Error creating order:', error);
            const errorMessage = error.response?.data?.message || 'There was an error processing your order. Please try again.';
            alert(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const shippingCost = getCartTotal() >= 500 ? 0 : 25;
    const total = getCartTotal() + shippingCost;

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-12">
                <div className="container-max">
                    <h1 className="text-4xl md:text-5xl font-bold">Checkout</h1>
                    <p className="text-cyan-50 mt-2">Complete your order</p>
                </div>
            </div>

            <div className="container-max py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Checkout Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                            <h2 className="text-2xl font-bold text-slate-800 mb-6">Shipping Information</h2>

                            <div className="space-y-6">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-slate-200'
                                            } focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
                                        placeholder="John Doe"
                                    />
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                </div>

                                {/* Email & Phone */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-slate-200'
                                                } focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
                                            placeholder="john@example.com"
                                        />
                                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-slate-200'
                                                } focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
                                            placeholder="(555) 123-4567"
                                        />
                                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                    </div>
                                </div>

                                {/* Address */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Street Address *
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 rounded-lg border ${errors.address ? 'border-red-500' : 'border-slate-200'
                                            } focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
                                        placeholder="123 Main Street"
                                    />
                                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                                </div>

                                {/* City, State, ZIP */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            City *
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.city ? 'border-red-500' : 'border-slate-200'
                                                } focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
                                            placeholder="New York"
                                        />
                                        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            State *
                                        </label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.state ? 'border-red-500' : 'border-slate-200'
                                                } focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
                                            placeholder="NY"
                                        />
                                        {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            ZIP Code *
                                        </label>
                                        <input
                                            type="text"
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.zipCode ? 'border-red-500' : 'border-slate-200'
                                                } focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
                                            placeholder="10001"
                                        />
                                        {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                                    </div>
                                </div>

                                {/* Notes */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Order Notes (Optional)
                                    </label>
                                    <textarea
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleChange}
                                        rows="4"
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                        placeholder="Any special instructions for your order..."
                                    />
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 sticky top-24">
                            <h2 className="text-2xl font-bold text-slate-800 mb-6">Order Summary</h2>

                            {/* Cart Items */}
                            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                                {cart.map((item) => (
                                    <div key={item._id} className="flex gap-3">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded-lg"
                                            onError={(e) => {
                                                e.target.src = 'https://images.unsplash.com/photo-1585837575652-2c962605a207?auto=format&fit=crop&q=80&w=200';
                                            }}
                                        />
                                        <div className="flex-grow">
                                            <h4 className="font-semibold text-sm text-slate-800 line-clamp-1">
                                                {item.name}
                                            </h4>
                                            <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                                            <p className="text-sm font-bold text-cyan-600">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pricing */}
                            <div className="space-y-3 border-t pt-4">
                                <div className="flex justify-between text-slate-600">
                                    <span>Subtotal</span>
                                    <span className="font-semibold">${getCartTotal().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-slate-600">
                                    <span>Shipping</span>
                                    <span className="font-semibold">
                                        {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                                    </span>
                                </div>
                                <div className="border-t pt-3">
                                    <div className="flex justify-between text-xl font-bold text-slate-800">
                                        <span>Total</span>
                                        <span className="text-gradient">${total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="w-full btn-primary mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Processing...' : 'Place Order'}
                            </button>

                            {/* Security Badge */}
                            <div className="mt-6 pt-6 border-t border-slate-200 text-center">
                                <p className="text-sm text-slate-600 flex items-center justify-center gap-2">
                                    <span className="text-green-600">🔒</span>
                                    Secure Checkout
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
