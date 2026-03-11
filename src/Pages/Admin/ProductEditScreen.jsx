import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import AdminLayout from '../../Components/AdminLayout';
import api from '../../utils/api';

export default function ProductEditScreen() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    const [loading, setLoading] = useState(isEditMode);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        description: '',
        image: '',
        stock: '',
        specs: {}
    });

    // Helper to edit raw JSON string
    const [specsStr, setSpecsStr] = useState('{}');

    useEffect(() => {
        if (isEditMode) {
            fetchProduct();
        }
    }, [id]);

    const fetchProduct = async () => {
        try {
            const { data } = await api.get(`/products/${id}`);
            setFormData({
                name: data.name || '',
                price: data.price || '',
                category: data.category || '',
                description: data.description || '',
                image: data.image || '',
                stock: data.stock || 0,
                specs: data.specs || {}
            });
            setSpecsStr(JSON.stringify(data.specs || {}, null, 2));
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching product');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSpecsChange = (e) => {
        setSpecsStr(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        try {
            // Parse specs JSON
            let parsedSpecs = {};
            try {
                parsedSpecs = JSON.parse(specsStr);
            } catch (err) {
                throw new Error('Invalid JSON format for Specifications');
            }

            const payload = {
                ...formData,
                specs: parsedSpecs,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock, 10)
            };

            if (isEditMode) {
                await api.put(`/products/${id}`, payload);
            } else {
                await api.post('/products', payload);
            }

            navigate('/admin/products');
        } catch (err) {
            setError(err.message || err.response?.data?.message || 'Error saving product');
        } finally {
            setSaving(false);
        }
    };

    return (
        <AdminLayout>
            <div className="p-8">
                <div className="mb-8">
                    <Link to="/admin/products" className="text-cyan-600 hover:text-cyan-700 font-semibold text-sm flex items-center gap-1 mb-4">
                        ← Back to Products
                    </Link>
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">
                        {isEditMode ? 'Edit Product' : 'Add New Product'}
                    </h1>
                    <p className="text-slate-600">
                        {isEditMode ? 'Update product details below' : 'Fill out the form to create a new product'}
                    </p>
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
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Product Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                        placeholder="e.g. PureLine RO System"
                                        required
                                    />
                                </div>

                                {/* Category */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Category
                                    </label>
                                    <input
                                        type="text"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                        placeholder="e.g. ro-systems"
                                        required
                                    />
                                </div>

                                {/* Price */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Price ($)
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                        placeholder="e.g. 299.99"
                                        required
                                    />
                                </div>

                                {/* Stock */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Stock Quantity
                                    </label>
                                    <input
                                        type="number"
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                        placeholder="e.g. 50"
                                        required
                                    />
                                </div>

                                {/* Image Path */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Image Path / URL
                                    </label>
                                    <input
                                        type="text"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                        placeholder="/Assets/Images/ro100.jpg"
                                        required
                                    />
                                    <p className="text-xs text-slate-500 mt-1">Use a path like /Assets/Images/filename.jpg or a full image URL.</p>
                                </div>

                                {/* Description */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows="4"
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                        placeholder="Detailed product description..."
                                        required
                                    />
                                </div>

                                {/* Specifications (JSON) */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Specifications (JSON format)
                                    </label>
                                    <textarea
                                        value={specsStr}
                                        onChange={handleSpecsChange}
                                        rows="6"
                                        className="w-full px-4 py-3 font-mono text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-slate-50"
                                        placeholder={'{\n  "capacity": "50 GPD",\n  "stages": "5"\n}'}
                                    />
                                    <p className="text-xs text-slate-500 mt-1">Must be valid JSON.</p>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4 border-t border-slate-200">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="btn-primary flex-1 disabled:opacity-50"
                                >
                                    {saving ? 'Saving...' : (isEditMode ? 'Update Product' : 'Create Product')}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => navigate('/admin/products')}
                                    className="btn-secondary flex-1"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
