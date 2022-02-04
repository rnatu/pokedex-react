import styles from './styles.module.scss';

interface TypeButtonProps {
  type: string;
}

export function TypeButton({ type }: TypeButtonProps) {
  return (
    <button type="button" className={styles.typeButton}>
      {type}
    </button>
  );
}
