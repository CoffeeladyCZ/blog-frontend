import { render, screen } from '@testing-library/react';

import NotFound from '../../pages/NotFound';

describe('NotFound', () => {
  test('should snapshot with data', () => {
    const container = render(<NotFound />);
    expect(container).toMatchSnapshot();
  });

  test('component is succesfully render', async () => {
    render(<NotFound />);
    const notFoundElement = await screen.getByTestId('notFound');

    expect(notFoundElement).toBeInTheDocument();
  });
});
