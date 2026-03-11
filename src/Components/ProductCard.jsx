import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../Context/CartContext';

export default function ProductCard({ product }) {
    const { addToCart } = useCart();

    const handleAddToCart = (e) => {
        e.preventDefault();
        addToCart(product);
    };

    return (
        <Link
            to={`/products/${product._id}`}
            className="group bg-slate-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col"
        >
            {/* Product Image */}
            <div className="relative h-56 overflow-hidden bg-white">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1585837575652-2c962605a207?auto=format&fit=crop&q=80&w=600';
                    }}
                />
                {/* Category Badge */}
                <div className="absolute top-3 left-3 bg-cyan-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {product.category}
                </div>
            </div>

            {/* Product Info */}
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-slate-800 group-hover:text-cyan-600 transition-colors mb-2 line-clamp-2">
                    {product.name}
                </h3>

                <p className="text-sm text-slate-600 mb-4 line-clamp-2 flex-grow">
                    {product.description}
                </p>

                {/* Price and Actions */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-200">
                    <span className="text-2xl font-bold text-cyan-600">
                        ${product.price}
                    </span>
                    <div className="flex gap-2">
                        <button
                            onClick={handleAddToCart}
                            className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-cyan-500/30 hover:scale-105 transition-all duration-300"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}