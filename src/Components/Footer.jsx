import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="bg-slate-50 border-t mt-12">
            <div className="container-max py-8 flex flex-col md:flex-row justify-between items-start gap-6">
                <div>
                    <h3 className="text-lg font-semibold">Pure Line</h3>
                    <p className="text-sm text-slate-500 mt-2">RO water solutions for home and business.</p>
                </div>
                <div className="flex gap-8">
                    <div>
                        <h4 className="font-medium">Company</h4>
                        <ul className="mt-2 text-sm text-slate-500 space-y-1">
                            <li>
                                <Link to="/about" className="hover:text-cyan-600 transition-colors">About</Link>
                            </li>
                            <li>
                                <Link to="/categories" className="hover:text-cyan-600 transition-colors">Services</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-medium">Support</h4>
                        <ul className="mt-2 text-sm text-slate-500 space-y-1">
                            <li>
                                <Link to="/about" className="hover:text-cyan-600 transition-colors">Contact</Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:text-cyan-600 transition-colors">FAQ</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}