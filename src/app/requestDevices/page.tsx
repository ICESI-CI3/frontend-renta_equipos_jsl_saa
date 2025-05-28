"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/services/requestService";
import deviceApi from "@/services/deviceService";
import styles from "../myRequests/myRequests.module.css";
import withAuth from "../withAuth";

interface RequestDevice {
  id: string;
  request_id: string;
  device_id: string;
  device_name: string;
}

interface DeviceInfo {
  id: string;
  name: string;
  status: string;
  description?: string;
  type?: string;
  owner?: string;
  image?: string;
}

function RequestDevicesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestId = searchParams.get("requestId");
  const [requestDevices, setRequestDevices] = useState<RequestDevice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [infoDevice, setInfoDevice] = useState<DeviceInfo | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    if (requestId) fetchRequestDevices(requestId);
  }, [requestId]);

  const fetchRequestDevices = async (requestId: string) => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await api.get(`/api/v1/request-devices?request_id=${requestId}`);
      setRequestDevices(res.data || res);
    } catch (err: any) {
      setError("Error al cargar los dispositivos de la solicitud");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRequestDevice = async (id: string) => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await api.delete(`/api/v1/request-devices/${id}`);
      setRequestDevices((prev) => prev.filter((rd) => rd.id !== id));
      setSuccess("Dispositivo eliminado de la solicitud");
    } catch (err: any) {
      setError("Error al eliminar el dispositivo de la solicitud");
    } finally {
      setLoading(false);
    }
  };

  const handleShowDeviceInfo = async (deviceId: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await deviceApi.get(`/api/v1/devices/by-id/${deviceId}`);
      setInfoDevice(res.data || res);
      setShowInfo(true);
    } catch (err: any) {
      setError("Error al obtener información del dispositivo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Dispositivos asociados a la solicitud</h2>
      {loading && <p>Cargando...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}
      {requestDevices.length === 0 && !loading ? (
        <p>No hay dispositivos asociados a esta solicitud.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {requestDevices.map((rd) => (
              <tr key={rd.id}>
                <td>{rd.id}</td>
                <td>{rd.device_name}</td>
                <td className={styles["table-actions"]}>
                  <button className={styles["btn-info"] + " " + styles.btn} onClick={() => handleShowDeviceInfo(rd.device_id)}>
                    Ver info
                  </button>
                  <button className={styles["btn-danger"] + " " + styles.btn} onClick={() => handleDeleteRequestDevice(rd.id)}>
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showInfo && infoDevice && (
        <div className={styles["modal-bg"]} onClick={()=>setShowInfo(false)}>
          <div className={styles.modal} onClick={e=>e.stopPropagation()}>
            <h3>Información del dispositivo</h3>
            <p><b>Nombre:</b> {infoDevice.name}</p>
            {infoDevice.description && <p><b>Descripción:</b> {infoDevice.description}</p>}
            {infoDevice.type && <p><b>Tipo:</b> {infoDevice.type}</p>}
            {infoDevice.status && <p><b>Estado:</b> {infoDevice.status}</p>}
            {infoDevice.owner && <p><b>Propietario:</b> {infoDevice.owner}</p>}
            {infoDevice.image && <img src={infoDevice.image} alt="Imagen" />}
            <button style={{marginTop:16}} className={styles.btn} onClick={()=>setShowInfo(false)}>Cerrar</button>
          </div>
        </div>
      )}
      <button className={styles.btn} style={{marginTop:24}} onClick={() => router.push('/myRequests')}>Volver a mis solicitudes</button>
    </div>
  );
}

const ProtectedRequestDevicesPage = withAuth(RequestDevicesPage);
export default ProtectedRequestDevicesPage;
