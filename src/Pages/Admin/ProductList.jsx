import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminLayout from '../../Components/AdminLayout';
import api from '../../utils/api';
import { formatPrice } from '../../utils/formatters';

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await api.get('/products');
            setProducts(data);
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching products');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await api.delete(`/products/${id}`);
                setProducts(products.filter((product) => product._id !== id));
            } catch (err) {
                alert(err.response?.data?.message || 'Error deleting product');
            }
        }
    };

    return (
        <AdminLayout>
            <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800 mb-2">Products Management</h1>
                        <p className="text-slate-600">Add, edit, and delete products from your store</p>
                    </div>
                    <button
                        onClick={() => navigate('/admin/products/new')}
                        className="btn-primary flex items-center gap-2"
                    >
                        <span>+</span> Add New Product
                    </button>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg border border-red-200 mb-6">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Image</th>
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Name</th>
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Category</th>
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Price</th>
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product._id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                            <td className="py-4 px-6">
                                                <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.target.src = 'https://images.unsplash.com/photo-1585837575652-2c962605a207?auto=format&fit=crop&q=80&w=200';
                                                        }}
                                                    />
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="font-semibold text-slate-800 line-clamp-2 max-w-xs">{product.name}</div>
                                            </td>
                                            <td className="py-4 px-6 text-sm text-slate-600">
                                                <span className="px-3 py-1 bg-slate-100 rounded-full">{product.category}</span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="font-bold text-cyan-600">{formatPrice(product.price)}</span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex gap-3">
                                                    <Link
                                                        to={`/admin/products/${product._id}/edit`}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Edit Product"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </Link>
                                                    <button
                                                        onClick={() => deleteHandler(product._id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete Product"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {products.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="py-12 text-center text-slate-500">
                                                No products found. Add a new product to get started.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
