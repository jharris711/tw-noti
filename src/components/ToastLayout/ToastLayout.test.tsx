import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

import { ToastLayout } from './ToastLayout';

describe('Toast layout component', () => {
  test('should render the component', () => {
    render(
      <ToastLayout theme={{ classes: 'toast' }} type='info'>
        Test
      </ToastLayout>
    );

    const toastLayout = screen.getByRole('alert');
    expect(toastLayout).toBeInTheDocument();
    expect(toastLayout).toHaveClass('toast');
    expect(toastLayout).toHaveTextContent('Test');
  });

  test('should render the component with different type', () => {
    render(
      <ToastLayout theme={{ classes: 'toast' }} type='success'>
        Test
      </ToastLayout>
    );

    const toastLayout = screen.getByRole('alert');
    expect(toastLayout).toBeInTheDocument();
    expect(toastLayout).toHaveClass('toast');
    expect(toastLayout).toHaveTextContent('Test');
  });
});
