
import Link from 'next/link';
import { Song } from "../api/dto/song.model";
import styles from '../../styles/Home.module.css'
import Navigation from '../../component/navigation/navigation.component';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import CardSongTemplate from '../../component/card/cardSong.component';

type ISongProps  = {
    songs: Song[];
}

export default function song(props: ISongProps) {    
    const [isConnect, setIsConnect] = useState(false);
    useEffect(() => {
        if(window.localStorage.token) {
            setIsConnect(true);
        }
    }, []);
    return (
        <div>
            <Navigation isConnected={isConnect} />
            <div className="container">
                <h1 className={styles.title}>Musique</h1>
                <div className={styles.btn_add_right}>
                    {
                        isConnect ?  
                        <div className="btn-add">
                            <Link href="/songs/addSong">
                                <Button variant="danger">Ajouter une musique</Button>
                            </Link>
                        </div> : <div></div>
                    }
                </div>
                <div className={styles.cardMargin}>    
                    {
                        props.songs.length === 0 ? <p>Aucune musique disponible</p> : 
                        <div className="row">
                        {
                            props.songs.map((song, i) => 
                                <div className="col-3">
                                    <CardSongTemplate key={i} song={ song } />
                                </div>
                            )
                        }
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export async function getStaticProps(context: any) {
    const res = await fetch(`http://localhost:3001/song`)
    const songs : Song[] = await res.json()
    if (!songs) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    return {
        props: { songs }, // will be passed to the page component as props
        revalidate : 15
    }
}