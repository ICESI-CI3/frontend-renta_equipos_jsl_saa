// src/components/home/HeroSection.tsx
import React from 'react';
import styles from '../../app/home.module.css';

interface HeroSectionProps {
  title: string;
  description: string;
}

export default function HeroSection({ title, description }: HeroSectionProps) {
  return (
    <>
      <h1 className={styles.homeTitle}>{title}</h1>
      <p className={styles.homeDescription}>{description}</p>
    </>
  );
}
