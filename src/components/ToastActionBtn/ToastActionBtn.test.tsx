import { describe, expect, test, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { ToastActionBtn } from './ToastActionBtn';

describe('Toast action button', () => {
  test('should render the component', () => {
    const theme = {
      classes: 'test'
    };
    const type = 'info';
    const onClick = vi.fn();

    render(<ToastActionBtn theme={theme} type={type} onClick={onClick} />);

    const component = screen.getByRole('button');

    expect(component).toBeInTheDocument();
    expect(component).toHaveClass(theme.classes);

    fireEvent.click(component);

    expect(onClick).toHaveBeenCalled();
  });
});
