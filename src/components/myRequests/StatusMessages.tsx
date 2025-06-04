import React from "react";
import styles from "../../app/myRequests/myRequests.module.css";

interface StatusMessagesProps {
  loading: boolean;
  error: string;
  success: string;
}

export function StatusMessages({ loading, error, success }: StatusMessagesProps) {
  return (
    <>
      {loading && <p>Cargando...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}
    </>
  );
}
