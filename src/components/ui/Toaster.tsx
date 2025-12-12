"use client";

import React from 'react';
import { useToast } from '@/context/ToastContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export function Toaster() {
    const { toasts, dismiss } = useToast();

    return (
        <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none p-4">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <motion.div
                        key={toast.id}
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.9 }}
                        layout
                        className="pointer-events-auto min-w-[300px] max-w-md bg-white border border-black/10 shadow-lg rounded-xl p-4 flex items-start gap-3 backdrop-blur-md"
                    >
                        <div className="flex-shrink-0 mt-0.5">
                            {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-[var(--accent)] fill-[var(--accent)]/10" />}
                            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-500 fill-red-500/10" />}
                            {toast.type === 'info' && <Info className="w-5 h-5 text-blue-500 fill-blue-500/10" />}
                        </div>

                        <div className="flex-1">
                            <p className="font-sans text-sm font-medium text-black">
                                {toast.message}
                            </p>
                        </div>

                        <button
                            onClick={() => dismiss(toast.id)}
                            className="flex-shrink-0 text-black/40 hover:text-black transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
