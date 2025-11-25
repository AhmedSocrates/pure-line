import React from 'react'
import CategoryCard from '../Components/CategoryCard'


export default function Categories() {
    const categories = [
        { id: 'filters', title: 'Filters', cta: 'High-quality filters' },
        { id: 'dispensers', title: 'Dispensers', cta: 'Convenient dispensing solutions' },
        { id: 'ro-systems', title: 'RO Systems', cta: 'Whole-home & under-sink systems' },
        { id: 'accessories', title: 'Accessories', cta: 'Fittings & spare parts' },
    ]


    return (
        <div className="container-max py-16">
            <h1 className="text-3xl font-semibold">Categories</h1>
            <p className="text-slate-500 mt-2">Click a category to view its products.</p>


            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map(c => <CategoryCard key={c.id} id={c.id} title={c.title} cta={c.cta} />)}
            </div>
        </div>
    )
}