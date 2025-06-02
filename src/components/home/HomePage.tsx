// src/components/home/HomePage.tsx
import { HeroSection, NavigationLinks, HomeContainer } from './';

interface NavigationLink {
  href: string;
  label: string;
}

interface HomePageProps {
  title?: string;
  description?: string;
  navigationLinks?: NavigationLink[];
}

export default function HomePageComponent({ 
  title = "Bienvenido a la Plataforma de Renta de Equipos",
  description = "Gestiona dispositivos, solicitudes y contratos de manera eficiente",
  navigationLinks = [
    { href: '/login', label: 'Login' },
    { href: '/register', label: 'Registro' }
  ]
}: HomePageProps) {
  return (
    <HomeContainer>
      <HeroSection title={title} description={description} />
      <NavigationLinks links={navigationLinks} />
    </HomeContainer>
  );
}
