import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button, Form } from "react-bootstrap";
import Navigation from "../../component/navigation/navigation.component";
import { Song } from "../../api/dto/song.model";

export default function addArtist() {
    const [isConnect, setIsConnect] = useState(false);
    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState(0);
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

        // if (duration === 0) {
        //     setDurationError('Vous devez renseigner une durée valide.');
        //     valid = false;
        // }

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
        //setDuration(event.target.value);
    }

    return (
        <div className="container-user">
            <Navigation isConnected={isConnect} />
            <h1>Ajouter une musique</h1>
            <Link href="/songs"> 
                <Button variant="dark">Retour</Button>
            </Link>
            <Form className="form">
                <Form.Label>Titre :</Form.Label>
                <input placeholder="Titre" type="text" value={title} onChange={ onTitleChanged } />
                <p>{ titleError }</p>
                <Form.Label>Durée :</Form.Label>
                <input type="number" value={duration} onChange={ onDurationChanged } />
                <p>{ durationError }</p>
                
                <Button type="submit" onClick={onSubmit}>Valider</Button>
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