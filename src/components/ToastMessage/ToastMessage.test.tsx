import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

import { ToastMessage } from './ToastMessage';

describe('Toast message component', () => {
  test('should render the component', () => {
    render(<ToastMessage theme={{ classes: 'toast' }}>Test</ToastMessage>);

    const toastMessage = screen.getByText('Test');
    expect(toastMessage).toBeInTheDocument();
    expect(toastMessage).toHaveClass('toast');
  });
});
