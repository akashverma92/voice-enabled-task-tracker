import React from 'react';
import Navbar from './components/Navbar/Navbar';
import { TaskProvider } from './context/TaskContext';
import './App.css';

function App() {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
        <Navbar />
      </div>
    </TaskProvider>
  );
}

export default App;
