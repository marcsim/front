import React from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { Artist } from '../../api/dto/artist.model';

type CardProps = {
    artist?: Artist;
};
export default function CardArtistTemplate(props: CardProps) {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{ props.artist?.name }</Card.Title>
                <Card.Subtitle>{ props.artist?.isBand }</Card.Subtitle>
                <Link href={ "/artists/"+props.artist?.id }>
                    <Button variant="primary" >Voir cette artiste</Button>
                </Link>
            </Card.Body>
        </Card>
    );
}