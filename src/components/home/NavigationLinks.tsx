// src/components/home/NavigationLinks.tsx
import Link from 'next/link';
import styles from '../../app/home.module.css';

interface NavigationLink {
  href: string;
  label: string;
}

interface NavigationLinksProps {
  links: NavigationLink[];
}

export default function NavigationLinks({ links }: NavigationLinksProps) {
  return (
    <div className={styles.homeLinks}>
      {links.map((link, index) => (
        <Link key={index} className={styles.homeLink} href={link.href}>
          {link.label}
        </Link>
      ))}
    </div>
  );
}
