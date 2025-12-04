import React, { useState } from 'react';
import Home from './Home';
import Contact from './Contact';
import Voiceinput from './voiceinput';

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
                    <button
                        onClick={() => setActiveTab('voiceinput')}
                        className={`px-3 py-2 rounded ${activeTab === 'voiceinput' ? 'bg-gray-500' : 'hover:bg-gray-700'}`}
                    >
                        Voice Input
                    </button>
                </div>
            </nav>

            <main className="container mx-auto mt-8">
                {activeTab === 'home' && <Home />}
                {activeTab === 'contact' && <Contact />}
                {activeTab === 'voiceinput' && <Voiceinput />}
            </main>
        </div>
    );
};

export default Navbar;
