# INFORME TÉCNICO - APLICACIÓN DE RENTA DE EQUIPOS

## Resumen Ejecutivo
Esta aplicación web desarrollada con **Next.js 15**, **React 19** y **TypeScript** implementa un sistema completo de gestión de alquiler de equipos con funcionalidades diferenciadas para administradores y usuarios regulares. La aplicación incluye autenticación basada en JWT, autorización por roles, gestión de estado optimizada y una arquitectura modular y escalable.

---

## 1. TECNOLOGÍAS Y DEPENDENCIAS

### Framework y Librerías Principales
- **Next.js 15.3.2**: Framework de React con App Router
- **React 19**: Librería de interfaz de usuario
- **TypeScript 5**: Tipado estático
---

## 2. ARQUITECTURA DEL PROYECTO

### Estructura de Directorios
```
src/
├── app/                     # Páginas y rutas de la aplicación
│   ├── layout.tsx          # Layout principal con navegación
│   ├── withAuth.tsx        # HOC para protección de rutas
│   ├── login/              # Página de inicio de sesión
│   ├── register/           # Página de registro
│   ├── dashboard/          # Panel principal post-login
│   ├── welcome/            # Página de bienvenida con opciones por rol
│   ├── registerDevice/     # Creación de dispositivos
│   ├── listDevice/         # Listado de dispositivos
│   ├── createRequest/      # Creación de solicitudes
│   ├── myRequests/         # Solicitudes del usuario
│   ├── allRequests/        # Todas las solicitudes (admin)
│   ├── myContracts/        # Contratos del usuario
│   ├── allContracts/       # Todos los contratos (admin)
│   └── requestDevices/     # Gestión de dispositivos por solicitud
├── components/             # Componentes reutilizables
│   ├── forms/              # Formularios especializados
│   ├── home/               # Componentes de página principal
│   └── ui/                 # Componentes básicos de UI
├── hooks/                  # Custom hooks
├── services/              # Servicios de API
├── types/                 # Definiciones de tipos TypeScript
└── utils/                 # Utilidades y helpers
```

---

## 3. FUNCIONALIDADES IMPLEMENTADAS

### 3.1 Gestión de Usuarios y Autenticación

#### Registro de Usuarios
- **Ubicación**: `src/app/register/page.tsx`
- **Componente**: `RegisterForm`
- **Funcionalidades**:
  - Formulario con validación de campos (username, email, password, confirmPassword, phone, address)
  - Validación de contraseñas coincidentes
  - Integración con API de registro
  - Redirección automática post-registro exitoso

#### Inicio de Sesión
- **Ubicación**: `src/app/login/page.tsx`
- **Componente**: `LoginForm`
- **Funcionalidades**:
  - Autenticación con email y contraseña
  - Validación de formato de email
  - Gestión de errores de autenticación
  - Redirección automática si ya está autenticado
  - Persistencia de sesión con localStorage

### 3.2 Gestión de Dispositivos

#### Registro de Dispositivos
- **Ubicación**: `src/app/registerDevice/page.tsx`
- **Componente**: `RegisterDeviceForm`
- **Funcionalidades**:
  - Formulario para crear dispositivos (name, type, description, image)
  - Upload de imágenes con drag & drop
  - Asignación automática del propietario desde token JWT
  - Estado automático "Disponible"
  - Protección de ruta con `withAuth`

#### Listado de Dispositivos
- **Ubicación**: `src/app/listDevice/page.tsx`
- **Funcionalidades**:
  - Vista tabular de todos los dispositivos
  - Filtrado por nombre y estado
  - Información detallada (ID, nombre, tipo, descripción, estado, propietario)
  - Protección de ruta

### 3.3 Gestión de Solicitudes

#### Creación de Solicitudes
- **Ubicación**: `src/app/createRequest/page.tsx`
- **Funcionalidades**:
  - Formulario con fechas de inicio y fin
  - Validación de fechas futuras
  - Obtención automática de email desde token JWT
  - Estado inicial "pendiente"

