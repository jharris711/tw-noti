import { useEffect } from 'react';
import { Theme } from '../../types/Theme';

const useXY = ({
  x,
  y,
  theme,
  setCurrentTheme,
}: {
  x?: string;
  y?: string;
  theme: Theme;
  setCurrentTheme: (theme: Theme) => void;
}) => {
  useEffect(() => {
    if (!x) return;
    theme.container.x = x;
    setCurrentTheme(theme);
  }, [x, theme, setCurrentTheme]);

  useEffect(() => {
    if (!y) return;
    theme.container.y = y;
    setCurrentTheme(theme);
  }, [y, theme, setCurrentTheme]);
};

export default useXY;
