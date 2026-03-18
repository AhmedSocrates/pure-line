import React, { useState, useEffect } from 'react';
import CategoryCard from '../Components/CategoryCard';
import api from '../utils/api';

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await api.get('/products/categories/list');
                // Map the category strings to an object format similar to what was hardcoded
                const mappedCategories = data.map(cat => ({
                    id: cat,
                    title: cat,
                    cta: `Explore our collection of ${cat}`
                }));
                setCategories(mappedCategories);
            } catch (err) {
                console.error('Error fetching categories:', err);
                setError('Failed to load categories.');
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="container-max py-16">
            <h1 className="text-4xl font-bold text-slate-800 mb-2">Categories</h1>
            <p className="text-slate-500 mb-8">Click a category to view our premium products.</p>

            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
                </div>
            ) : error ? (
                <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg text-center">
                    {error}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.length > 0 ? (
                        categories.map(c => (
                            <CategoryCard
                                key={c.id}
                                id={c.id}
                                title={c.title}
                                cta={c.cta}
                            />
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center text-slate-500">
                            No categories found.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}