#### Mis Solicitudes (Usuario)
- **Ubicación**: `src/app/myRequests/page.tsx`
- **Funcionalidades**:
  - Vista de solicitudes del usuario autenticado
  - Información de estado y comentarios del admin
  - Botón para ver dispositivos asociados

#### Todas las Solicitudes (Admin)
- **Ubicación**: `src/app/allRequests/page.tsx`
- **Funcionalidades**:
  - Vista completa de todas las solicitudes del sistema
  - Acciones de aceptar y rechazar solicitudes
  - Estados visuales diferenciados
  - Gestión de loading states para operaciones asíncronas

### 3.4 Gestión de Contratos

#### Mis Contratos (Usuario)
- **Ubicación**: `src/app/myContracts/page.tsx`
- **Funcionalidades**:
  - Vista de contratos activos del usuario
  - Información de fechas y estado
  - Opción para finalizar contratos

#### Todos los Contratos (Admin)
- **Ubicación**: `src/app/allContracts/page.tsx`
- **Funcionalidades**:
  - Vista administrativa de todos los contratos
  - Gestión completa del ciclo de vida de contratos

### 3.5 Gestión de Dispositivos por Solicitud
- **Ubicación**: `src/app/requestDevices/page.tsx`
- **Funcionalidades**:
  - Asociación de dispositivos específicos a solicitudes
  - Vista detallada de equipos solicitados

---

## 4. SISTEMA DE AUTENTICACIÓN

### 4.1 Arquitectura de Autenticación

#### JWT (JSON Web Tokens)
- **Librería**: `jwt-decode 4.0.0`
- **Almacenamiento**: localStorage del navegador
- **Estructura del Token**:
  ```typescript
  {
    username: string;  // Email del usuario
    role: string;      // 'admin' | 'user'
    sub: string;       // ID único del usuario
    exp: number;       // Timestamp de expiración
  }
  ```

#### Utilities JWT (`src/utils/jwt.ts`)
```typescript
// Funciones implementadas:
export const decodeJWT = (token: string): any
export const isTokenExpired = (token: string): boolean
export const getToken = (): string | null
export const getUserEmailFromToken = (): string
export const getUserRoleFromToken = (): string
export const getUserFromToken = (): User | null
```

### 4.2 Hook de Autenticación (`src/hooks/useAuth.ts`)

#### Estado de Autenticación
```typescript
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
}
```

#### Funcionalidades del Hook
1. **Verificación Automática**: Validación de token al cargar la aplicación
2. **Gestión de Expiración**: Detección y manejo de tokens expirados
3. **Persistencia Multi-Pestaña**: Sincronización entre pestañas del navegador
4. **Login/Logout**: Métodos para autenticación y cierre de sesión
5. **Redirección Automática**: Navegación post-autenticación

### 4.3 Servicios de Autenticación (`src/services/authService.ts`)

#### Configuración de Axios
```typescript
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// Interceptor para incluir token automáticamente
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

#### Endpoints de Autenticación
- `POST /api/v1/auth/register`: Registro de nuevos usuarios
- `POST /api/v1/auth/login`: Autenticación de usuarios
- `GET /api/v1/auth/email-role/{email}`: Obtención de rol por email

---

## 5. SISTEMA DE AUTORIZACIÓN

### 5.1 Roles del Sistema
- **Admin**: Acceso completo a gestión de dispositivos, solicitudes y contratos
- **User**: Acceso limitado a funcionalidades de usuario final

### 5.2 Protección de Rutas

#### Higher-Order Component (`src/app/withAuth.tsx`)
```typescript
export default function withAuth(Component: React.ComponentType) {
  return function AuthenticatedComponent(props: any) {
    // Verificación de token
    // Redirección a login si no autenticado
    // Renderizado del componente si autenticado
  };
}
```

#### ProtectedRoute Component (`src/components/ui/ProtectedRoute.tsx`)
- Componente alternativo para protección de rutas
- Integración con hook `useAuth`
- Manejo de estados de carga

### 5.3 Autorización por Vistas

#### Navegación Condicional (`src/components/forms/WelcomeLinks.tsx`)
```typescript
// Vista para Administradores
{role === 'admin' && (
  <>
    <Link href="/registerDevice">Crear nuevo device</Link>
    <Link href="/listDevice">Ver todos los devices</Link>
    <Link href="/allRequests">Ver todas las requests</Link>
    <Link href="/allContracts">Ver todos los contratos</Link>
  </>
)}

