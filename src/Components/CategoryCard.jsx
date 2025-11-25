import React from 'react'
import { Link } from 'react-router-dom'


export default function CategoryCard({ id, title, cta }) {
    return (
        <Link to={`/category/${id}`} className="block border rounded-lg p-6 hover:shadow-md transition">
            <div className="h-32 bg-slate-100 rounded mb-4 flex items-center justify-center">Image</div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-slate-500 mt-2">{cta}</p>
        </Link>
    )
}