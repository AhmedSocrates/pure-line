import React from 'react';
import { formatPrice } from '../utils/formatters';

export default function BusinessSection() {
    return (
        <section className="py-20 bg-slate-900 text-white overflow-hidden relative">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cyan-900/20 to-transparent pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="container-max relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Content */}
                    <div className="flex-1 space-y-8">
                        <div className="inline-block px-4 py-1 rounded-full bg-cyan-900/50 border border-cyan-700 text-cyan-400 text-sm font-semibold tracking-wide uppercase">
                            For Business
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                            Industrial Grade <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                                Water Solutions
                            </span>
                        </h2>
                        <p className="text-slate-300 text-lg leading-relaxed">
                            Elevate your business with our commercial-grade filtration systems.
                            Perfect for car washes, laundromats, and industrial applications requiring
                            spot-free, purified water.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 rounded-full bg-cyan-400" />
                                <span className="text-slate-200">High-flow RO membranes</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 rounded-full bg-cyan-400" />
                                <span className="text-slate-200">Automated maintenance alerts</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 rounded-full bg-cyan-400" />
                                <span className="text-slate-200">24/7 Technical support</span>
                            </div>
                        </div>

                        <button className="btn-primary">
                            Request a Quote
                        </button>
                    </div>

                    {/* Featured Product Card */}
                    <div className="flex-1 w-full">
                        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-8 hover:border-cyan-500/50 transition-all duration-300 group">
                            <div className="relative mb-8 rounded-2xl overflow-hidden bg-white h-80 flex items-center justify-center">
                                <img
                                    src="https://images.unsplash.com/photo-1605218427368-35b019b8db5c?auto=format&fit=crop&q=80&w=800"
                                    alt="Car Wash RO Machine"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 bg-cyan-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                    BESTSELLER
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold mb-2">ProWash 5000 RO System</h3>
                            <p className="text-slate-400 mb-6">
                                Specialized spot-free rinse system for professional car washes.
                                Eliminates water spots and reduces drying time.
                            </p>

                            <div className="flex items-center justify-between border-t border-slate-700 pt-6">
                                <div>
                                    <p className="text-sm text-slate-400">Starting at</p>
                                    <p className="text-2xl font-bold text-white">{formatPrice(4999)}</p>
                                </div>
                                <button className="px-6 py-2 rounded-lg bg-slate-700 hover:bg-cyan-600 text-white transition-colors duration-300">
                                    View Specs
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
