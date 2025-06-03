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
});
