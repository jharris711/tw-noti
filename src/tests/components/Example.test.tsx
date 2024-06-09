import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

import Example from '@/components/Example';

describe('should render properly', () => {
  test('should render the component', () => {
    render(<Example />);
    const component = screen.getByTestId('example-component');
    expect(component).toBeInTheDocument();
  });
});
