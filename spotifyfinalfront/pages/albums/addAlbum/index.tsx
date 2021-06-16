import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button, Form } from "react-bootstrap";
import { Album } from "../../api/dto/album.model";
import Navigation from "../../component/navigation/navigation.component";
import { useDropzone } from "react-dropzone";

export default function addAlbum() {
    const [isConnect, setIsConnect] = useState(false);
    const [file, setFile] = useState([]);
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [cover, setCover] = useState('');
    const [titleError, setTitleError] = useState('');
    const [yearError, setYearError] = useState('');
    const [coverError, setCoverError] = useState('');
    const [albums, setAlbums] = useState<Album[]>([]);
    const {getRootProps, getInputProps }: any = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles) => {
            setFile(
                acceptedFiles.map((file) => Object.assign(file, {
                    preview: URL.createObjectURL(file)
                }))
            )
        }
    });
    const router = useRouter();
    useEffect(() => {
        if(window.localStorage.token) {
            setIsConnect(true);
        }
    }, []);

    

    async function onSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event?.preventDefault();

        setTitleError('');
        setYearError('');
        setCoverError('');

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
            setCoverError('Vous devez renseigner une image valide');
            valid = false;
        }

        if (valid) {
            const tmpAlbum = [...albums];
            tmpAlbum.push({
                id: 0,
                title,
                year,
                cover,
            });
            setAlbums(tmpAlbum);
            await getServerSide(title, year, cover);
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

    const images = file.map((file) => (
        // <div key={file.name}>
        //     <div>
        //         <img src={file.preview} style={{width: "200px" }} alt="preview" />
        //     </div>
        // </div>
        <p>{file.preview}</p>
    ))

    return (
        <div className="container-user">
            <Navigation isConnected={isConnect} />
            <h1>Ajouter un album</h1>
            <Link href="/albums"> 
                <Button variant="dark">Retour</Button>
            </Link>
            <Form className="form">
                <Form.Label>Titre :</Form.Label>
                <input placeholder="Titre" type="text" value={title} onChange={ onTitleChanged } />
                <p>{ titleError }</p>
                <Form.Label>Année : </Form.Label>
                <input placeholder="Année" type="text" value={year} onChange={ onYearChanged } />
                <p>{ yearError }</p>
                <Form.Label>Image de couverture : </Form.Label>
                <input placeholder="Image" type="file" onChange={ onCoverChanged } />
                <p>{ coverError }</p>
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drop file here</p>
                </div>
                <div>
                    {images}
                </div>
                <Button type="submit" onClick={onSubmit}>Valider</Button>
            </Form>
        </div>
    );
}

export async function getServerSide(title: string, year: string, cover: string) {
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
}

function setQuery(arg0: (prevState: any) => any) {
    throw new Error("Function not implemented.");
}
