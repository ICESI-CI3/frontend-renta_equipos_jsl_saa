import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from './HomePage';

test('muestra el mensaje de bienvenida', () => {
  render(<HomePage />);
  expect(screen.getByText(/Bienvenido/i)).toBeInTheDocument();
});