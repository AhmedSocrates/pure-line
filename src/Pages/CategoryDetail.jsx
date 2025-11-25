import React from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../Components/ProductCard'


export default function CategoryDetail() {
    const { id } = useParams()


    // placeholder: no real data, so show message and empty grid
    const products = []


    return (
        <div className="container-max py-16">
            <h1 className="text-3xl font-semibold">Category: {id}</h1>
            <p className="text-slate-500 mt-2">Products for this category (placeholder)</p>


            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.length ? products.map(p => <ProductCard key={p.id} product={p} />) : (
                    <div className="col-span-full text-slate-500">No products yet — content placeholder.</div>
                )}
            </div>
        </div>
    )
}