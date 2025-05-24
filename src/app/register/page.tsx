'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import register from '../../services/authService';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cellphone, setCellphone] = useState('');
  const [address, setAddress] = useState('');

  const handleRegister = async () => {
    try {
      await register({
        data: { name, email, password, cellphone, address }
      });
      alert('Registro exitoso'); 
      router.push('/login');
    } catch (error) {
      alert('Error al registrarse');
    }
  };

  return (
    <div>
      <h1>Registro</h1>
      <input value={name} onChange={e => setUsername(e.target.value)} placeholder="Usuario" />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
      <input value={cellphone} onChange={e => setCellphone(e.target.value)} placeholder="Celular" />
      <input value={address} onChange={e => setAddress(e.target.value)} placeholder="Dirección" />
      <button onClick={handleRegister}>Registrarse</button>
    </div>
  );
}
