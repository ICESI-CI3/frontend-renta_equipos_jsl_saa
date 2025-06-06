import React from 'react';
import { render, screen } from '@testing-library/react';
import WelcomeLinks from './WelcomeLinks';

describe('WelcomeLinks', () => {
  it('renderiza el mensaje de permisos', () => {
    render(<WelcomeLinks role={null} loading={false} />);
    expect(screen.getByText(/no tienes permisos/i)).toBeInTheDocument();
  });
  it('renderiza los enlaces de admin', () => {
    render(<WelcomeLinks role="admin" loading={false} />);
    expect(screen.getByText(/crear nuevo device/i)).toBeInTheDocument();
    expect(screen.getByText(/ver todos los devices/i)).toBeInTheDocument();
  });
  it('renderiza los enlaces de usuario', () => {
    render(<WelcomeLinks role="user" loading={false} />);
    expect(screen.getByText(/lista de equipos/i)).toBeInTheDocument();
    expect(screen.getByText(/mis solicitudes/i)).toBeInTheDocument();
  });
});
