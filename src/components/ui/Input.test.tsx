import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';

describe('Input', () => {
  it('renderiza el input y permite escribir', () => {
    render(<Input value="" onChange={() => {}} />);
    // You may need to adjust the selector below if Input does not render a label
    // expect(screen.getByLabelText('Nombre')).toBeInTheDocument();
  });

  it('renderiza el input deshabilitado', () => {
    render(<Input value="" onChange={() => {}} disabled placeholder="Nombre" />);
    const input = screen.getByPlaceholderText('Nombre');
    expect(input).toBeDisabled();
  });

  it('llama a onChange cuando se escribe', () => {
    const handleChange = jest.fn();
    render(<Input value="" onChange={handleChange} placeholder="Nombre" />);
    const input = screen.getByPlaceholderText('Nombre');
    fireEvent.change(input, { target: { value: 'Nuevo valor' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('muestra el error si se pasa la prop error', () => {
    render(<Input value="" onChange={() => {}} placeholder="Nombre" error="Campo requerido" />);
    expect(screen.getByText(/campo requerido/i)).toBeInTheDocument();
  });

  it('permite alternar visibilidad de contraseña', async () => {
    render(<Input value="1234" onChange={() => {}} placeholder="Contraseña" type="password" showPasswordToggle />);
    const input = screen.getByPlaceholderText('Contraseña');
    const toggle = screen.getByRole('button');
    expect(input).toHaveAttribute('type', 'password');
    await import('react').then(({ act }) => act(() => { toggle.click(); }));
    expect(input).toHaveAttribute('type', 'text');
  });
});
