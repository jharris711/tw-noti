import { describe, expect, test, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { Example } from './Example';

const mockEnqueueToast = vi.fn();
vi.mock('../../hooks/useToast/useToast', () => ({
  useToast: () => ({
    enqueueToast: mockEnqueueToast
  })
}));

describe('Example component', () => {
  test('should render the component', () => {
    render(<Example />);

    const component = screen.getByTestId('example-component');

    expect(component).toBeInTheDocument();
  });

  test('should call enqueueToast on button click', () => {
    render(<Example />);

    const button = screen.getByTestId('example-component-toast-trigger-button');

    fireEvent.click(button);

    expect(mockEnqueueToast).toHaveBeenCalledWith({
      content: 'This is a notification',
      type: 'info'
    });
  });
});
