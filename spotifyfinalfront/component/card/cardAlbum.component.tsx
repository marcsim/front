import React, { FunctionComponent, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Album } from '../../pages/api/dto/album.model';
import Link from 'next/link';

type CardProps = {
    album?: Album;
};

export default function CardAlbumTemplate(props: CardProps) {

    return (
        <Card style={{width: "200px", marginTop: "5%"}}>
            <Card.Img variant="top" width="100%" height="200px" src={ props.album?.cover } />
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













