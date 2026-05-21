import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const success = useCallback((msg) => addToast(msg, 'success'), [addToast]);
  const error = useCallback((msg) => addToast(msg, 'error'), [addToast]);
  const warn = useCallback((msg) => addToast(msg, 'warn'), [addToast]);
  const info = useCallback((msg) => addToast(msg, 'info'), [addToast]);

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-emerald-400" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-rose-400" />;
      case 'warn':
        return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      case 'info':
      default:
        return <AlertCircle className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <ToastContext.Provider value={{ success, error, warn, info }}>
      {children}
      {/* Toast Overlay Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="flex items-center gap-3 p-4 bg-darkBg/90 hover:bg-darkBg border border-white/10 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-md animate-slide-in justify-between transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              {getIcon(toast.type)}
              <span className="text-sm font-semibold text-white/95 leading-snug">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-white/40 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};
