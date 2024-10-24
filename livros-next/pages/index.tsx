import Head from 'next/head';
import { Menu } from '../componentes/Menu'; 
import styles from '../styles/Home.module.css'; 


export default function Home() {
  return (
    <div className="container">
            <Head>
                <title>Loja Next</title>
            </Head>
            <Menu />
            <main className={styles.homeMain}>
                <h1 className={styles.homeTitle}>Página Inicial</h1>
            </main>
        </div>
  );
}
