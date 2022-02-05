import styles from './styles.module.scss';

interface CardProps {
  image: string;
  name: string;
  number: string;
  types: string[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Card({ image, name, number, types }: CardProps) {
  function addDefaultSrc(e: any) {
    e.target.src =
      'https://cdn.neemo.com.br/uploads/settings_webdelivery/logo/996/notfound.png';
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardImage}>
        <button type="button">
          <i className="far fa-heart fa-lg" />
        </button>
        <img
          onError={(e) => addDefaultSrc(e)}
          src={image}
          alt={`Imagem de ${name}`}
        />
      </div>
      <span>Nº {number}</span>
      <h2>{name}</h2>
      {types.map((type) => (
        <p className={styles[type]}>{type}</p>
      ))}
    </div>
  );
}
