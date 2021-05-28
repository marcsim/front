
import Link from 'next/link';
import { Song } from "../api/dto/song.model";
import styles from '../../styles/Home.module.css'
import Navigation from '../component/navigation/navigation.component';
import { useState } from 'react';

type ISongProps  = {
    songs: Song[];
}

export default function song(props: ISongProps) {    
    const [isConnect, setIsConnect] = useState(false);


    return (
        <div>
            <Navigation isConnected={isConnect} />
            <main className={styles.main}>
                <table>
                    <tbody>
                        { props.songs.map((song: Song, index : number)=> (
                            <tr>
                                <td><Link href={'/song/'+ song.id}>{song.title}</Link></td>
                                <td>{song.duration}</td>
                            </tr>
                        ))} 
                    </tbody>
                </table>
            </main>
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