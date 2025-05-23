'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '../../services/authService';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login({ email, password });
      router.push('/');
    } catch (error) {
      alert('Error al iniciar sesión');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
      <button onClick={handleLogin}>Iniciar sesión</button>
    </div>
  );
}
