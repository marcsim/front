import Link from 'next/link';
import { useState } from 'react';
import { Album } from '../../api/dto/album.model';
import Navigation from '../../component/navigation/navigation.component';

type IAlbumProps  = {
    albums: Album;
}

export default function AlbumItem(props: IAlbumProps) {
    const [isConnect, setIsConnect] = useState(false);
    return (
        <div>
            <Navigation isConnected={isConnect} />
            <main>
                <button type="button">
                    <Link href="/albums">Retour</Link>
                </button>
                <h1>{props.albums.title}</h1>
                <p>{props.albums.year}</p>
                <p>{props.albums.cover}</p>
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