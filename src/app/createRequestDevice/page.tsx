"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getDeviceByStatus } from "@/services";
import api from "@/services/deviceService";
import withAuth from "../withAuth";
import styles from "./createRequestDevice.module.css";

interface Device {
  id: string;
  name: string;
  status: string;
  description?: string;
  type?: string;
  owner?: string;
  image?: string;
}

function CreateRequestDevicePageContent() {
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
  const [infoDevice, setInfoDevice] = useState<Device | null>(null);
  const [showInfo, setShowInfo] = useState(false);

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
    // Solo permite agregar un device si no está ya seleccionado (por id único)
    if (!selectedDevices.some((d) => d.id === device.id)) {
      setSelectedDevices((prev) => [...prev, device]);
    }
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
              <div style={{display:'flex',gap:8}}>
                <button
                  className={styles.addBtn}
                  style={{background:'#888'}}
                  onClick={() => { setInfoDevice(device); setShowInfo(true); }}
                  disabled={loading}
                >
                  Ver info
                </button>
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
      {showInfo && infoDevice && (
        <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(0,0,0,0.4)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}} onClick={()=>setShowInfo(false)}>
          <div style={{background:'#fff',padding:32,borderRadius:12,minWidth:320,maxWidth:400,position:'relative'}} onClick={e=>e.stopPropagation()}>
            <h3 style={{marginTop:0}}>Información del dispositivo</h3>
            <p><b>Nombre:</b> {infoDevice.name}</p>
            {infoDevice.description && <p><b>Descripción:</b> {infoDevice.description}</p>}
            {infoDevice.type && <p><b>Tipo:</b> {infoDevice.type}</p>}
            {infoDevice.status && <p><b>Estado:</b> {infoDevice.status}</p>}
            {infoDevice.owner && <p><b>Propietario:</b> {infoDevice.owner}</p>}
            {infoDevice.image && <img src={infoDevice.image} alt="Imagen" style={{maxWidth:180,maxHeight:120,borderRadius:8,marginTop:8}} />}
            <button style={{marginTop:16}} className={styles.addBtn} onClick={()=>setShowInfo(false)}>Cerrar</button>
          </div>
        </div>      )}
    </div>
  );
}

function CreateRequestDevicePage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <CreateRequestDevicePageContent />
    </Suspense>
  );
}

const ProtectedCreateRequestDevicePage = withAuth(CreateRequestDevicePage);
export default ProtectedCreateRequestDevicePage;
