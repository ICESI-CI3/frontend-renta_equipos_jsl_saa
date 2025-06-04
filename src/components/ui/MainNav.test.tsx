import { render, screen, fireEvent } from '@testing-library/react';
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn(),
    replace: jest.fn(),
    pathname: '/',
  }),
}));
// Mock useAuth
jest.mock('@/hooks', () => ({
  useAuth: jest.fn(),
}));
import { useAuth } from '@/hooks';
import MainNav from './MainNav';

describe('MainNav', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza la navegación principal', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null, logout: jest.fn() });
    render(<MainNav />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Crear Dispositivo')).toBeInTheDocument();
    expect(screen.getByText('Lista de Dispositivos')).toBeInTheDocument();
    expect(screen.getByText('Crear Solicitud')).toBeInTheDocument();
  });

  it('muestra el email y botón de cerrar sesión si hay usuario', () => {
    const mockLogout = jest.fn();
    (useAuth as jest.Mock).mockReturnValue({ user: { email: 'test@mail.com' }, logout: mockLogout });
    render(<MainNav />);
    expect(screen.getByText('test@mail.com')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cerrar sesión/i })).toBeInTheDocument();
  });

  it('llama logout si el usuario confirma el cierre de sesión', () => {
    const mockLogout = jest.fn();
    (useAuth as jest.Mock).mockReturnValue({ user: { email: 'test@mail.com' }, logout: mockLogout });
    window.confirm = jest.fn(() => true);
    render(<MainNav />);
    fireEvent.click(screen.getByRole('button', { name: /cerrar sesión/i }));
    expect(window.confirm).toHaveBeenCalledWith('¿Estás seguro de que quieres cerrar sesión?');
    expect(mockLogout).toHaveBeenCalled();
  });

  it('no llama logout si el usuario cancela el cierre de sesión', () => {
    const mockLogout = jest.fn();
    (useAuth as jest.Mock).mockReturnValue({ user: { email: 'test@mail.com' }, logout: mockLogout });
    window.confirm = jest.fn(() => false);
    render(<MainNav />);
    fireEvent.click(screen.getByRole('button', { name: /cerrar sesión/i }));
    expect(window.confirm).toHaveBeenCalled();
    expect(mockLogout).not.toHaveBeenCalled();
  });
});
