import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Hardcoded credentials
        if (credentials.username === 'admin' && credentials.password === 'admin123') {
            // Store auth token
            localStorage.setItem('pureline_admin_token', 'authenticated');
            navigate('/admin/dashboard');
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        PureLine<span className="text-cyan-400">.</span>
                    </h1>
                    <p className="text-cyan-200">Admin Portal</p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Sign In</h2>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                value={credentials.username}
                                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                placeholder="Enter username"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={credentials.password}
                                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                placeholder="Enter password"
                                required
                            />
                        </div>

                        <button type="submit" className="w-full btn-primary">
                            Sign In
                        </button>
                    </form>

                    {/* Demo Credentials */}
                    <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <p className="text-xs text-slate-600 font-semibold mb-2">Demo Credentials:</p>
                        <p className="text-xs text-slate-600">Username: <code className="bg-white px-2 py-1 rounded">admin</code></p>
                        <p className="text-xs text-slate-600">Password: <code className="bg-white px-2 py-1 rounded">admin123</code></p>
                    </div>
                </div>

                {/* Back to Site */}
                <div className="text-center mt-6">
                    <button
                        onClick={() => navigate('/')}
                        className="text-cyan-200 hover:text-white transition-colors"
                    >
                        ← Back to Website
                    </button>
                </div>
            </div>
        </div>
    );
}
