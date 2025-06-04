import React from "react";
import { DeviceInfo } from "@/types/request";
import styles from "../../app/myRequests/myRequests.module.css";

interface DeviceInfoModalProps {
  device: DeviceInfo | null;
  isVisible: boolean;
  onClose: () => void;
}

export function DeviceInfoModal({ device, isVisible, onClose }: DeviceInfoModalProps) {
  if (!isVisible || !device) {
    return null;
  }

  return (
    <div className={styles["modal-bg"]} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3>Información del dispositivo</h3>
        <p><b>Nombre:</b> {device.name}</p>
        {device.description && (
          <p><b>Descripción:</b> {device.description}</p>
        )}
        {device.type && (
          <p><b>Tipo:</b> {device.type}</p>
        )}
        {device.status && (
          <p><b>Estado:</b> {device.status}</p>
        )}
        {device.owner && (
          <p><b>Propietario:</b> {device.owner}</p>
        )}
        {device.image && (
          <img src={device.image} alt="Imagen del dispositivo" />
        )}
        <button 
          style={{ marginTop: 16 }} 
          className={styles.btn} 
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
