import React, { FunctionComponent } from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Album } from './../../api/dto/album.model';
import Link from 'next/link';
import { Artist } from './../../api/dto/artist.model';

type AlbumProps = {
    album?: Album;
    artist?: Artist;
};

const CardTemplate: FunctionComponent<AlbumProps> = (props: AlbumProps) => {
    return(
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={ props.album?.cover } />
            <Card.Body>
                <Card.Title>{ props.album?.title }</Card.Title>
                <Card.Subtitle>{ props.album?.year}</Card.Subtitle>
                <Card.Text>Une description</Card.Text>
                    <Link href={ "/album/"+props.album?.id }>
                        <Button variant="primary" >Voir cette album</Button>
                    </Link>
            </Card.Body>
        </Card>
    );
};

export default CardTemplate; 














