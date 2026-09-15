import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.bgGlow}></div>
      <div className={styles.content}>
        <h1 className={styles.title}>
          I am <span className={styles.highlight}>Lumina</span>. <br />
          The Radiant Sentinel.
        </h1>
        <p className={styles.subtitle}>
          When the shadows grow too long and the nights too dark, I bring the light. 
          Protecting the vulnerable, exposing hidden threats, and standing as a beacon of hope in the urban sprawl.
        </p>
        <div className={styles.actions}>
          <a href="#contact" className={styles.primaryBtn}>Request Assistance</a>
          <a href="#origin" className={styles.secondaryBtn}>Discover My Origin</a>
        </div>
      </div>
      <div className={styles.heroImageContainer}>
        {/* Placeholder for character image */}
        <div className={styles.imagePlaceholder}>
          <div className={styles.hologramEffect}></div>
        </div>
      </div>
    </section>
  );
}
