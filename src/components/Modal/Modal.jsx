import { useEffect } from 'react';
import { Overlay, ModalContent, ModalImage } from './Modal.styled';
import { createPortal } from 'react-dom';

export const Modal = ({ item, onClose }) => {
  useEffect(() => {
    const onCloseEscape = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
    const onCloseClick = event => {
      if (event.target.nodeName !== 'IMG') {
        onClose();
      }
    };

    document.addEventListener('keydown', onCloseEscape);
    document.addEventListener('click', onCloseClick);
    return () => {
      document.removeEventListener('keydown', onCloseEscape);
      document.removeEventListener('click', onCloseClick);
    };
  }, [onClose]);

  return createPortal(
    <Overlay>
      <ModalContent>
        <ModalImage src={item.largeImageURL} alt={item.tags} />
      </ModalContent>
    </Overlay>,
    document.querySelector('#modal-root')
  );
};
