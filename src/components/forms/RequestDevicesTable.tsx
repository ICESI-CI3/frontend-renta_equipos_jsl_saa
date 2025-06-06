import React from 'react';

interface Device {
  id: number;
  name: string;
  quantity: number;
}

interface RequestDevicesTableProps {
  devices: Device[];
}

const RequestDevicesTable: React.FC<RequestDevicesTableProps> = ({ devices }) => (
  <table>
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Cantidad</th>
      </tr>
    </thead>
    <tbody>
      {devices.map(device => (
        <tr key={device.id}>
          <td>{device.name}</td>
          <td>{device.quantity}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default RequestDevicesTable;
