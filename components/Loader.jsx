import Image from 'next/image';
import styles from '../styles/Loader.module.css';

export default function Loader() {
    return (
        <div className={styles.container}>
            <Image
                src="/rickMorty.gif"
                alt="Loading..."
                width={300}
                height={300}
                className={styles.loader}
                priority={true}
            />
            <p className={styles.text}>Carregando...</p>

        </div>
    )
};