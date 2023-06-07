import { Theme } from '../../types/Theme';

interface Props extends React.PropsWithChildren {
  theme: Theme['container'];
}

const ToastContainer = ({ children, theme }: Props) => {
  return <div className={theme.classes}>{children}</div>;
};

export default ToastContainer;
