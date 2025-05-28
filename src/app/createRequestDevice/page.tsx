"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api, { getDeviceByStatus } from "@/services/deviceService";
import withAuth from "../withAuth";
import styles from "./createRequestDevice.module.css";

interface Device {
  id: string;
  name: string;
  status: string;
}

function CreateRequestDevicePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestId = searchParams.get("requestId");
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Buscar solo al presionar el botón
  const [filteredDevices, setFilteredDevices] = useState<Device[]>([]);

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const disponibles = await getDeviceByStatus("Disponible");
      setDevices(disponibles);
      setFilteredDevices(disponibles);
    } catch (err: any) {
      setError("Error al cargar dispositivos");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilteredDevices(
      devices.filter((d) =>
        d.name.toLowerCase().includes(searchInput.toLowerCase())
      )
    );
  };

  const handleAdd = (device: Device) => {
    setSelectedDevices((prev) => [...prev, device]);
  };

  const handleRemove = (device: Device) => {
    setSelectedDevices((prev) => prev.filter((d) => d.id !== device.id));
  };

  const handleSave = async () => {
    setError("");
    setSuccess("");
    if (!requestId) {
      setError("No se encontró el ID de la solicitud");
      return;
    }
    if (selectedDevices.length === 0) {
      setError("Selecciona al menos un dispositivo");
      return;
    }
    setLoading(true);
    try {
      for (const device of selectedDevices) {
        await api.post('/api/v1/request-devices', {
          request_id: requestId,
          device_name: device.name,
        });
      }
      setSuccess("Dispositivos agregados correctamente a la solicitud");
      setSelectedDevices([]);
      setTimeout(() => router.push("/welcome"), 1200);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Error al guardar los dispositivos en la solicitud");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Agregar dispositivos a la solicitud</h2>
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Buscar dispositivo..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.addBtn} style={{ minWidth: 90 }}>Buscar</button>
      </form>
      {loading ? (
        <p>Cargando dispositivos...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <div className={styles.deviceList}>
          {filteredDevices.map((device) => (
            <div key={device.id} className={styles.deviceItem}>
              <span>{device.name}</span>
              {selectedDevices.some((d) => d.id === device.id) ? (
                <button
                  className={styles.removeBtn}
                  onClick={() => handleRemove(device)}
                  disabled={loading}
                >
                  Quitar de request
                </button>
              ) : (
                <button
                  className={styles.addBtn}
                  onClick={() => handleAdd(device)}
                  disabled={loading}
                >
                  Agregar a request
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      <button
        className={styles.saveBtn}
        onClick={handleSave}
        disabled={selectedDevices.length === 0 || loading}
        style={{ marginTop: 16 }}
      >
        {loading ? 'Guardando...' : 'Guardar'}
      </button>
      {success && <p style={{ color: '#388e3c', fontWeight: 600, marginTop: 12 }}>{success}</p>}
    </div>
  );
}

const ProtectedCreateRequestDevicePage = withAuth(CreateRequestDevicePage);
export default ProtectedCreateRequestDevicePage;
