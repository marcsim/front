import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button, Form } from "react-bootstrap";
import Navigation from "../../component/navigation/navigation.component";
import { Artist } from "../../api/dto/artist.model";

export default function addArtist() {
    const [isConnect, setIsConnect] = useState(false);
    const [name, setName] = useState('');
    const [isBand, setIsBand] = useState(false);
    const [nameError, setNameError] = useState('');
    const [isBandError, setIsBandError] = useState('');
    const [artists, setArtists] = useState<Artist[]>([]);
    const router = useRouter();
    
    useEffect(() => {
        if(window.localStorage.token) {
            setIsConnect(true);
        }
    }, []);

    async function onSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event?.preventDefault();

        setNameError('');
        setIsBandError('');

        let valid = true; 

        if (name.trim() === '') {
            setNameError('Vous devez renseigner un nom valide');
            valid = false; 
        }

        if (isBand === undefined) {
            setIsBandError('Vous devez renseigner si l\'artiste fait parti d\'une bande.');
            valid = false;
        }

        if (valid) {
            const tmpArtist = [...artists];
            tmpArtist.push({
                id: 0,
                name,
                isBand
            });
            setArtists(tmpArtist);
            await getServerSide(name, isBand);
            router.push('/artists');
        }
    }

    function onNameChanged(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }

    function onIsBandChanged(event: React.ChangeEvent<HTMLInputElement>) {
        console.log('event', event);
        //setIsBand(event.target.value);
    }

    return (
        <div className="container-user">
            <Navigation isConnected={isConnect} />
            <h1>Ajouter un artiste</h1>
            <Link href="/artists"> 
                <Button variant="dark">Retour</Button>
            </Link>
            <Form className="form">
                <Form.Label>Nom :</Form.Label>
                <input placeholder="Nom" type="text" value={name} onChange={ onNameChanged } />
                <p>{ nameError }</p>
                <Form.Label>L'artiste est-il en bande ? </Form.Label>
                <input type="checkbox" onChange={ onIsBandChanged } />
                <p>{ isBandError }</p>
                
                <Button type="submit" onClick={onSubmit}>Valider</Button>
            </Form>
        </div>
    );
}

export async function getServerSide(name: string, isBand: boolean) {
    const postBody = {
        name: name,
        isBand: isBand
    };
    const requestMetadata = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postBody)
    };
    await fetch('http://localhost:3001/artist/addArtist', requestMetadata)
    .then(res =>res.json())
    .then(recipes => {
        console.log(recipes);
        return ({ recipes });
    });
}