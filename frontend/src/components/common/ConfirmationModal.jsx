import React from 'react';

const ConfirmationModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Confirm', cancelText = 'Cancel', isDangerous = false }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[60] p-4 animate-fade-in">
            <div className="bg-slate-900 w-full max-w-md rounded-xl shadow-2xl border border-slate-700 overflow-hidden animate-scale-in">
                <div className="p-6 text-center">
                    <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full mb-4 ${isDangerous ? 'bg-red-900/30 text-red-400' : 'bg-indigo-900/30 text-indigo-400'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                    <p className="text-slate-400 mb-6">{message}</p>

                    <div className="flex gap-3 justify-center">
                        <button
                            onClick={onCancel}
                            className="px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors font-medium border border-slate-700"
                        >
                            {cancelText}
                        </button>
                        <button
                            onClick={onConfirm}
                            className={`px-4 py-2 rounded-lg text-white font-bold shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] ${isDangerous
                                    ? 'bg-red-600 hover:bg-red-700 shadow-red-500/30'
                                    : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/30'
                                }`}
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
