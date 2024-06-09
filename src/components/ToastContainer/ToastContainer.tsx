import { Theme } from '@/types/Theme';

interface Props extends React.PropsWithChildren {
  theme: Theme['container'];
}

export function ToastContainer({ children, theme }: Props) {
  return (
    <div data-testid='toast-container' className={theme.classes}>
      {children}
    </div>
  );
}
