import styles from './styles.module.scss';

interface TypeButtonProps {
  type: string;
  typeButtonActive: string;
  handleButtonClick: (type: string) => void;
}

export function TypeButton({
  type,
  typeButtonActive,
  handleButtonClick,
}: TypeButtonProps) {
  return (
    <button
      type="button"
      className={`${styles.typeButton} ${
        typeButtonActive === type ? styles.active : ''
      }`}
      onClick={() => handleButtonClick(type)}
    >
      {type}

      {typeButtonActive === type && <i className="fas fa-check fa-xs" />}
    </button>
  );
}
