import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button, Form } from "react-bootstrap";
import { Album } from "../../api/dto/album.model";
import Navigation from "../../../component/navigation/navigation.component";
import styles from '../../../styles/Home.module.css'

import { useDropzone } from "react-dropzone";
import { Artist } from "../../api/dto/artist.model";

type IArtistProps  = {
    artists: Artist[];
    artist: Artist;
}

export default function addAlbum(props: IArtistProps) {
    const [isConnect, setIsConnect] = useState(false);
    const [loading, setLoading] = useState(true);
    const [file, setFile] = useState([]);
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [cover, setCover] = useState('');
    const [artist, setArtist] = useState<Artist[]>([]);
    const [titleError, setTitleError] = useState('');
    const [yearError, setYearError] = useState('');
    const [albums, setAlbums] = useState<Album[]>([]);
    // const {getRootProps, getInputProps }: any = useDropzone({
    //     accept: "image/*",
    //     onDrop: (acceptedFiles) => {
    //         setFile(
    //             acceptedFiles.map((file) => Object.assign(file, {
    //                 preview: URL.createObjectURL(file)
    //             }))
    //         )
    //     }
    // });
    const router = useRouter();
    useEffect(() => {
        if(window.localStorage.token) {
            setIsConnect(true);
        }
        console.log('tab', props.artists)
        // const tmpTab = [...artistName];
        // props.artists.map((item, index) => {
        //     console.log()
        //     tmpTab.push(item.name);
        // });
        // setArtistName(tmpTab);
        // console.log(artistName);
    }, []);

    async function onSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event?.preventDefault();

        setTitleError('');
        setYearError('');

        let valid = true; 

        if (title.trim() === '') {
            setTitleError('Vous devez renseigner un titre valide');
            valid = false; 
        }

        if (year.trim() === '') {
            setYearError('Vous devez renseigner une année valide');
            valid = false;
        }

        if (cover.trim() === '') {
            setCover('https://cdn2.clc2l.fr/c/thumbnail280/t/a/p/apple-music-tNKCFp.jpg');
            console.log(cover);
        }


        if (valid) {
            const tmpAlbum = [...albums];
            if (artist.length > 0) {
                tmpAlbum.push({
                    id: 0,
                    title,
                    year,
                    cover,
                    artist
                }); 
                console.log(tmpAlbum);
            } else {
                tmpAlbum.push({
                    id: 0,
                    title,
                    year,
                    cover,
                });
            }
            console.log(tmpAlbum);
            setAlbums(tmpAlbum);
            await getServerSide(0, title, year, cover);
            router.push('/albums')
        }
    }

    function onTitleChanged(event: React.ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value);
    }

    function onYearChanged(event: React.ChangeEvent<HTMLInputElement>) {
        setYear(event.target.value);
    }

    function onCoverChanged(event: React.ChangeEvent<HTMLInputElement>) {
        setCover(event.target.value);
    }

    async function onArtistChanged(event: React.ChangeEvent<HTMLSelectElement>) {
        const tmpArtist = [...artist];
        console.log(event.target.value);
        await getServerSide(parseInt(event.target.value, 10));
        tmpArtist.push(props.artist);
        console.log(tmpArtist);
        setArtist(tmpArtist);
    }

    // const images = file.map((file) => (
    //     // <div key={file.name}>
    //     //     <div>
    //     //         <img src={file.preview} style={{width: "200px" }} alt="preview" />
    //     //     </div>
    //     // </div>
    //     <p>{file.preview}</p>
    // ))

    return (
        <div className="container-user">
            <Navigation isConnected={isConnect} />
            <h1 className={styles.title}>Ajouter un album</h1>
            <Link href="/albums"> 
                <Button className={styles.btn_add_right} variant="dark">Retour</Button>
            </Link>
            <Form className={styles.cardMargin}>
                <Form.Label style={{ marginLeft: "40%" }}>Titre :</Form.Label>
                <br/>
                <input style={{ marginLeft: "40%" }} placeholder="Titre" type="text" value={title} onChange={ onTitleChanged } />
                <p style={{ marginLeft: "40%" }}>{ titleError }</p>
                <Form.Label style={{ marginLeft: "40%" }}>Artistes : </Form.Label>
                <select style={{ marginLeft: "2%" }} onChange={ onArtistChanged }>
                {/* multiple */}
                    <option value="0">-------</option>
                    {
                        props.artists.map((item) => (
                            <option value={item.id}>{item.name}</option>
                        ))
                    }
                </select>
                <br/>
                <Form.Label style={{ marginLeft: "40%" }}>Année : </Form.Label>
                <br/>                
                <input style={{ marginLeft: "40%" }} placeholder="Année" type="text" value={year} onChange={ onYearChanged } />
                <p style={{ marginLeft: "40%" }}>{ yearError }</p>
                <Form.Label style={{ marginLeft: "40%" }}>Image de couverture : </Form.Label>
                <br/>
                <input style={{ marginLeft: "40%", width: "300px" }} type="text" placeholder="URL de l'image" onChange={ onCoverChanged } />
                {/* <input placeholder="Image" type="file" onChange={ onCoverChanged } /> */}
                {/* <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drop file here</p>
                </div> */}
                <div>
                    {
                        cover ? <img src={cover} style={{ marginLeft: "40%", marginBottom: "5%" }} width="150px" height="150px" alt="couverture de l'album" /> : <span></span> 
                    }
                </div>
                <Button style={{ marginLeft: "40%" }} type="submit" onClick={onSubmit}>Valider</Button>
            </Form>
        </div>
    );
}

export async function getServerSide(id?: number, title?: string, year?: string, cover?: string) {
    if (!id) {
        const postBody = {
            title: title,
            year: year,
            cover: cover
        };
        const requestMetadata = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postBody)
        };
        await fetch('http://localhost:3001/Album/addAlbum', requestMetadata)
        .then(res =>res.json())
        .then(recipes => {
            console.log(recipes);
            return ({ recipes });
        });
    } else {
        console.log('ici');
        await fetch(`http://localhost:3001/artist/${id}`)
        .then(res =>res.json())
        .then(recipes => {
            console.log(recipes);
            return ({ recipes });
        });
    }
}

export async function getStaticProps(context: any) {
    const res = await fetch(`http://localhost:3001/artist`)
    const artists : Artist[] = await res.json()
    if (!artists) {
        console.log('List empty');
    }
    console.log(artists);
    return {
        props: { artists }, // will be passed to the page component as props
        revalidate : 15
    }
}

function setQuery(arg0: (prevState: any) => any) {
    throw new Error("Function not implemented.");
}
