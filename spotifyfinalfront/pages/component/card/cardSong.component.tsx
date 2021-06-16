import React from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { Song } from '../../api/dto/song.model';

type CardProps = {
    song?: Song;
};

export default function CardSongTemplate(props: CardProps) {
    return( 
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{ props.song?.title }</Card.Title>
                <Card.Subtitle>{ props.song?.duration }</Card.Subtitle>
                <Link href={ "/songs/"+props.song?.id }>
                    <Button variant="primary" >Voir cette musique</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};













