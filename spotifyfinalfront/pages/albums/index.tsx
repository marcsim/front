import { Album } from "../api/dto/album.model";
import Link from 'next/link';
import styles from '../../styles/Home.module.css'
import Navigation from '../component/navigation/navigation.component';
import { useState } from "react";



type IAlbumProps  = {
    albums: Album[];
}

export default function album(props: IAlbumProps) {
    const [isConnect, setIsConnect] = useState(false);

    return (
        <div className={styles.container}>
            
            <Navigation isConnected={isConnect} />
            <main className={styles.main}>
                <table>
                    <tbody>
                        { props.albums.map((album: Album, index : number)=> (
                            <tr>
                                <td><Link href={'/albums/'+ album.id}>{album.title}</Link></td>
                                <td>{album.year}</td>
                                <td>{album.cover}</td>
                            </tr>
                        ))} 
                    </tbody>
                </table>
            </main>
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