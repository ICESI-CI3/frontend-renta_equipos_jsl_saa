"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createRequest } from "@/services";
import styles from "./createRequest.module.css";
import withAuth from "../withAuth";
import { getUserEmailFromToken } from '../../utils/jwt';

function CreateRequestPage() {
  const router = useRouter();
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
    // Validación de campos requeridos
    if (!date_Start || !date_Finish) {
      setError("Debes ingresar ambas fechas");
      return;
    }
    // Si quieres que el comentario sea obligatorio, descomenta:
    // if (!admin_comment) {
    //   setError("Debes ingresar un comentario para el administrador");
    //   return;
    // }
    // Obtener el email del usuario logueado desde el token
    const user_email = getUserEmailFromToken();
    if (!user_email) {
      setError("No se encontró el email del usuario. Inicia sesión nuevamente.");
      return;
    }
    try {
      // Guardar la request y obtener el id
      const result = await createRequest({
        user_email,
        date_Start: toISOStringIfPossible(date_Start),
        date_Finish: toISOStringIfPossible(date_Finish),
        status: "pendiente",
        admin_comment,
      } as CreateRequestData);
      // Suponiendo que el backend retorna el objeto creado o el id
      const requestId = result.id || result.request_id || result;
      router.push(`/createRequestDevice?requestId=${requestId}`);
    } catch (err: any) {
      setError(err.message);
    }
};

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Crear nueva solicitud</h2>
      <form onSubmit={handleSubmit}>
        {/* Eliminar el campo de email del formulario */}
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