// Vista para Usuarios
{role === 'user' && (
  <>
    <Link href="/listDevice">Lista de equipos</Link>
    <Link href="/myRequests">Mis solicitudes</Link>
    <Link href="/createRequest">Crear solicitud</Link>
    <Link href="/myContracts">Mis contratos</Link>
  </>
)}
```

---

## 6. GESTIÓN DEL ESTADO

### 6.1 Estado Local con React Hooks

#### useState para Estado de Componente
- Gestión de formularios
- Estados de carga (loading states)
- Manejo de errores
- Datos temporales de UI

#### useEffect para Efectos Secundarios
- Carga de datos al montar componentes
- Suscripciones a cambios de autenticación
- Limpieza de recursos

### 6.2 Estado Global de Autenticación

#### Custom Hook useAuth
```typescript
const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
    isLoading: true,
  });

  // Métodos de gestión de autenticación
  return {
    ...authState,
    login,
    logout,
    checkAuth,
  };
};
```

#### Persistencia en localStorage
- Token JWT almacenado de forma segura
- Recuperación automática al recargar página
- Limpieza automática en logout

### 6.3 Gestión de Estado de Formularios

#### React Hook Form Integration
- Validación en tiempo real
- Gestión optimizada de re-renders
- Integración con componentes de UI personalizados

---

## 7. SERVICIOS Y COMUNICACIÓN CON API

### 7.1 Arquitectura de Servicios

#### Servicios Implementados
```typescript
// src/services/
├── authService.ts      // Autenticación y autorización
├── deviceService.ts    // Gestión de dispositivos
├── requestService.ts   // Gestión de solicitudes
├── contractService.ts  // Gestión de contratos
├── userService.ts      // Operaciones de usuario
└── logoutService.ts    // Cierre de sesión
```

### 7.2 Configuración de Axios

#### Instancias Configuradas
```typescript
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
```

#### Interceptores de Request
- Inclusión automática de token Bearer
- Headers estandarizados
- Configuración de CORS

### 7.3 Endpoints Principales

#### Dispositivos
- `GET /api/v1/devices`: Obtener todos los dispositivos
- `POST /api/v1/devices/{stock}`: Crear dispositivo con stock
- `GET /api/v1/devices/by-name/{name}`: Buscar por nombre
- `GET /api/v1/devices/by-status/{status}`: Filtrar por estado

#### Solicitudes
- `POST /api/v1/requests`: Crear nueva solicitud
- `GET /api/v1/requests`: Obtener todas las solicitudes
- `PATCH /api/v1/users/accept/{id}`: Aceptar solicitud
- `PATCH /api/v1/users/reject/{id}`: Rechazar solicitud

#### Contratos
- `GET /api/v1/contracts`: Obtener todos los contratos
- `GET /api/v1/contracts/by-email/{email}`: Contratos por usuario
- `GET /api/v1/contract-devices/by-contract/{id}`: Dispositivos de contrato
- `PATCH /api/v1/users/end-contract/{id}`: Finalizar contrato

---

## 8. COMPONENTES Y UI

### 8.1 Arquitectura de Componentes

#### Estructura Jerárquica
```
components/
├── ui/                 # Componentes básicos reutilizables
│   ├── Button.tsx     # Botón con estados y variantes
│   ├── Card.tsx       # Contenedor con estilo
│   ├── Input.tsx      # Input con validación
│   ├── MainNav.tsx    # Navegación principal
│   └── ProtectedRoute.tsx
├── forms/             # Formularios especializados
│   ├── LoginForm.tsx
│   ├── RegisterForm.tsx
│   ├── RegisterDeviceForm.tsx
│   ├── DashboardLinks.tsx
│   └── WelcomeLinks.tsx
└── home/              # Componentes de página principal
    ├── HeroSection.tsx
    ├── HomeContainer.tsx
    └── NavigationLinks.tsx
