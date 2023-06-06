import { LayoutTheme } from '../../types/Theme';

interface Props extends React.PropsWithChildren {
  theme: LayoutTheme;
  type: string;
}

const ToastLayout = ({ children, theme, type }: Props) => {
  const classes = [
    'flex',
    'items-center',
    'w-full',
    'max-w-xs',
    'p-4',
    'rounded-lg',
    theme.shadow,
    theme.bg.dark,
    theme.bg.light,
    theme.text.dark,
    theme.text.light,
  ];

  return (
    <div id={`toast-${type}`} className={classes.join(' ')} role='alert'>
      {children}
    </div>
  );
};

export default ToastLayout;
