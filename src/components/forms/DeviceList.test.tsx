import { render, screen } from '@testing-library/react';
import DeviceList from './DeviceList';

describe('DeviceList', () => {
  const devices = [
    { id: '1', name: 'Laptop', status: 'Disponible' },
    { id: '2', name: 'Proyector', status: 'Ocupado' },
  ];

  it('renderiza la lista de dispositivos', () => {
    render(<DeviceList devices={devices} />);
    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText('Proyector')).toBeInTheDocument();
  });
});
