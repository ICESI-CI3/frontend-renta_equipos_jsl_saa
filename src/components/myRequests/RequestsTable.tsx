import React from "react";
import { useRouter } from "next/navigation";
import { Request } from "@/types/request";
import styles from "../../app/myRequests/myRequests.module.css";

interface RequestsTableProps {
  requests: Request[];
  loading: boolean;
}

export function RequestsTable({ requests, loading }: RequestsTableProps) {
  const router = useRouter();

  const formatDate = (dateString: string | null) => {
    return dateString ? new Date(dateString).toISOString().slice(0, 10) : '-';
  };

  if (requests.length === 0 && !loading) {
    return <p>No tienes solicitudes registradas.</p>;
  }

  return (
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
            <td>{formatDate(req.date_start)}</td>
            <td>{formatDate(req.date_finish)}</td>
            <td>{req.status}</td>
            <td>{req.admin_comment || '-'}</td>
            <td>
              <button 
                className={styles.btn} 
                onClick={() => router.push(`/requestDevices?requestId=${req.id}`)}
              >
                Ver dispositivos
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
