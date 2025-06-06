import { useState, useEffect } from "react";
import { Request, RequestDevice, DeviceInfo } from "@/types/request";
import api from "@/services/requestService";
import deviceApi from "@/services/deviceService";
import { getUserEmailFromToken } from "@/utils/jwt";

export function useMyRequests() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [requestDevices, setRequestDevices] = useState<RequestDevice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [infoDevice, setInfoDevice] = useState<DeviceInfo | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [success, setSuccess] = useState("");

  const fetchRequests = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const user_email = getUserEmailFromToken();
      if (!user_email) {
        setError("No se encontró el email del usuario. Inicia sesión nuevamente.");
        setLoading(false);
        return;
      }
      const res = await api.get(`/api/v1/requests/by-user_email/${user_email}`);
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
      const res = await deviceApi.get(`/api/v1/devices/by-id/${deviceId}`);
      setInfoDevice(res.data || res);
      setShowInfo(true);
    } catch (err: any) {
      setError("Error al obtener información del dispositivo");
    } finally {
      setLoading(false);
    }
  };

  const closeDeviceInfo = () => {
    setShowInfo(false);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return {
    requests,
    selectedRequestId,
    requestDevices,
    loading,
    error,
    success,
    infoDevice,
    showInfo,
    fetchRequestDevices,
    handleDeleteRequestDevice,
    handleShowDeviceInfo,
    closeDeviceInfo,
  };
}
