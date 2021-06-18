import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'
import Navigation from '../component/navigation/navigation.component';
import Headphones from './../public/headphones.jpg';


export default function Home() {
  const [isConnect, setIsConnect] = useState(false);
  useEffect(() => {
    console.log('local', window.localStorage);
    if(window.localStorage.token) {
        setIsConnect(true);
    }
  }, []);
  return (
    <div>
      <Head>
        <title>Spotify wish</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" type="image/jpg" href="/headphoneLogo.jpg" />
      </Head>
      <Navigation isConnected={isConnect} />
      <main className={styles.main}>
        <h1 className={styles.title}>
          Bienvenue dans notre bibliothèque de Musique 
        </h1>
        <div style={{margin: "20px"}}>
          <Image src="/headphones.jpg" alt="headphone" width="1000px" height="600px" />
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' Marc-antoine SIMON'}
        </a>
      </footer>
    </div>
  )
}
