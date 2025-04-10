import styles from '../styles/CharacterCard.module.css';

export default function CharacterCard({ character }) {
 return (
    <div className={styles.card}>
        <img 
        className={styles.avatar} 
        src={character.image} 
        alt={character.name} 
        />

        <h3 className={styles.title}> 
        <img  className={styles.icon}src='/iconName.png' />
        {character.name}</h3>
        <p className={styles.text}>{character.status}</p>
        <p className={styles.text}>{character.species}</p>
        <p className={styles.text}> {character.type || "Sem tipo"}</p>
        <p className={styles.text}> {character.gender}</p>
    
    </div>
 );
}
