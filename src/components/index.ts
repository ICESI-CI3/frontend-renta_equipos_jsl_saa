// src/components/index.ts

// Re-export from forms
export * from './forms';

// Re-export from home
export * from './home';

// Re-export from ui
export * from './ui';

// Direct exports for easier access
export { 
  DashboardLinks,
  DeviceList, 
  LoginForm,
  RegisterDeviceForm,
  RegisterForm,
  WelcomeLinks 
} from './forms';

export { 
  HeroSection,
  NavigationLinks,
  HomeContainer,
  HomePage 
} from './home';

export { 
  Button,
  Card,
  Input,
  MainNav,
  ProtectedRoute 
} from './ui';

// Export types
export type { RegisterFormData, RegisterDeviceFormData } from './forms';
