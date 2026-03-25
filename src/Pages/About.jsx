import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../Data/Assests/Images/logo.png';

export default function About() {
    return (
        <div className="bg-slate-50 min-h-screen pt-24 pb-16">
            <div className="container-max">
                {/* Hero Section */}
                <section className="text-center mb-20">
                    <img 
                        src={logo} 
                        alt="PureLine Logo" 
                        className="mx-auto w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-lg mb-8"
                    />
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-700 mb-6">
                        Empowering Your Business Through Pure Water
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        At PureLine, we specialize in delivering industrial-grade water filtration systems that ensure reliability, seamless integration, and peak performance for your enterprise. We partner with businesses to provide scalable water solutions that you can trust day in and day out.
                    </p>
                </section>

                {/* Mission & Vision Cards */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                    {/* Mission Card */}
                    <div className="bg-white rounded-2xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(6,182,212,0.1)]">
                        <div className="w-14 h-14 bg-cyan-50 rounded-xl flex items-center justify-center mb-6">
                            <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">Our Mission</h2>
                        <p className="text-slate-600 leading-relaxed">
                            To engineer superior water filtration technologies that drive efficiency and sustainability for our partners. We strive to provide commercial solutions that eliminate downtime and guarantee uncompromised water quality, empowering your business to focus on what it does best.
                        </p>
                    </div>

                    {/* Vision Card */}
                    <div className="bg-white rounded-2xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(59,130,246,0.1)]">
                        <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">Our Vision</h2>
                        <p className="text-slate-600 leading-relaxed">
                            To become the definitive B2B standard in commercial water purification worldwide. We envision a future where every industrial and corporate facility operates with flawless, environmentally optimized water infrastructure seamlessly managed through connected technology.
                        </p>
                    </div>
                </section>

                {/* B2B Dashboard Showcase */}
                <section className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl mb-24 relative">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cyan-900/40 to-transparent pointer-events-none" />
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
                        <div className="p-12 lg:pr-8 relative z-10">
                            <h2 className="text-3xl font-bold text-white mb-6">
                                The PureLine B2B Dashboard
                            </h2>
                            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                                Managing your enterprise filtration systems has never been easier. Our proprietary dashboard gives our partners complete control and deep insights, built to simplify your operations.
                            </p>
                            
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-900/50 flex items-center justify-center border border-cyan-800 mr-4">
                                        <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold text-lg">Wholesale Order Management</h3>
                                        <p className="text-slate-400 mt-1">Easily reorder membranes, filters, and parts in bulk with exclusive partner pricing.</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-900/50 flex items-center justify-center border border-cyan-800 mr-4">
                                        <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold text-lg">Real-Time Fleet Tracking</h3>
                                        <p className="text-slate-400 mt-1">Monitor the performance metrics, filter life, and TDS levels of deployed systems everywhere.</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-900/50 flex items-center justify-center border border-cyan-800 mr-4">
                                        <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold text-lg">Seamless Integration</h3>
                                        <p className="text-slate-400 mt-1">API access to pipe water quality data directly into your existing facility management software.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Abstract UI Representation */}
                        <div className="p-12 lg:pl-0 h-full flex items-center relative z-10">
                            <div className="w-full h-[400px] bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col">
                                {/* Fake Nav Bar */}
                                <div className="h-12 bg-slate-900/80 border-b border-slate-700 flex items-center px-4 space-x-2">
                                    <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
                                </div>
                                {/* Fake Dashboard Content */}
                                <div className="p-6 flex-1 flex flex-col gap-4">
                                    <div className="flex gap-4">
                                        <div className="h-24 bg-slate-700/50 rounded-xl flex-1 animate-pulse"></div>
                                        <div className="h-24 bg-slate-700/50 rounded-xl flex-1 animate-pulse delay-75"></div>
                                        <div className="h-24 bg-slate-700/50 rounded-xl flex-1 animate-pulse delay-150"></div>
                                    </div>
                                    <div className="h-full bg-slate-700/30 rounded-xl flex items-center justify-center border border-slate-700/50">
                                        <svg className="w-16 h-16 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="text-center bg-cyan-50 rounded-3xl p-12 lg:p-16 border border-cyan-100 shadow-[0_8px_30px_rgb(6,182,212,0.06)]">
                    <h2 className="text-3xl font-bold text-slate-800 mb-4">Ready to Elevate Your Water Systems?</h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
                        Join hundreds of businesses that trust PureLine for their critical water filtration needs. Let’s discuss how we can build a scalable partnership.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Link to="/contact" className="btn-primary w-full sm:w-auto text-lg px-10 py-4 shadow-cyan-500/30 font-semibold inline-flex items-center justify-center">
                            Get a Quote Today
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>
                        <Link to="/products" className="btn-secondary w-full sm:w-auto text-lg px-10 py-4 font-semibold text-center">
                            Explore Products
                        </Link>
                    </div>
                </section>

            </div>
        </div>
    );
}