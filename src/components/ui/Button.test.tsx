import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renderiza el botón y responde al click', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Enviar</Button>);
    const btn = screen.getByText('Enviar');
    fireEvent.click(btn);
    expect(handleClick).toHaveBeenCalled();
  });

  it('renderiza el botón deshabilitado', () => {
    render(<Button disabled>Deshabilitado</Button>);
    const btn = screen.getByText('Deshabilitado');
    expect(btn).toBeDisabled();
  });

  it('renderiza el botón con clase personalizada', () => {
    render(<Button className="custom-class">Personalizado</Button>);
    const btn = screen.getByText('Personalizado');
    expect(btn.className).toMatch(/custom-class/);
  });
});
