import React from 'react';
import styles from '../../app/listDevice/listDevice.module.css';

export interface Device {
  id: string;
  name: string;
  description?: string;
  type?: string;
  status?: string;
  owner?: string;
  image?: string;
}

export interface DeviceListProps {
  devices: Device[];
}

const DeviceList: React.FC<DeviceListProps> = ({ devices }) => (
  <ul className={styles.deviceList}>
    {devices.map((device) => (
      <li className={styles.deviceItem} key={device.id}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {device.image && (
            <img
              src={device.image}
              alt={device.name}
              style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 8, background: '#e5e7eb' }}
            />
          )}
          <div>
            <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>{device.name}</h2>
            {device.description && (
              <p style={{ margin: '4px 0 0 0', color: '#6b7280' }}>{device.description}</p>
            )}
            <div style={{ fontSize: '0.97rem', color: '#4b5563', marginTop: 4 }}>
              {device.type && <span><b>Tipo:</b> {device.type} &nbsp;|&nbsp; </span>}
              {device.status && <span><b>Estado:</b> {device.status} &nbsp;|&nbsp; </span>}
              {device.owner && <span><b>Propietario:</b> {device.owner}</span>}
            </div>
          </div>
        </div>
      </li>
    ))}
  </ul>
);

export default DeviceList;
