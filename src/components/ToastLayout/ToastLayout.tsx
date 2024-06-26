import { PropsWithChildren } from 'react';
import { Theme } from '@/types/Theme';

interface Props extends PropsWithChildren {
  theme: Theme['layout'];
  type: string;
}

export function ToastLayout({ children, theme, type }: Props) {
  return (
    <div id={`toast-${type}`} className={theme.classes} role='alert'>
      {children}
    </div>
  );
}
