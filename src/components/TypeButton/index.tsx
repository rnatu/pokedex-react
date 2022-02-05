import styles from './styles.module.scss';

interface TypeButtonProps {
  type: string;
  typeButtonActive: string;
  setTypeButtonActive: (type: string) => void;
}

export function TypeButton({
  type,
  typeButtonActive,
  setTypeButtonActive,
}: TypeButtonProps) {
  return (
    <button
      type="button"
      className={`${styles.typeButton} ${
        typeButtonActive === type ? styles.active : ''
      }`}
      onClick={() => setTypeButtonActive(type)}
    >
      {type}

      {typeButtonActive === type && <i className="fas fa-check fa-xs" />}
    </button>
  );
}
