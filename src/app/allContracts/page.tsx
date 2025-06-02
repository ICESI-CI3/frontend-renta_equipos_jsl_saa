"use client";
import React, { useEffect, useState } from "react";
import { getAllContracts, getContractDevicesByContractId } from "@/services";
import { useRouter } from "next/navigation";
import styles from "../myRequests/myRequests.module.css";
import withAuth from "../withAuth";

interface Contract {
  id: string;
  user_email: string;
  request_id: string;
  date_start: string;
  date_finish: string;
  status: string;
  client_signature?: string;
}

interface ContractDevice {
  id: string;
  contract_id: string;
  device_id: string;
  device_name: string;
  delivery_status?: string;
}

function AllContractsPage() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [contractDevices, setContractDevices] = useState<ContractDevice[]>([]);
  const [selectedContractId, setSelectedContractId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchContracts = async () => {
      setLoading(true);
      setError("");
      try {
        const allContracts = await getAllContracts();
        setContracts(allContracts);
      } catch (err: any) {
        setError("Error al cargar los contratos");
      } finally {
        setLoading(false);
      }
    };
    fetchContracts();
  }, []);

  const handleShowContractDevices = async (contractId: string) => {
    setLoading(true);
    setError("");
    try {
      const devices = await getContractDevicesByContractId(contractId);
      setContractDevices(devices);
      setSelectedContractId(contractId);
    } catch (err: any) {
      setError("Error al cargar los dispositivos del contrato");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseContractDevices = () => {
    setSelectedContractId(null);
    setContractDevices([]);
  };

  return (
    <div className={styles.container}>
      <div style={{display:'flex',justifyContent:'flex-end',marginBottom:16}}>
        <button className={styles.btn} onClick={()=>router.push('/welcome')}>Volver al inicio</button>
      </div>
      <h2 className={styles.title}>Todos los Contratos</h2>
      {loading && <p>Cargando...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {contracts.length === 0 && !loading ? (
        <p>No hay contratos registrados.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email usuario</th>
              <th>Fecha inicio</th>
              <th>Fecha fin</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((contract) => (
              <tr key={contract.id}>
                <td>{contract.id}</td>
                <td>{contract.user_email}</td>
                <td>{contract.date_start ? new Date(contract.date_start).toISOString().slice(0, 10) : '-'}</td>
                <td>{contract.date_finish ? new Date(contract.date_finish).toISOString().slice(0, 10) : '-'}</td>
                <td>{contract.status}</td>
                <td>
                  <button className={styles.btn} onClick={() => handleShowContractDevices(contract.id)}>
                    Ver dispositivos
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {selectedContractId && (
        <div style={{ marginTop: 32 }}>
          <h3>Dispositivos asociados al contrato</h3>
          <button className={styles.btn} style={{marginBottom: 16}} onClick={handleCloseContractDevices}>
            Cerrar
          </button>
          {contractDevices.length === 0 ? (
            <p>No hay dispositivos asociados a este contrato.</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Estado entrega</th>
                </tr>
              </thead>
              <tbody>
                {contractDevices.map((cd) => (
                  <tr key={cd.id}>
                    <td>{cd.id}</td>
                    <td>{cd.device_name}</td>
                    <td>{cd.delivery_status || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

const ProtectedAllContractsPage = withAuth(AllContractsPage);
export default ProtectedAllContractsPage;
