import { render, screen } from '@testing-library/react';
import DashboardLinks from './DashboardLinks';

describe('DashboardLinks', () => {
  it('renderiza los enlaces del dashboard', () => {
    render(<DashboardLinks />);
    expect(screen.getByText(/ver lista de dispositivos/i)).toBeInTheDocument();
    expect(screen.getByText(/crear nuevo dispositivo/i)).toBeInTheDocument();
  });
});
