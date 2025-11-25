import React from 'react';
import Hero from '../Components/Hero';
import ProductSection from '../Components/ProductSection';
import BusinessSection from '../Components/BusinessSection';

export default function Home() {
    return (
        <div className="flex flex-col">
            <Hero />
            <ProductSection />
            <BusinessSection />

            {/* Additional Trust Section */}
            <section className="py-16 bg-slate-50">
                <div className="container-max text-center">
                    <p className="text-slate-500 font-medium mb-8 uppercase tracking-widest text-sm">Trusted by Industry Leaders</p>
                    <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale">
                        {/* Simple text placeholders for logos */}
                        <span className="text-2xl font-bold text-slate-400">AQUATECH</span>
                        <span className="text-2xl font-bold text-slate-400">PURELIFE</span>
                        <span className="text-2xl font-bold text-slate-400">ECOWATER</span>
                        <span className="text-2xl font-bold text-slate-400">BLUEMARINE</span>
                    </div>
                </div>
            </section>
        </div>
    );
}