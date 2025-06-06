import React from 'react';
import { render, screen } from '@testing-library/react';
import { RequestsTable } from './RequestsTable';
import { Request } from '@/types/request';

// Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

const mockRequests: Request[] = [
  {
    id: '1',
    user_email: 'test@example.com',
    date_start: '2025-01-01T00:00:00Z',
    date_finish: '2025-01-02T00:00:00Z',
    status: 'pending',
    admin_comment: 'Test comment',
  },
  {
    id: '2',
    user_email: 'test@example.com',
    date_start: '2025-01-03T00:00:00Z',
    date_finish: '2025-01-04T00:00:00Z',
    status: 'approved',
  },
];

describe('RequestsTable', () => {
  it('renders empty state when no requests and not loading', () => {
    render(<RequestsTable requests={[]} loading={false} />);
    expect(screen.getByText('No tienes solicitudes registradas.')).toBeInTheDocument();
  });

  it('renders requests table with data', () => {
    render(<RequestsTable requests={mockRequests} loading={false} />);
    
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('pending')).toBeInTheDocument();
    expect(screen.getByText('approved')).toBeInTheDocument();
    expect(screen.getByText('Test comment')).toBeInTheDocument();
  });

  it('renders table headers correctly', () => {
    render(<RequestsTable requests={mockRequests} loading={false} />);
    
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Fecha inicio')).toBeInTheDocument();
    expect(screen.getByText('Fecha fin')).toBeInTheDocument();
    expect(screen.getByText('Estado')).toBeInTheDocument();
    expect(screen.getByText('Comentario')).toBeInTheDocument();
    expect(screen.getByText('Acciones')).toBeInTheDocument();
  });

  it('displays action buttons for each request', () => {
    render(<RequestsTable requests={mockRequests} loading={false} />);
    
    const actionButtons = screen.getAllByText('Ver dispositivos');
    expect(actionButtons).toHaveLength(2);
  });

  it('formats dates correctly', () => {
    render(<RequestsTable requests={mockRequests} loading={false} />);
    
    expect(screen.getByText('2025-01-01')).toBeInTheDocument();
    expect(screen.getByText('2025-01-02')).toBeInTheDocument();
  });

  it('displays dash for missing admin comment', () => {
    render(<RequestsTable requests={mockRequests} loading={false} />);
    
    const dashElements = screen.getAllByText('-');
    expect(dashElements.length).toBeGreaterThan(0);
  });
});
