import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import styles from './style/Form.module.css';

export interface RegisterDeviceFormData {
  name: string;
  type: string;
  description: string;
  image: string;
}

export interface RegisterDeviceFormProps {
  onSubmit: (data: RegisterDeviceFormData) => void;
  isLoading?: boolean;
  error?: string;
}

export default function RegisterDeviceForm({ onSubmit, isLoading = false, error }: RegisterDeviceFormProps) {
  const [formData, setFormData] = useState<RegisterDeviceFormData>({
    name: '',
    type: '',
    description: '',
    image: ''
  });
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleChange = (field: keyof RegisterDeviceFormData) => (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, image: url }));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, image: url }));
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Nombre del dispositivo"
        value={formData.name}
        onChange={handleChange('name')}
        showPasswordToggle={false}
      />
      <Input
        type="text"
        placeholder="Tipo"
        value={formData.type}
        onChange={handleChange('type')}
        showPasswordToggle={false}
      />
      <Input
        type="text"
        placeholder="Descripción"
        value={formData.description}
        onChange={handleChange('description')}
        showPasswordToggle={false}
      />
      <div
        style={{
          border: dragActive ? '2px solid #6366f1' : '2px dashed #d1d5db',
          borderRadius: 8,
          padding: 16,
          textAlign: 'center',
          background: dragActive ? '#e0e7ff' : '#f9fafb',
          marginBottom: 12,
          cursor: 'pointer',
          transition: 'background 0.2s, border 0.2s',
        }}
        onDrop={handleImageDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleBrowseClick}
      >
        {formData.image ? (
          <img src={formData.image} alt="Imagen del dispositivo" style={{ maxWidth: 120, maxHeight: 120, margin: '0 auto', borderRadius: 8, display: 'block' }} />
        ) : (
          <span>Arrastra una imagen aquí o haz clic para buscar en tu equipo</span>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageSelect}
        />
      </div>
      {error && <div className="error-message">{error}</div>}
      <Button
        type="submit"
        size="large"
        isLoading={isLoading}
        className={styles.submitButton}
      >
        Registrar dispositivo
      </Button>
    </form>
  );
}
