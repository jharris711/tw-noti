import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import useTheme from '@/hooks/useTheme';
import { defaultTheme } from '@/theme/defaultTheme';
import { Theme } from '@/types/Theme';
import { Toast, ToastContextProps } from '@/types/Toast';

import Toaster from '../Toaster';

export const ToastContext = React.createContext<ToastContextProps>({
  reverseStackOrder: false,
  theme: defaultTheme,
  toasts: [],
  enqueueToast: () => {
    console.log('');
  },
  dequeueToast: () => {
    console.log('');
  }
});

interface ProviderProps {
  children: React.ReactNode;
  domRoot?: Element | DocumentFragment;
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

export const ToastProvider = ({
  children,
  domRoot,
  maxToasts = 3,
  persist = false,
  reverseStackOrder = false,
  timeout = 3000,
  buttonClasses,
  containerClasses,
  iconClasses,
  layoutClasses,
  messageClasses
}: ProviderProps) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [queue, setQueue] = useState<Toast[]>([]);
  const { currentTheme } = useTheme({
    buttonClasses,
    containerClasses,
    iconClasses,
    layoutClasses,
    messageClasses
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
    type
  }: {
    content: string;
    type: string;
  }) => {
    const newToast: Toast = {
      id: Date.now(),
      content,
      type
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
    dequeueToast
  };

  return (
    <ToastContext.Provider value={toastContextValue}>
      {children}
      {domRoot ? createPortal(<Toaster />, domRoot) : <Toaster />}
    </ToastContext.Provider>
  );
};
