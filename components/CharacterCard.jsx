import Image from 'next/image';
import styles from '../styles/CharacterCard.module.css';

export default function CharacterCard({ character, onClick }) {
 return (
    <div className={styles.card}
    onClick={onClick} >
        <Image
        className={styles.avatar} 
        src={character.image} 
        alt={character.name} 
        width={120}
        height={120}
        priority={true}
        />

        <h3 className={styles.title}> 
        <Image className={styles.icon}src='/iconName.png'
        alt='Icone' 
        width={20} 
         height={20}/>
        {character.name}</h3>
        <p className={styles.text}>{character.status}</p>
        <p className={styles.text}>{character.species}</p>
        <p className={styles.text}> {character.type || "Sem tipo"}</p>
        <p className={styles.text}> {character.gender}</p>
    
    </div>
 );
}