```

### 8.2 Componentes UI Base

#### Button Component
```typescript
interface ButtonProps {
  type?: 'button' | 'submit';
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'danger';
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}
```

#### Input Component
```typescript
interface InputProps {
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  showPasswordToggle?: boolean;
  autoComplete?: string;
}
```

### 8.3 Formularios Especializados

#### RegisterDeviceForm
- Upload de imágenes con drag & drop
- Validación de campos requeridos
- Preview de imagen seleccionada
- Estados de carga y error

#### LoginForm / RegisterForm
- Validación en tiempo real
- Gestión de errores específicos
- Estados de carga durante autenticación
- Redirección automática

### 8.4 Navegación y Layout

#### MainNav Component
```typescript
const MainNav: React.FC = () => {
  const { logout, user } = useAuth();
  
  // Navegación principal con logout condicional
  // Visualización de usuario autenticado
  // Confirmación antes de logout
};
```

#### Layout Principal (`src/app/layout.tsx`)
- Header fijo con navegación
- Estilos globales
- Configuración de metadata
- Estructura responsive

---

## 9. ESTILOS Y DISEÑO

### 9.1 Sistema de Estilos

#### CSS Modules
- Estilos encapsulados por componente
- Prevención de conflictos de nombres
- Organización modular

#### Tailwind CSS
- Utility-first approach
- Diseño responsive
- Consistencia visual

### 9.2 Arquitectura de Estilos

```
styles/
├── globals.css              # Estilos globales
├── app/
│   ├── home.module.css     # Página principal
│   ├── login.module.css    # Página de login
│   ├── register.module.css # Página de registro
│   └── [feature].module.css
└── components/
    └── style/
        ├── Button.module.css
        ├── Card.module.css
        └── Form.module.css
```

### 9.3 Características del Diseño

#### Responsive Design
- Breakpoints móviles y desktop
- Flexbox y Grid layouts
- Adaptación de componentes

#### Visual Consistency
- Paleta de colores estandarizada
- Tipografía consistente
- Espaciado sistemático
- Animaciones y transiciones

---

## 10. SEGURIDAD IMPLEMENTADA

### 10.1 Autenticación Segura

#### JWT Security
- Tokens con expiración definida
- Validación en cada request
- Limpieza automática de tokens expirados

#### Client-Side Protection
- Validación de tokens en localStorage
- Redirección automática en casos de token inválido
- Verificación de roles antes de mostrar contenido

### 10.2 Protección de Rutas

#### Route Guards
- HOC `withAuth` para páginas protegidas
- Verificación de autenticación en cada ruta
- Redirección a login si no autenticado

#### Role-Based Access
- Verificación de roles para funcionalidades específicas
- UI condicional basada en permisos
- Protección en cliente y servidor

### 10.3 Validación de Datos

#### Form Validation
- Validación en tiempo real
- Sanitización de inputs
- Prevención de inyección de código

#### API Communication
- Headers de seguridad configurados
- CORS habilitado correctamente
- Tokens Bearer en headers Authorization

---

## 12. DEPLOYMENT Y CONFIGURACIÓN

### 12.1 Variables de Entorno

```bash
# .env.local
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080
```

### 12.2 Scripts de Desarrollo

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

### 12.3 Configuración de Build

#### Next.js Configuration
- App Router habilitado
- Turbopack para desarrollo
- Optimizaciones de producción automáticas

---

## 13. ANEXOS

### 15.1 Estructura Completa de Archivos
[Listado detallado de todos los archivos del proyecto]

### 15.2 Endpoints de API Documentados
[Documentación completa de todos los endpoints utilizados]

### 15.3 Tipos TypeScript Definidos
[Listado completo de interfaces y tipos]
