// src/app/test/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { getAllDevices } from '../../services/deviceService'; // Asegúrate de que la ruta sea correcta

interface Device {
  id: string;
  name: string;
  // Agrega más campos según tu modelo de dispositivo
}

const TestPage = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const devicesData = await getAllDevices();
        setDevices(devicesData);
      } catch (err: any) {
        setError('Error al obtener dispositivos');
      } finally {
        setLoading(false);
      }
    };
    fetchDevices();
  }, []);

  if (loading) return <div>Cargando dispositivos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Lista de Dispositivos</h1>
      <ul>
        {devices.map((device) => (
          <li key={device.id}>
            {device.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestPage;
