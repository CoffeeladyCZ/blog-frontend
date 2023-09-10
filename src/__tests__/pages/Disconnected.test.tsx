import { render, screen } from '@testing-library/react';

import Disconnected from '../../pages/Disconected';

describe('Disconnected', () => {
  test('should snapshot with data', () => {
    const container = render(<Disconnected />);
    expect(container).toMatchSnapshot();
  });

  test('component is succesfully render', async () => {
    render(<Disconnected />);
    const disconnectedElement = await screen.getByTestId('disconnected');

    expect(disconnectedElement).toBeInTheDocument();
  });
});
