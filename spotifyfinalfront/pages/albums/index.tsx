import { Album } from "../api/dto/album.model";
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import styles from '../../styles/Home.module.css'
import Navigation from '../component/navigation/navigation.component';
import CardTemplate from '../component/card/card.component';

import { useEffect, useState } from "react";



type IAlbumProps  = {
    albums: Album[];
}

export default function album(props: IAlbumProps) {
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
                <h1>Albums</h1>
                    {/* <Route exact path="/album/add" component={ AddAlbumComponent }/> */}
                    {
                        isConnect ?  
                        <div className="btn-add">
                            <Link href="/album/add">
                                <Button variant="danger">Ajouter un album</Button>
                            </Link>
                        </div> : <div></div>
                    }
                    
                <div className="row">
                {
                    props.albums.map((album) => 
                        <div className="col-3 card">
                            <CardTemplate album={ album } />
                        </div>
                    )
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