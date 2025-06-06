export interface Request {
  id: string;
  user_email: string;
  date_start: string;
  date_finish: string;
  status: string;
  admin_comment?: string;
}

export interface RequestDevice {
  id: string;
  request_id: string;
  device_id: string;
  device_name: string;
}

export interface DeviceInfo {
  id: string;
  name: string;
  status: string;
  description?: string;
  type?: string;
  owner?: string;
  image?: string;
}
