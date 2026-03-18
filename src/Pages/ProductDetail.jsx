import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import api from '../utils/api';
import { formatPrice } from '../utils/formatters';

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductData = async () => {
            setLoading(true);
            try {
                // Fetch current product
                const { data: productData } = await api.get(`/products/${id}`);
                setProduct(productData);

                // Fetch related products (same category)
                const { data: relatedData } = await api.get('/products', {
                    params: { category: productData.category }
                });
                setRelatedProducts(relatedData.filter(p => p._id !== id).slice(0, 4));

                setError(null);
            } catch (err) {
                setError('Product not found or error loading data.');
                console.error('Error fetching product:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProductData();
        // Reset quantity when ID changes
        setQuantity(1);
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product, quantity);
            setAddedToCart(true);
            setTimeout(() => setAddedToCart(false), 2000);
        }
    };

    const handleBuyNow = () => {
        if (product) {
            addToCart(product, quantity);
            navigate('/cart');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
                    <h2 className="text-3xl font-bold text-slate-800 mb-4">Product Not Found</h2>
                    <p className="text-slate-500 mb-6">{error || "The product you're looking for doesn't exist."}</p>
                    <Link to="/products" className="btn-primary">
                        Back to Products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Breadcrumb */}
            <div className="bg-white border-b">
                <div className="container-max py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Link to="/" className="hover:text-cyan-600">Home</Link>
                        <span>/</span>
                        <Link to="/products" className="hover:text-cyan-600">Products</Link>
                        <span>/</span>
                        <span className="text-slate-800 font-medium">{product.name}</span>
                    </div>
                </div>
            </div>

            <div className="container-max py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Product Image */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 h-fit">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-auto max-h-[500px] object-contain rounded-lg"
                            onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1585837575652-2c962605a207?auto=format&fit=crop&q=80&w=800';
                            }}
                        />
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        {/* Category Badge */}
                        <div className="inline-block mb-4">
                            <span className="px-4 py-1 rounded-full bg-cyan-100 text-cyan-700 text-sm font-semibold">
                                {product.category}
                            </span>
                        </div>

                        {/* Product Name */}
                        <h1 className="text-4xl font-bold text-slate-800 mb-4">
                            {product.name}
                        </h1>

                        {/* Price */}
                        <div className="mb-6">
                            <span className="text-5xl font-bold text-gradient">
                                {formatPrice(product.price)}
                            </span>
                        </div>

                        {/* Description */}
                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                            {product.description}
                        </p>

                        {/* Specifications */}
                        {product.specs && Object.keys(product.specs).length > 0 && (
                            <div className="bg-slate-50 rounded-xl p-6 mb-8 border border-slate-200">
                                <h3 className="text-xl font-bold text-slate-800 mb-4">Specifications</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {Object.entries(product.specs).map(([key, value]) => (
                                        <div key={key} className="flex flex-col">
                                            <span className="text-sm text-slate-500 capitalize mb-1">
                                                {key.replace(/_/g, ' ')}
                                            </span>
                                            <span className="text-slate-800 font-semibold">
                                                {value}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity Selector */}
                        <div className="mb-8">
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Quantity
                            </label>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-12 h-12 rounded-lg border-2 border-slate-300 hover:border-cyan-500 hover:bg-cyan-50 transition-all duration-300 flex items-center justify-center text-xl font-bold"
                                >
                                    −
                                </button>
                                <input
                                    type="number"
                                    min="1"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="w-20 h-12 text-center text-xl font-bold border-2 border-slate-300 rounded-lg focus:outline-none focus:border-cyan-500"
                                />
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-12 h-12 rounded-lg border-2 border-slate-300 hover:border-cyan-500 hover:bg-cyan-50 transition-all duration-300 flex items-center justify-center text-xl font-bold"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 btn-primary relative"
                            >
                                {addedToCart ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span>✓</span> Added to Cart
                                    </span>
                                ) : (
                                    'Add to Cart'
                                )}
                            </button>
                            <button
                                onClick={handleBuyNow}
                                className="flex-1 btn-secondary"
                            >
                                Buy Now
                            </button>
                        </div>

                        {/* Additional Info */}
                        <div className="mt-8 pt-8 border-t border-slate-200">
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-slate-600">
                                    <span className="text-cyan-600">✓</span>
                                    <span>Free shipping on orders over {formatPrice(500)}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-600">
                                    <span className="text-cyan-600">✓</span>
                                    <span>1-year warranty included</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-600">
                                    <span className="text-cyan-600">✓</span>
                                    <span>24/7 customer support</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products Section */}
                {relatedProducts.length > 0 && (
                    <div className="mt-20">
                        <h2 className="text-3xl font-bold text-slate-800 mb-8">Related Products</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map(relatedProduct => (
                                <Link
                                    key={relatedProduct._id}
                                    to={`/products/${relatedProduct._id}`}
                                    className="group bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100"
                                >
                                    <div className="h-40 mb-3 overflow-hidden rounded-lg">
                                        <img
                                            src={relatedProduct.image}
                                            alt={relatedProduct.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            onError={(e) => {
                                                e.target.src = 'https://images.unsplash.com/photo-1585837575652-2c962605a207?auto=format&fit=crop&q=80&w=400';
                                            }}
                                        />
                                    </div>
                                    <h4 className="font-semibold text-slate-800 mb-2 line-clamp-2">
                                        {relatedProduct.name}
                                    </h4>
                                    <p className="text-cyan-600 font-bold">{formatPrice(relatedProduct.price)}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
