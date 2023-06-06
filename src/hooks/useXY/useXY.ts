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
    const temp = theme;
    temp.container.x = x;
    setCurrentTheme(temp);
  }, [x, theme, setCurrentTheme]);

  useEffect(() => {
    if (!y) return;
    const temp = theme;
    temp.container.y = y;
    setCurrentTheme(temp);
  }, [y, theme, setCurrentTheme]);
};

export default useXY;
