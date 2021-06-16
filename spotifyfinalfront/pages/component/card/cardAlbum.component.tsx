import React, { FunctionComponent, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Album } from '../../api/dto/album.model';
import Link from 'next/link';
import { Artist } from '../../api/dto/artist.model';
import { Song } from '../../api/dto/song.model';

type CardProps = {
    album?: Album;
};

export default function CardAlbumTemplate(props: CardProps) {

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={ props.album?.cover } />
            <Card.Body>
                <Card.Title>{ props.album?.title }</Card.Title>
                <Card.Subtitle>{ props.album?.year}</Card.Subtitle>
                <Card.Text>Une description</Card.Text>
                <Link href={ "/albums/"+props.album?.id }>
                    <Button variant="primary" >Voir cette album</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};













