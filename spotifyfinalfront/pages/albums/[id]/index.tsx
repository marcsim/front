import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Album } from '../../api/dto/album.model';
import Navigation from '../../component/navigation/navigation.component';

type IAlbumProps  = {
    albums: Album;
}

export default function AlbumItem(props: IAlbumProps) {
    const [isConnect, setIsConnect] = useState(false);
    const router = useRouter()
    useEffect(() => {
        if(window.localStorage.token) {
            setIsConnect(true);
        }
    }, []);

    async function onDelete() {
        if (props.albums) {
            await getServerSide(props.albums);
            router.push('/albums')
        } else {
            console.log('error');
        }
    }

    return (
        <div>
            <Navigation isConnected={isConnect} />
            <main>
                <Link href="/albums"> 
                    <Button variant="dark">Retour</Button>
                </Link>
                <h1>{props.albums.title}</h1>
                <p>{props.albums.year}</p>
                <p>{props.albums.cover}</p>
                <Button variant="danger" onClick={ onDelete }>Supprimer l'album</Button>
            </main>
        </div>
    );
}

export async function getServerSideProps(context: any) {
    const res = await fetch(`http://localhost:3001/album/${context.query.id}`)
    const albums : Album = await res.json()
    if (!albums) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    return {
        props: { albums }
    }
}

export async function getServerSide(album: Album) {
    const requestOptions = {
        method: 'delete'
    };
    await fetch(`http://localhost:3001/Album/${album.id}`, requestOptions)
    .then(res =>res.json())
    .then(recipes => {
        console.log(recipes);
        return ({ recipes });
    });
}