import styles from './Origin.module.css';

export default function Origin() {
  return (
    <section id="origin" className={styles.origin}>
      <div className={styles.container}>
        <div className={styles.textSection}>
          <h2 className={styles.heading}>The Origin</h2>
          <p className={styles.paragraph}>
            Dr. Elara Vance was a leading astrophysicist studying micro-stars. An experiment gone wrong led to a catastrophic containment failure. Instead of destruction, the energy bonded with her cellular structure, transforming her into Lumina.
          </p>
          <p className={styles.paragraph}>
            Now, she channels the power of stars to protect the city from threats that hide in the darkness.
          </p>
        </div>
        
        <div className={styles.powersGrid} id="powers">
          <div className={styles.powerCard}>
            <div className={styles.iconPlaceholder}>✧</div>
            <h3>Photon Constructs</h3>
            <p>Ability to create solid objects, shields, and platforms out of pure, condensed light.</p>
          </div>
          <div className={styles.powerCard}>
            <div className={styles.iconPlaceholder}>⚡</div>
            <h3>Light-Speed Dash</h3>
            <p>Near-instantaneous movement over short distances, bending light to mask her trajectory.</p>
          </div>
          <div className={styles.powerCard}>
            <div className={styles.iconPlaceholder}>❂</div>
            <h3>Holographic Projection</h3>
            <p>Generates hyper-realistic illusions to confuse enemies or provide comfort to those in distress.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
