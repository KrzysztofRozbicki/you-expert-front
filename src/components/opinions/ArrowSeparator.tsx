import styles from './ArrowSeparator.module.scss';

export const ArrowSeparator = () => {
  return (
    <div className={styles.arrow_container}>
      <div className={styles.line} />
      <div className={styles.arrow} />
    </div>
  );
};
