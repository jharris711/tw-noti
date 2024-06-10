import { Theme } from './Theme';

export interface Toast {
  id: number;
  content: string;
  type: string;
}

export interface ToastContextProps {
  reverseStackOrder: boolean;
  theme: Theme;
  toasts: Toast[];
  enqueueToast: ({ content, type }: { content: string; type: string }) => void;
  dequeueToast: (id: number) => void;
}

export interface TestTypeDelete {
  name: string;
}
