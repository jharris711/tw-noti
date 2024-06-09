import { Theme } from '../../types/Theme';

interface Props extends React.PropsWithChildren {
  theme: Theme['message'];
}

export function ToastMessage({ children, theme }: Props) {
  return <div className={theme.classes}>{children}</div>;
}
