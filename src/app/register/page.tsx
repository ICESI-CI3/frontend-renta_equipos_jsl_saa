'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '../../services/authService';

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await register({ username, email, password });
      router.push('/login');
    } catch (error) {
      alert('Error al registrarse');
    }
  };

  return (
    <div>
      <h1>Registro</h1>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Usuario" />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
      <button onClick={handleRegister}>Registrarse</button>
    </div>
  );
}
