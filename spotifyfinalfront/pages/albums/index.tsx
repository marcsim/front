import { Album } from "../api/dto/album.model";
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import styles from '../../styles/Home.module.css'
import Navigation from '../component/navigation/navigation.component';
import CardAlbumTemplate from '../component/card/cardAlbum.component';

import { useEffect, useState } from "react";



type IAlbumProps  = {
    albums: Album[];
}

export default function album(props: IAlbumProps) {
    const [isConnect, setIsConnect] = useState(false);
    useEffect(() => {
        console.log('local', window.localStorage);
        if(window.localStorage.token) {
            setIsConnect(true);
        }
      }, []);

    return (
        <div>
            <Navigation isConnected={isConnect} />
            <div className="container">
                <h1 className={styles.title}>Albums</h1>
                <div className={styles.btn_add_right}>
                    {
                        isConnect ?  
                        <div className="btn-add">
                            <Link href="/albums/addAlbum">
                                <Button variant="danger">Ajouter un album</Button>
                            </Link>
                        </div> : <div></div>
                    }
                </div>
                <div className={styles.cardMargin}>    
                {
                    props.albums.length === 0 ? <p>Aucun album disponible</p> : 
                    <div className="row">
                    {
                        props.albums.map((album, i) => 
                            <div className="col-3 card">
                                <CardAlbumTemplate key={i} album={ album } />
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
    const res = await fetch(`http://localhost:3001/album`)
    const albums : Album[] = await res.json()
    if (!albums) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    return {
        props: { albums }, // will be passed to the page component as props
        revalidate : 15
    }
}