"use client";
import React, { useEffect, useState } from "react";
import { getAllRequests } from "@/services/requestService";
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

  return (
    <div className={styles.container}>
      <div style={{display:'flex',justifyContent:'flex-end',marginBottom:16}}>
        <button className={styles.btn} onClick={()=>router.push('/welcome')}>Volver al inicio</button>
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
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td>{req.id}</td>
                <td>{req.user_email}</td>
                <td>{req.date_start}</td>
                <td>{req.date_finish}</td>
                <td>{req.status}</td>
                <td>{req.admin_comment || '-'}</td>
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
