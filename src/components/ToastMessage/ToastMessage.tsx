import { MessageTheme } from '../../types/Theme';

interface Props extends React.PropsWithChildren {
  theme: MessageTheme;
}

const ToastMessage = ({ children, theme }: Props) => {
  const classes = ['ml-3', theme.textSize, theme.fontStyle];

  return <div className={classes.join(' ')}>{children}</div>;
};

export default ToastMessage;
