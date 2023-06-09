import React, { useEffect, useState, useMemo } from 'react';
import { defaultTheme } from '../../theme/defaultTheme';
import Toaster from '../Toaster';
import useTheme from '../../hooks/useTheme';
import { Toast, ToastContextProps } from '../../types/Toast';
import { Theme } from '../../types/Theme';

export const ToastContext = React.createContext<ToastContextProps>({
  reverseStackOrder: false,
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
  reverseStackOrder?: boolean;
  buttonClasses?: Theme['button']['classes'];
  containerClasses?: Theme['container']['classes'];
  iconClasses?: Theme['icon']['classes'];
  layoutClasses?: Theme['layout']['classes'];
  messageClasses?: Theme['message']['classes'];
}

// Sort the toasts array in descending order based on created-at time (toast.id)
const sortToasts = (toasts: Toast[]) => {
  const sorted = toasts;
  return sorted.sort((a, b) => b.id - a.id);
};

const ToastProvider = ({
  children,
  maxToasts = 3,
  persist = false,
  reverseStackOrder = false,
  timeout = 3000,
  buttonClasses,
  containerClasses,
  iconClasses,
  layoutClasses,
  messageClasses,
}: ProviderProps) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [queue, setQueue] = useState<Toast[]>([]);
  const { currentTheme } = useTheme({
    buttonClasses,
    containerClasses,
    iconClasses,
    layoutClasses,
    messageClasses,
  });

  useEffect(() => {
    if (queue.length > 0 && toasts.length < maxToasts) {
      const [nextToast, ...remainingQueue] = queue;
      setToasts((prevToasts) => [...prevToasts, nextToast]);
      setQueue(remainingQueue);

      if (timeout && !persist) {
        setTimeout(() => {
          dequeueToast(nextToast.id);
        }, timeout);
      }
    }
  }, [queue, toasts, maxToasts, persist, timeout, reverseStackOrder]);

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

    if (toasts.length >= maxToasts) {
      setQueue((prevQueue) => [...prevQueue, newToast]);
    } else {
      setToasts((prevToasts) => [...prevToasts, newToast]);

      if (timeout && !persist) {
        setTimeout(() => {
          dequeueToast(newToast.id);
        }, timeout);
      }
    }
  };

  const dequeueToast = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  const toastContextValue: ToastContextProps = {
    reverseStackOrder: reverseStackOrder,
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
