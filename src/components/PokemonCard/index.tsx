import styles from './styles.module.scss';

interface PokemonCardProps {
  image: string;
  name: string;
  number: string;
  types: string[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function PokemonCard({ image, name, number, types }: PokemonCardProps) {
  return (
    <div className={styles.card}>
      <img src={image} alt={`Imagem de ${name}`} />
      <span>Nº {number}</span>
      <h2>{name}</h2>
      <p>{types}</p>
    </div>
  );
}
