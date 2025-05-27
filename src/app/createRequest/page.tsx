"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createRequest } from "@/services/requestService";
import styles from "./createRequest.module.css";
import withAuth from "../withAuth";

function CreateRequestPage() {
  const router = useRouter();
  const [user_email, setUserEmail] = useState("");
  const [date_Start, setDateStart] = useState("");
  const [date_Finish, setDateFinish] = useState("");
  const [admin_comment, setAdminComment] = useState("");
  const [error, setError] = useState("");

  // Convierte el valor del input datetime-local a formato ISO si no lo está
  function toISOStringIfPossible(val: string) {
    if (!val) return "";
    // Si es formato de input datetime-local, agrégale ":00" si no lo tiene
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(val)) {
      // El input datetime-local da "2025-05-10T08:00", conviértelo a "2025-05-10T08:00:00.000Z"
      return new Date(val + ":00").toISOString();
    }
    // Si ya es ISO, regresa igual
    if (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:.+/.test(val)) return val;
    return new Date(val).toISOString();
  }

interface CreateRequestData {
    user_email: string;
    date_Start: string;
    date_Finish: string;
    status: string;
    admin_comment: string;
}

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    // Validar que las fechas estén presentes
    if (!date_Start || !date_Finish) {
      setError("Debes ingresar ambas fechas");
      return;
    }
    try {
      await createRequest({
        user_email,
        // Enviar fechas en formato ISO string
        date_Start: toISOStringIfPossible(date_Start),
        date_Finish: toISOStringIfPossible(date_Finish),
        status: "pendiente",
        admin_comment,
      } as CreateRequestData);
      router.push("/welcome");
    } catch (err: any) {
      setError(err.message);
    }
};

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Crear nueva solicitud</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Usuario (email):</label>
          <input type="email" className={styles.formInput} value={user_email} onChange={e => setUserEmail(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Fecha inicio:</label>
          <input type="datetime-local" className={styles.formInput} value={date_Start} onChange={e => setDateStart(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Fecha fin:</label>
          <input type="datetime-local" className={styles.formInput} value={date_Finish} onChange={e => setDateFinish(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Comentario (opcional):</label>
          <textarea className={styles.formTextarea} value={admin_comment} onChange={e => setAdminComment(e.target.value)} maxLength={500} />
        </div>
        <button type="submit" className={styles.formButton}>Crear solicitud</button>
        {error && <p className={styles.formError}>{error}</p>}
      </form>
    </div>
  );
}

const ProtectedCreateRequestPage = withAuth(CreateRequestPage);
export default ProtectedCreateRequestPage;
