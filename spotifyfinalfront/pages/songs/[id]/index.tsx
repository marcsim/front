import { Song } from "../../api/dto/song.model";
import Link from 'next/link';
import React, { useEffect, useState } from "react";
import Navigation from '../../../component/navigation/navigation.component';
import { Button } from "react-bootstrap";
import { useRouter } from 'next/router';
import styles from '../../../styles/Home.module.css'

type ISongProps  = {
    songs: Song;
}

export default function SongItem(props: ISongProps) {
    const [isConnect, setIsConnect] = useState(false);
    const router = useRouter()
    useEffect(() => {
        if(window.localStorage.token) {
            setIsConnect(true);
        }
    }, []);

    async function onDelete() {
        if (props.songs) {
            await getServerSide(props.songs);
            router.push('/songs')
        } else {
            console.log('error');
        }
    }

    return (
        <div>
            <Navigation isConnected={isConnect} />
            <main className={styles.cardMargin}>
                <Link href="/songs"> 
                    <Button className={styles.btn_add_right} variant="dark">Retour</Button>
                </Link>
                <h1 className={styles.title}>{props.songs.title}</h1>
                <p style={{ marginLeft: "45%"}}>{props.songs.duration} min</p>
                <Button style={{ marginLeft: "40%"}} variant="danger" onClick={ onDelete }>Supprimer la musique</Button>
            </main>
        </div>
    );
}

export async function getServerSideProps(context: any) {
    const res = await fetch(`http://localhost:3001/song/${context.query.id}`)
    const songs : Song = await res.json()
    console.log(songs);
    if (!songs) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    return {
        props: { songs }
    }
}

export async function getServerSide(song: Song) {
    const requestOptions = {
        method: 'delete'
    };
    await fetch(`http://localhost:3001/Song/${song.id}`, requestOptions)
    .then(res =>res.json())
    .then(recipes => {
        console.log(recipes);
        return ({ recipes });
    });
}