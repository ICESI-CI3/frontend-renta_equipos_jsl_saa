import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardLinks from './DashboardLinks';
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn(),
    replace: jest.fn(),
    pathname: '/',
  }),
}));
jest.mock('@/hooks', () => ({
  useAuth: () => ({ user: { role: 'admin' } })
}));

describe('DashboardLinks', () => {
  it('renderiza los enlaces del dashboard', () => {
    render(<DashboardLinks />);
    expect(screen.getByText(/ver lista de dispositivos/i)).toBeInTheDocument();
    expect(screen.getByText(/crear nuevo dispositivo/i)).toBeInTheDocument();
  });
});
