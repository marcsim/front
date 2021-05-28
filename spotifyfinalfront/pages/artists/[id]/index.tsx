import { Artist } from "../../api/dto/artist.model";
import Link from 'next/link';
import Navigation from '../../component/navigation/navigation.component';
import { useState } from "react";


type IArtistProps  = {
    artists: Artist;
}

export default function ArtistItem(props: IArtistProps) {
    const [isConnect, setIsConnect] = useState(false);

    return (
        <div>
            <Navigation isConnected={isConnect} />
            <main>
                <button type="button">
                    <Link href="/artists">Retour</Link>
                </button>
                <h1>{props.artists.name}</h1>
                <p>{props.artists.isBand}</p>
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