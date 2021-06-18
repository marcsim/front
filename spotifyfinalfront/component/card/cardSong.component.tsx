import React from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { Song } from '../../pages/api/dto/song.model';

type CardProps = {
    song?: Song;
};

export default function CardSongTemplate(props: CardProps) {
    return( 
        <Card style={{width: "200px", marginTop: "5%"}}>
            <Card.Body>
                <Card.Title>{ props.song?.title }</Card.Title>
                <Card.Subtitle>{ props.song?.duration } min</Card.Subtitle>
                <Link href={ "/songs/"+props.song?.id }>
                    <Button variant="primary" >Voir cette musique</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};













