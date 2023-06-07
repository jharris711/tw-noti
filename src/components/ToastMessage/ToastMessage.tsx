import { Theme } from '../../types/Theme';

interface Props extends React.PropsWithChildren {
  theme: Theme['message'];
}

const ToastMessage = ({ children, theme }: Props) => {
  return <div className={theme.classes}>{children}</div>;
};

export default ToastMessage;
