import React, { useState, useEffect } from 'react';
import { defaultTheme } from '../../theme/defaultTheme';
import Toaster from '../Toaster';
import { Toast, ToastContextProps } from '../../types/Toast';

export const ToastContext = React.createContext<ToastContextProps>({
  theme: defaultTheme,
  toasts: [],
  enqueueToast: () => {
    console.log('');
  },
  dequeueToast: () => {
    console.log('');
  },
});

interface ProviderProps {
  children: React.ReactNode;
  maxToasts?: number;
  persist?: boolean;
  timeout?: number;
}

const ToastProvider = ({
  children,
  maxToasts = 3,
  persist = false,
  timeout = 3000,
}: ProviderProps) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [currentTheme] = useState(defaultTheme);

  useEffect(() => console.log('Context update:', toasts), [toasts]);

  const enqueueToast = ({
    content,
    type,
  }: {
    content: string;
    type: string;
  }) => {
    const newToast: Toast = {
      id: Date.now(),
      content,
      type,
    };

    if (maxToasts && toasts.length >= maxToasts) {
      setToasts((prevToasts) => prevToasts.slice(1));
    }

    setToasts((prevToasts) => [...prevToasts, newToast]);

    if (timeout && !persist) {
      setTimeout(() => {
        dequeueToast(newToast.id);
      }, timeout);
    }
  };

  const dequeueToast = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  const toastContextValue: ToastContextProps = {
    theme: currentTheme,
    toasts,
    enqueueToast,
    dequeueToast,
  };

  return (
    <ToastContext.Provider value={toastContextValue}>
      <Toaster />
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
