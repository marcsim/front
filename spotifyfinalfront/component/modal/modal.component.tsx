import React, { FunctionComponent } from "react";
import { Fragment } from "react";
import Link from 'next/link';
import { Album } from "../../pages/api/dto/album.model";
import './modal.style.css';

type Props = {
  album?: Album;
  visible?: boolean;
  onClose: () => void;
}

const ModalComponent: FunctionComponent<Props> = (props: Props) => {

  function onClickCloseBtn(): void {
    if (props.onClose) {
      props.onClose();
    }
  }
  
  return (
    <Fragment>
      {
        props.visible &&
        <div className='modalOverlay'>
          <div className='modalContainer'>
            <h1 className='modalTitle'>{ props.album?.title }</h1>
            <p className='modalBody'>
              <span>{ props.album?.cover }</span>
              <br/>
              <span>{ props.album?.year}</span>
            </p>
            <Link href="/album">
              <button className='modalCloseBtn' onClick={ onClickCloseBtn }>Close</button>
            </Link>            
          </div>
        </div>
      }
    </Fragment>
  );
};

export default ModalComponent;