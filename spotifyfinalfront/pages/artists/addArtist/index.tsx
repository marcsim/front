import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button, Form } from "react-bootstrap";
import Navigation from "../../../component/navigation/navigation.component";
import { Artist } from "../../api/dto/artist.model";
import styles from '../../../styles/Home.module.css'


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
        //setIsBand(event.target.form[1]?.checked);
    }

    return (
        <div className="container-user">
            <Navigation isConnected={isConnect} />
            <h1 className={styles.title}>Ajouter un artiste</h1>
            <Link href="/artists"> 
                <Button className={styles.btn_add_right} variant="dark">Retour</Button>
            </Link>
            <Form className={styles.cardMargin}>
                <Form.Label style={{ marginLeft: "40%" }}>Nom :</Form.Label>
                <br/>
                <input style={{ marginLeft: "40%" }} placeholder="Nom" type="text" value={name} onChange={ onNameChanged } />
                <p style={{ marginLeft: "40%" }}>{ nameError }</p>
                <Form.Label style={{ marginLeft: "40%" }}>L'artiste est-il en bande ? </Form.Label>
                <input style={{ marginLeft: "2%" }}type="checkbox" onChange={ onIsBandChanged } />
                <p style={{ marginLeft: "40%" }}>{ isBandError }</p>
                
                <Button style={{ marginLeft: "40%" }} type="submit" onClick={onSubmit}>Valider</Button>
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