import { Artist } from "../../api/dto/artist.model";
import Link from 'next/link';
import Navigation from '../../component/navigation/navigation.component';
import React, { useState } from "react";
import { useRouter } from 'next/router';
import { Button } from "react-bootstrap";

type IArtistProps  = {
    artists: Artist;
}

export default function ArtistItem(props: IArtistProps) {
    const [isConnect, setIsConnect] = useState(false);
    const router = useRouter();

    async function onDelete() {
        if (props.artists) {
            await getServerSide(props.artists);
            router.push('/artists')
        } else {
            console.log('error');
        }
    }

    return (
        <div>
            <Navigation isConnected={isConnect} />
            <main>
            <Link href="/artists"> 
                    <Button variant="dark">Retour</Button>
                </Link>
                <h1>{props.artists.name}</h1>
                <p>{props.artists.isBand}</p>
                <Button onClick={ onDelete }>Supprimer l'album</Button>
            </main>
        </div>
    );
}

export async function getServerSideProps(context: any) {
    const res = await fetch(`http://localhost:3001/artist/${context.query.id}`)
    const artists : Artist = await res.json()
    if (!artists) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    return {
        props: { artists }
    }
}

export async function getServerSide(artist: Artist) {
    const requestOptions = {
        method: 'delete'
    };
    await fetch(`http://localhost:3001/Artist/${artist.id}`, requestOptions)
    .then(res =>res.json())
    .then(recipes => {
        console.log(recipes);
        return ({ recipes });
    });
}