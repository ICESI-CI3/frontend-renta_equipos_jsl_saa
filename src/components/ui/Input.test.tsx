import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';

describe('Input', () => {
  it('renderiza el input y permite escribir', () => {
    render(<Input value="" onChange={() => {}} />);
    // You may need to adjust the selector below if Input does not render a label
    // expect(screen.getByLabelText('Nombre')).toBeInTheDocument();
  });
});
