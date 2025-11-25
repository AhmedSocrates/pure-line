import React, { useState, useMemo } from 'react';
import ProductCard from '../Components/ProductCard';
import productsData from '../Data/products.json';

export default function Products() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Get unique categories
    const categories = useMemo(() => {
        const cats = [...new Set(productsData.map(p => p.category))];
        return ['all', ...cats];
    }, []);

    // Filter products
    const filteredProducts = useMemo(() => {
        return productsData.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
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

                {/* Results Count */}
                <p className="text-slate-600 mb-6">
                    Showing {filteredProducts.length} of {productsData.length} products
                </p>

                {/* Products Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-semibold text-slate-700 mb-2">No products found</h3>
                        <p className="text-slate-500">Try adjusting your search or filter criteria</p>
                    </div>
                )}
            </div>
        </div>
    );
}