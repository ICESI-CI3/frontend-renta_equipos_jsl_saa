import React from 'react';
import { render, screen } from '@testing-library/react';
import RequestDevicesTable from './RequestDevicesTable';

describe('RequestDevicesTable', () => {
  const devices = [
    { id: 1, name: 'Laptop', quantity: 2 },
    { id: 2, name: 'Proyector', quantity: 1 },
  ];

  it('renderiza la tabla de dispositivos de la solicitud', () => {
    render(<RequestDevicesTable devices={devices} />);
    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText('Proyector')).toBeInTheDocument();
  });
});
