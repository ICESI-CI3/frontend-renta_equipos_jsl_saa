"use client";
import React, { useEffect, useState } from "react";
import { getAllRequests, acceptRequest, rejectRequest } from "@/services";

import { useRouter } from "next/navigation";
import styles from "../myRequests/myRequests.module.css";
import withAuth from "../withAuth";

interface Request {
  id: string;
  user_email: string;
  date_start: string;
  date_finish: string;
  status: string;
  admin_comment?: string;
}

function AllRequestsPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [acceptingId, setAcceptingId] = useState<string | null>(null); // Track which request is being accepted
  const router = useRouter();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getAllRequests();
      setRequests(res || []);
    } catch (err: any) {
      setError("Error al cargar las solicitudes");
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id: string) => {
    setAcceptingId(id); // Mark as accepting
    setError("");
    try {
      const res = await acceptRequest(id);
      alert("Respuesta aceptar: " + JSON.stringify(res));
      fetchRequests();
    } catch (err: any) {
      setError("Error al aceptar la solicitud");
      alert("Error aceptar: " + (err?.response?.data?.message || err.message || JSON.stringify(err)));
      console.error(err);
    } finally {
      setAcceptingId(null); // Reset accepting state
    }
  };

  const handleReject = async (id: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await rejectRequest(id);
      alert("Respuesta eliminar: " + JSON.stringify(res));
      fetchRequests();
    } catch (err: any) {
      setError("Error al eliminar la solicitud");
      alert("Error eliminar: " + (err?.response?.data?.message || err.message || JSON.stringify(err)));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div style={{display:'flex',justifyContent:'flex-end',marginBottom:16}}>
        <button className={styles.btn} onClick={()=>router.push('/dashboard')}>Volver al inicio</button>
      </div>
      <h2 className={styles.title}>Todas las Solicitudes</h2>
      {loading && <p>Cargando...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {requests.length === 0 && !loading ? (
        <p>No hay solicitudes registradas.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email usuario</th>
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
                <td>{req.user_email}</td>
                <td>{req.date_start ? new Date(req.date_start).toISOString().slice(0, 10) : '-'}</td>
                <td>{req.date_finish ? new Date(req.date_finish).toISOString().slice(0, 10) : '-'}</td>
                <td>{req.status}</td>
                <td>{req.admin_comment || '-'}</td>
                <td>
                  <button className={styles.btn} onClick={() => router.push(`/requestDevices?requestId=${req.id}`)}>
                    Ver dispositivos
                  </button>
                  <button
                    className={styles.btn}
                    style={{
                      marginLeft: 8,
                      background: '#22c55e',
                      opacity: req.status === 'accepted' || acceptingId === req.id ? 0.5 : 1,
                      pointerEvents: req.status === 'accepted' || acceptingId === req.id ? 'none' : 'auto',
                    }}
                    onClick={() => handleAccept(req.id)}
                    disabled={req.status === 'accepted' || acceptingId === req.id}
                  >
                    Aceptar
                  </button>
                  <button className={styles.btn} style={{marginLeft: 8, background: '#ef4444'}} onClick={() => handleReject(req.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const ProtectedAllRequestsPage = withAuth(AllRequestsPage);
export default ProtectedAllRequestsPage;
