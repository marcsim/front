import { Song } from "../../api/dto/song.model";
import Link from 'next/link';
import { useState } from "react";
import Navigation from '../../component/navigation/navigation.component';


type ISongProps  = {
    songs: Song;
}

export default function SongItem(props: ISongProps) {
    const [isConnect, setIsConnect] = useState(false);

    return (
        <div>
            <Navigation isConnected={isConnect} />
            <main>
                <button type="button">
                    <Link href="/song">Retour</Link>
                </button>
                <h1>{props.songs.title}</h1>
                <p>{props.songs.duration}</p>
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