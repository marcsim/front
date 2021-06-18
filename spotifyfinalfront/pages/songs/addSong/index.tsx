import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button, Form } from "react-bootstrap";
import Navigation from "../../../component/navigation/navigation.component";
import { Song } from "../../api/dto/song.model";
import styles from '../../../styles/Home.module.css'


export default function addArtist() {
    const [isConnect, setIsConnect] = useState(false);
    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState<number>(0);
    const [titleError, setTitleError] = useState('');
    const [durationError, setDurationError] = useState('');
    const [songs, setSongs] = useState<Song[]>([]);
    const router = useRouter();
    
    useEffect(() => {
        if(window.localStorage.token) {
            setIsConnect(true);
        }
    }, []);

    async function onSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event?.preventDefault();

        setTitleError('');
        setDurationError('');

        let valid = true; 

        if (title.trim() === '') {
            setTitleError('Vous devez renseigner un titre valide');
            valid = false; 
        }

        if (duration === 0) {
            setDurationError('Vous devez renseigner une durée valide.');
            valid = false;
        }

        if (valid) {

            const tmpSong = [...songs];
            tmpSong.push({
                id: 0,
                title,
                duration
            });
            setSongs(tmpSong);
            await getServerSide(title, duration);
            router.push('/songs');
        }
    }

    function onTitleChanged(event: React.ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value);
    }

    function onDurationChanged(event: React.ChangeEvent<HTMLInputElement>) {
        setDuration(parseInt(event.target.value, 10));
    }

    return (
        <div className="container-user">
            <Navigation isConnected={isConnect} />
            <h1 className={styles.title}>Ajouter une musique</h1>
            <Link href="/songs"> 
                <Button className={styles.btn_add_right} variant="dark">Retour</Button>
            </Link>
            <Form className={styles.cardMargin}>
                <Form.Label style={{ marginLeft: "40%" }}>Titre :</Form.Label>
                <br/>
                <input style={{ marginLeft: "40%" }} placeholder="Titre" type="text" value={title} onChange={ onTitleChanged } />
                <p style={{ marginLeft: "40%" }}>{ titleError }</p>
                <Form.Label style={{ marginLeft: "40%" }}>Durée (en min):</Form.Label>
                <br/>
                <input style={{ marginLeft: "40%" }} type="number" value={duration} onChange={ onDurationChanged } />
                <p style={{ marginLeft: "40%" }}>{ durationError }</p>
                
                <Button style={{ marginLeft: "40%" }} type="submit" onClick={onSubmit}>Valider</Button>
            </Form>
        </div>
    );
}

export async function getServerSide(title: string, duration: number) {
    const postBody = {
        title: title,
        duration: duration
    };
    const requestMetadata = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postBody)
    };
    await fetch('http://localhost:3001/song/addSong', requestMetadata)
    .then(res =>res.json())
    .then(recipes => {
        console.log(recipes);
        return ({ recipes });
    });
}