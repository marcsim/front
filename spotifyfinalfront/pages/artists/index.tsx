
import Link from 'next/link';
import { Artist } from "../api/dto/artist.model";
import styles from '../../styles/Home.module.css'
import Navigation  from '../../component/navigation/navigation.component';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import CardArtistTemplate from '../../component/card/cardArtist.component';

type IArtistProps  = {
    artists: Artist[];
}

export default function artist(props: IArtistProps) {    
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
                <h1 className={styles.title}>Artiste</h1>
                <div className={styles.btn_add_right}>
                    {
                        isConnect ?  
                        <div className="btn-add">
                            <Link href="/artists/addArtist">
                                <Button variant="danger">Ajouter un artiste</Button>
                            </Link>
                        </div> : <div></div>
                    }
                </div>
                <div className={styles.cardMargin}>
                    {
                        props.artists.length === 0 ? <p>Aucun artiste disponible</p> :     
                        <div className="row">
                        {
                            props.artists.map((artist, i) => 
                                <div className="col-3">
                                    <CardArtistTemplate key={i} artist={ artist } />
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
    const res = await fetch(`http://localhost:3001/artist`)
    const artists : Artist[] = await res.json()
    if (!artists) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    console.log(artists);
    return {
        props: { artists }, // will be passed to the page component as props
        revalidate : 15
    }
}