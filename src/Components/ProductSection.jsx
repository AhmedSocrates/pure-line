import React from 'react';

const products = [
    {
        id: 1,
        name: "PureLine Home RO System",
        price: "$299.99",
        image: "https://images.unsplash.com/photo-1585837575652-2c962605a207?auto=format&fit=crop&q=80&w=600",
        description: "Advanced 7-stage filtration for the purest drinking water."
    },
    {
        id: 2,
        name: "Alkaline Mineral Filter",
        price: "$49.99",
        image: "https://images.unsplash.com/photo-1521417531039-75e91486cc40?auto=format&fit=crop&q=80&w=600",
        description: "Restores essential minerals and balances pH levels."
    },
    {
        id: 3,
        name: "Smart Water Dispenser",
        price: "$599.00",
        image: "https://images.unsplash.com/photo-1625480863858-bf127128d9f0?auto=format&fit=crop&q=80&w=600",
        description: "Touchless dispensing with real-time purity monitoring."
    },
    {
        id: 4,
        name: "Industrial Softener",
        price: "$1,299.00",
        image: "https://images.unsplash.com/photo-1565610222536-ef125c59da2c?auto=format&fit=crop&q=80&w=600",
        description: "High-capacity water softening for large households."
    },
    {
        id: 5,
        name: "Portable UV Purifier",
        price: "$89.95",
        image: "https://images.unsplash.com/photo-1603154969738-466493c0cd75?auto=format&fit=crop&q=80&w=600",
        description: "Clean water on the go with UV-C technology."
    },
    {
        id: 6,
        name: "Replacement Filter Set",
        price: "$75.00",
        image: "https://images.unsplash.com/photo-1617143777034-fe4c261ac738?auto=format&fit=crop&q=80&w=600",
        description: "Annual replacement pack for standard RO systems."
    }
];

export default function ProductSection() {
    return (
        <section className="py-20 bg-white">
            <div className="container-max">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4 text-slate-800">Premium Water Solutions</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Discover our range of cutting-edge filtration systems designed to provide you with the healthiest water possible.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <div key={product.id} className="group bg-slate-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100">
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                                    <button className="btn-primary text-sm py-2 px-6">
                                        View Details
                                    </button>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-cyan-600 transition-colors">
                                        {product.name}
                                    </h3>
                                    <span className="text-lg font-bold text-cyan-600">{product.price}</span>
                                </div>
                                <p className="text-slate-600 text-sm mb-4">{product.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <button className="btn-secondary">
                        View All Products
                    </button>
                </div>
            </div>
        </section>
    );
}
