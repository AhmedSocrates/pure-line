import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto px-4">
                    <div className="text-8xl mb-6">🛒</div>
                    <h2 className="text-3xl font-bold text-slate-800 mb-4">Your Cart is Empty</h2>
                    <p className="text-slate-600 mb-8">
                        Looks like you haven't added any products to your cart yet.
                    </p>
                    <Link to="/products" className="btn-primary">
                        Browse Products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-12">
                <div className="container-max">
                    <h1 className="text-4xl md:text-5xl font-bold">Shopping Cart</h1>
                    <p className="text-cyan-50 mt-2">{cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart</p>
                </div>
            </div>

            <div className="container-max py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300"
                            >
                                <div className="flex flex-col sm:flex-row gap-6">
                                    {/* Product Image */}
                                    <Link
                                        to={`/products/${item.id}`}
                                        className="w-full sm:w-32 h-32 flex-shrink-0 bg-slate-50 rounded-lg overflow-hidden"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                            onError={(e) => {
                                                e.target.src = 'https://images.unsplash.com/photo-1585837575652-2c962605a207?auto=format&fit=crop&q=80&w=400';
                                            }}
                                        />
                                    </Link>

                                    {/* Product Info */}
                                    <div className="flex-grow flex flex-col">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <Link
                                                    to={`/products/${item.id}`}
                                                    className="text-lg font-bold text-slate-800 hover:text-cyan-600 transition-colors"
                                                >
                                                    {item.name}
                                                </Link>
                                                <p className="text-sm text-slate-500 mt-1">{item.category}</p>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-500 hover:text-red-700 transition-colors p-2"
                                                title="Remove from cart"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between mt-auto">
                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-8 h-8 rounded-lg border-2 border-slate-300 hover:border-cyan-500 hover:bg-cyan-50 transition-all duration-300 flex items-center justify-center font-bold"
                                                >
                                                    −
                                                </button>
                                                <span className="w-12 text-center font-bold text-lg">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-8 h-8 rounded-lg border-2 border-slate-300 hover:border-cyan-500 hover:bg-cyan-50 transition-all duration-300 flex items-center justify-center font-bold"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            {/* Price */}
                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-cyan-600">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </p>
                                                <p className="text-sm text-slate-500">
                                                    ${item.price} each
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Clear Cart Button */}
                        <button
                            onClick={() => {
                                if (window.confirm('Are you sure you want to clear your cart?')) {
                                    clearCart();
                                }
                            }}
                            className="text-red-600 hover:text-red-700 font-semibold transition-colors"
                        >
                            Clear Cart
                        </button>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 sticky top-24">
                            <h2 className="text-2xl font-bold text-slate-800 mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-slate-600">
                                    <span>Subtotal</span>
                                    <span className="font-semibold">${getCartTotal().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-slate-600">
                                    <span>Shipping</span>
                                    <span className="font-semibold">
                                        {getCartTotal() >= 500 ? 'FREE' : '$25.00'}
                                    </span>
                                </div>
                                {getCartTotal() >= 500 && (
                                    <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                                        🎉 You qualify for free shipping!
                                    </div>
                                )}
                                <div className="border-t pt-4">
                                    <div className="flex justify-between text-xl font-bold text-slate-800">
                                        <span>Total</span>
                                        <span className="text-gradient">
                                            ${(getCartTotal() + (getCartTotal() >= 500 ? 0 : 25)).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate('/checkout')}
                                className="w-full btn-primary mb-3"
                            >
                                Proceed to Checkout
                            </button>

                            <Link
                                to="/products"
                                className="block w-full text-center btn-secondary"
                            >
                                Continue Shopping
                            </Link>

                            {/* Trust Badges */}
                            <div className="mt-6 pt-6 border-t border-slate-200 space-y-2 text-sm text-slate-600">
                                <div className="flex items-center gap-2">
                                    <span className="text-cyan-600">✓</span>
                                    <span>Secure checkout</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-cyan-600">✓</span>
                                    <span>30-day return policy</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-cyan-600">✓</span>
                                    <span>1-year warranty</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
