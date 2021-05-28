
import Link from 'next/link';
import { Artist } from "../api/dto/artist.model";
import styles from '../../styles/Home.module.css'
import Navigation  from '../component/navigation/navigation.component';
import { useState } from 'react';

type IArtistProps  = {
    artists: Artist[];
}

export default function artist(props: IArtistProps) {    
    const [isConnect, setIsConnect] = useState(false);
    
    return (
        <div>
            <Navigation isConnected={isConnect} />
            <main className={styles.main}>
                <table>
                    <tbody>
                        { props.artists.map((artist: Artist, index : number)=> (
                            <tr>
                                <td><Link href={'/artists/'+ artist.id}>{artist.name}</Link></td>
                                <td>{artist.isBand}</td>
                            </tr>
                        ))} 
                    </tbody>
                </table>
            </main>
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