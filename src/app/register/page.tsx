'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import register from '../../services/authService';
import styles from './register.module.css';

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
    <div className={styles.registerContainer}>
      <h1 className={styles.registerTitle}>Registro</h1>
      <input
        className={styles.registerInput}
        value={name}
        onChange={e => setUsername(e.target.value)}
        placeholder="Usuario"
      />
      <input
        className={styles.registerInput}
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        className={styles.registerInput}
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
      />
      <input
        className={styles.registerInput}
        value={cellphone}
        onChange={e => setCellphone(e.target.value)}
        placeholder="Celular"
      />
      <input
        className={styles.registerInput}
        value={address}
        onChange={e => setAddress(e.target.value)}
        placeholder="Dirección"
      />
      <button className={styles.registerButton} onClick={handleRegister}>
        Registrarse
      </button>
    </div>
  );
}
