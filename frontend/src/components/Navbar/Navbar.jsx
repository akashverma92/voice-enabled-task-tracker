import React, { useState, lazy, Suspense } from 'react';
import ErrorBoundary from '../common/ErrorBoundary';

// Lazy load feature components
const Home = lazy(() => import('../../features/task/Home'));
const CreateTask = lazy(() => import('../../features/task/CreateTask'));
const VoiceInput = lazy(() => import('../../features/task/VoiceInput'));

const Navbar = () => {
    const [activeTab, setActiveTab] = useState('home');

    const getTabClass = (tabName) => {
        const baseClass = "px-4 py-2 rounded-lg transition-all duration-200 font-medium";
        return activeTab === tabName
            ? `${baseClass} bg-indigo-600 text-white shadow-lg shadow-indigo-500/30`
            : `${baseClass} text-slate-300 hover:bg-slate-800 hover:text-white`;
    };

    return (
        <div className="w-full flex flex-col h-screen">
            <nav className="bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-50 backdrop-blur-sm bg-opacity-90">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">T</span>
                        </div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                            Task Tracker
                        </h1>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => setActiveTab('home')} className={getTabClass('home')}>Board</button>
                        <button onClick={() => setActiveTab('create-task')} className={getTabClass('create-task')}>New Task</button>
                        <button onClick={() => setActiveTab('voice-input')} className={getTabClass('voice-input')}>Voice Input</button>
                    </div>
                </div>
            </nav>
            <main className="flex-1 overflow-y-auto bg-slate-950 p-6">
                <div className="container mx-auto max-w-6xl">
                    <ErrorBoundary>
                        <Suspense fallback={<div className="text-white">Loading...</div>}>
                            {activeTab === 'home' && <Home />}
                            {activeTab === 'create-task' && <CreateTask onTaskCreated={() => setActiveTab('home')} />}
                            {activeTab === 'voice-input' && <VoiceInput onTaskCreated={() => setActiveTab('home')} />}
                        </Suspense>
                    </ErrorBoundary>
                </div>
            </main>
        </div>
    );
};

export default Navbar;
