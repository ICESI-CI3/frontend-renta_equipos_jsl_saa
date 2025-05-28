"use client";
import React, { useEffect, useState } from "react";
import api from "@/services/requestService";
import deviceApi from "@/services/deviceService";
import { useRouter } from "next/navigation";
import withAuth from "../withAuth";
import styles from "./myRequests.module.css";

interface Request {
  id: string;
  user_email: string;
  date_Start: string;
  date_Finish: string;
  status: string;
  admin_comment?: string;
}

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

function MyRequestsPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [requestDevices, setRequestDevices] = useState<RequestDevice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [infoDevice, setInfoDevice] = useState<DeviceInfo | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [success, setSuccess] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const user_email = typeof window !== 'undefined' ? localStorage.getItem('user_email') || '' : '';
      if (!user_email) {
        setError("No se encontró el email del usuario. Inicia sesión nuevamente.");
        setLoading(false);
        return;
      }
      // Suponiendo que hay un endpoint para traer requests por email
      const res = await api.get(`/api/v1/requests?user_email=${user_email}`);
      setRequests(res.data || res);
    } catch (err: any) {
      setError("Error al cargar las solicitudes");
    } finally {
      setLoading(false);
    }
  };

  const fetchRequestDevices = async (requestId: string) => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      // Suponiendo que hay un endpoint para traer request-devices por request_id
      const res = await api.get(`/api/v1/request-devices?request_id=${requestId}`);
      setRequestDevices(res.data || res);
      setSelectedRequestId(requestId);
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
      // Buscar info del device por id
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
      <h2 className={styles.title}>Mis Solicitudes</h2>
      {loading && <p>Cargando...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}
      <div style={{ marginBottom: 32 }}>
        {requests.length === 0 && !loading ? (
          <p>No tienes solicitudes registradas.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha inicio</th>
                <th>Fecha fin</th>
                <th>Estado</th>
                <th>Comentario</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id}>
                  <td>{req.id}</td>
                  <td>{req.date_Start}</td>
                  <td>{req.date_Finish}</td>
                  <td>{req.status}</td>
                  <td>{req.admin_comment || '-'}</td>
                  <td>
                    <button className={styles.btn} onClick={() => router.push(`/requestDevices?requestId=${req.id}`)}>
                      Ver dispositivos
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {selectedRequestId && (
        <div style={{ marginBottom: 32 }}>
          <h3>Dispositivos asociados a la solicitud</h3>
          {requestDevices.length === 0 ? (
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
        </div>
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
    </div>
  );
}

const ProtectedMyRequestsPage = withAuth(MyRequestsPage);
export default ProtectedMyRequestsPage;
