import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../Components/ProductCard';
import api from '../utils/api';

export default function CategoryDetail() {
    const { keyword } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            setLoading(true);
            try {
                // Fetch products by category keyword from the backend
                const { data } = await api.get(`/products?category=${keyword}`);
                setProducts(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching category products:', err);
                setError('Failed to load products for this category.');
            } finally {
                setLoading(false);
            }
        };

        if (keyword) {
            fetchCategoryProducts();
        }
    }, [keyword]);

    return (
        <div className="container-max py-16">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-slate-800 capitalize">
                    Category: {keyword?.replace(/-/g, ' ')}
                </h1>
                <p className="text-slate-500 mt-2">
                    Showing all products in {keyword?.replace(/-/g, ' ')}
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
                </div>
            ) : error ? (
                <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg text-center">
                    {error}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.length > 0 ? (
                        products.map((p) => (
                            <ProductCard key={p._id} product={p} />
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-2xl font-semibold text-slate-700 mb-2">
                                No products found
                            </h3>
                            <p className="text-slate-500">
                                We couldn't find any products in this category at the moment.
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}