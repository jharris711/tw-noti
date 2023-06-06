import { ContainerTheme } from '../../types/Theme';

interface Props extends React.PropsWithChildren {
  theme: ContainerTheme;
}

const ToastContainer = ({ children, theme }: Props) => {
  const classes = [theme.x, theme.y, theme.position, theme.zIndex];

  return <div className={classes.join(' ')}>{children}</div>;
};

export default ToastContainer;
