import React from 'react'


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
                        <ul className="mt-2 text-sm text-slate-500">
                            <li>About</li>
                            <li>Services</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-medium">Support</h4>
                        <ul className="mt-2 text-sm text-slate-500">
                            <li>Contact</li>
                            <li>FAQ</li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}