import { render, screen } from '@testing-library/react';

import Notification from '../../components/Notification';

describe('Notification', () => {
  test('should snapshot with data', () => {
    const container = render(
      <Notification severity="success" message="Success" open={true} onClose={() => false} />
    );
    expect(container).toMatchSnapshot();
  });

  test('component is succesfully render', async () => {
    render(<Notification severity="success" message="Success" open={true} onClose={() => false} />);
    const notificationElement = await screen.getByTestId('notification');

    expect(notificationElement).toBeInTheDocument();
  });
});
