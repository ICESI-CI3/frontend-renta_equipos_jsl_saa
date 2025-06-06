"use client";
import React from "react";
import withAuth from "../withAuth";
import styles from "./myRequests.module.css";
import { useMyRequests } from "@/hooks";
import {
  RequestsTable,
  RequestDevicesTable,
  DeviceInfoModal,
  StatusMessages,
} from "@/components";

function MyRequestsPage() {
  const {
    requests,
    selectedRequestId,
    requestDevices,
    loading,
    error,
    success,
    infoDevice,
    showInfo,
    handleDeleteRequestDevice,
    handleShowDeviceInfo,
    closeDeviceInfo,
  } = useMyRequests();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Mis Solicitudes</h2>
      
      <StatusMessages loading={loading} error={error} success={success} />
      
      <div style={{ marginBottom: 32 }}>
        <RequestsTable requests={requests} loading={loading} />
      </div>
      
      {selectedRequestId && (
        <div style={{ marginBottom: 32 }}>
          <h3>Dispositivos asociados a la solicitud</h3>
          <RequestDevicesTable
            requestDevices={requestDevices}
            onShowDeviceInfo={handleShowDeviceInfo}
            onDeleteDevice={handleDeleteRequestDevice}
          />
        </div>
      )}
      
      <DeviceInfoModal
        device={infoDevice}
        isVisible={showInfo}
        onClose={closeDeviceInfo}
      />
    </div>
  );
}

const ProtectedMyRequestsPage = withAuth(MyRequestsPage);
export default ProtectedMyRequestsPage;
