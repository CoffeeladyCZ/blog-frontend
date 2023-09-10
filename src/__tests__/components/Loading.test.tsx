import { render, screen } from '@testing-library/react';

import Loading from '../../components/Loading';

describe('Loading', () => {
  test('should snapshot with data', () => {
    const container = render(<Loading />);
    expect(container).toMatchSnapshot();
  });

  test('component is succesfully render', async () => {
    render(<Loading />);
    const loadingElement = await screen.getByTestId('loading');
    expect(loadingElement).toBeInTheDocument();
  });
});
