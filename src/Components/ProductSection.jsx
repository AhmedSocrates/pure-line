import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import api from '../utils/api';

export default function ProductSection() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await api.get('/products');
                // Show only first 6 products as featured
                setProducts(data.slice(0, 6));
            } catch (error) {
                console.error('Error fetching featured products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <section className="py-20 bg-white">
            <div className="container-max">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4 text-slate-800">Premium Water Solutions</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Discover our range of cutting-edge filtration systems designed to provide you with the healthiest water possible.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 text-slate-500">
                        No products available at the moment.
                    </div>
                )}

                <div className="text-center mt-12">
                    <Link to="/products" className="btn-secondary inline-block">
                        View All Products
                    </Link>
                </div>
            </div>
        </section>
    );
}
