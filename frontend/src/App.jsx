import React from 'react';
import Navbar from './features/navbar/Navbar';
import { TaskProvider } from './context/TaskContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <TaskProvider>
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
          <Navbar />
        </div>
      </TaskProvider>
    </ErrorBoundary>
  );
}

export default App;
