import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.brand}>Lumina</span>
        <span className={styles.tagline}>Radiant Sentinel</span>
      </div>
      <nav className={styles.nav}>
        <a href="#hero" className={styles.link}>Home</a>
        <a href="#origin" className={styles.link}>Origin</a>
        <a href="#powers" className={styles.link}>Powers</a>
        <a href="#contact" className={styles.cta}>Get Help</a>
      </nav>
    </header>
  );
}
