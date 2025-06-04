import React from "react";
import { RequestDevice } from "@/types/request";
import styles from "../../app/myRequests/myRequests.module.css";

interface RequestDevicesTableProps {
  requestDevices: RequestDevice[];
  onShowDeviceInfo: (deviceId: string) => void;
  onDeleteDevice: (id: string) => void;
}

export function RequestDevicesTable({ 
  requestDevices, 
  onShowDeviceInfo, 
  onDeleteDevice 
}: RequestDevicesTableProps) {
  if (requestDevices.length === 0) {
    return <p>No hay dispositivos asociados a esta solicitud.</p>;
  }

  return (
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
              <button 
                className={`${styles["btn-info"]} ${styles.btn}`} 
                onClick={() => onShowDeviceInfo(rd.device_id)}
              >
                Ver info
              </button>
              <button 
                className={`${styles["btn-danger"]} ${styles.btn}`} 
                onClick={() => onDeleteDevice(rd.id)}
              >
                Borrar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
