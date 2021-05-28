import React, { Fragment, FunctionComponent } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Artist } from './../../api/dto/artist.model';
import { Song } from './../../api/dto/song.model';

type ListProps = {
    artist?: Artist;
    song?: Song;
};

const ListTemplate: FunctionComponent<ListProps> = (props: ListProps) => {

    return (
        <Fragment>
        {
            props.artist ? <ListGroup.Item>{ props.artist?.name } - { props.artist?.isBand }</ListGroup.Item> : <Fragment></Fragment>

        }
        {
            props.song ? <ListGroup.Item>{ props.song?.title } - { props.song?.duration }</ListGroup.Item> : <Fragment></Fragment>
        }
        </Fragment>
    );
}

export default ListTemplate
