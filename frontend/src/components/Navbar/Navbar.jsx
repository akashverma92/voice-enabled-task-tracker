import React, { useState } from 'react';
import Home from './Home';
import Contact from './Contact';

const Navbar = () => {
    const [activeTab, setActiveTab] = useState('home');

    return (
        <div className="w-full">
            <nav className="bg-gray-500 text-white p-4 flex justify-between items-center">
                <h1 className="text-3xl font-bold">Task Tracker</h1>
                <div className="flex gap-4">
                    <button
                        onClick={() => setActiveTab('home')}
                        className={`px-3 py-2 rounded ${activeTab === 'home' ? 'bg-gray-500' : 'hover:bg-gray-700'}`}
                    >
                        Home
                    </button>
                    <button
                        onClick={() => setActiveTab('contact')}
                        className={`px-3 py-2 rounded ${activeTab === 'contact' ? 'bg-gray-500' : 'hover:bg-gray-700'}`}
                    >
                        Contact
                    </button>
                </div>
            </nav>

            <main className="container mx-auto mt-8">
                {activeTab === 'home' && <Home />}
                {activeTab === 'contact' && <Contact />}
            </main>
        </div>
    );
};

export default Navbar;
