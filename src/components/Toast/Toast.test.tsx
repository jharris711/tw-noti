import { describe, expect, test, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { Toast } from './Toast';

describe('Toast component', () => {
  test('should render the component', () => {
    const content = 'Test notification';
    const type = 'info';

    render(<Toast content={content} type={type} index={0} />);

    const component = screen.getByTestId('toast-0');

    expect(component).toBeInTheDocument();
    expect(component).toHaveTextContent(content);

    const message = screen.getByText(content);
    expect(message).toBeInTheDocument();

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  test('should call onClose when close button is clicked', () => {
    const content = 'Test notification';
    const type = 'info';
    const onClose = vi.fn();
    render(<Toast content={content} type={type} onClose={onClose} index={0} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(onClose).toHaveBeenCalled();
  });
});
