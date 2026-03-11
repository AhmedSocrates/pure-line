import React, { useState, useEffect, useMemo } from 'react';
import ProductCard from '../Components/ProductCard';
import api from '../utils/api';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState(['all']);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch categories on mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await api.get('/products/categories/list');
                setCategories(['all', ...data]);
            } catch (err) {
                console.error('Error fetching categories:', err);
            }
        };
        fetchCategories();
    }, []);

    // Fetch products whenever filters change
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const params = {};
                if (searchQuery) params.search = searchQuery;
                if (selectedCategory !== 'all') params.category = selectedCategory;

                const { data } = await api.get('/products', { params });
                setProducts(data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch products. Please try again later.');
                console.error('Error fetching products:', err);
            } finally {
                setLoading(false);
            }
        };

        // Debounce search to avoid too many API calls
        const timer = setTimeout(() => {
            fetchProducts();
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery, selectedCategory]);

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-16">
                <div className="container-max">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
                    <p className="text-xl text-cyan-50 max-w-2xl">
                        Explore our complete range of premium water purification solutions
                    </p>
                </div>
            </div>

            <div className="container-max py-12">
                {/* Filters */}
                <div className="mb-8 flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="md:w-64">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>
                                    {cat === 'all' ? 'All Categories' : cat}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Status Messages */}
                {loading && (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg text-center mb-8">
                        {error}
                    </div>
                )}

                {!loading && !error && (
                    <>
                        {/* Results Count */}
                        <p className="text-slate-600 mb-6">
                            Showing {products.length} products
                        </p>

                        {/* Products Grid */}
                        {products.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {products.map(product => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <div className="text-6xl mb-4">🔍</div>
                                <h3 className="text-2xl font-semibold text-slate-700 mb-2">No products found</h3>
                                <p className="text-slate-500">Try adjusting your search or filter criteria</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
