import { Component } from 'react';
import { Overlay, ModalContent, ModalImage } from './Modal.styled';
import { createPortal } from 'react-dom';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.onCloseEscape);
    document.addEventListener('click', this.onCloseClick);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onCloseEscape);
    document.removeEventListener('click', this.onCloseClick);
  }
  onCloseEscape = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  onCloseClick = event => {
    if (event.target.nodeName !== 'IMG') {
      this.props.onClose();
    }
  };
  render() {
    const { item } = this.props;
    return createPortal(
      <Overlay>
        <ModalContent>
          <ModalImage src={item.largeImageURL} alt={item.tags} />
        </ModalContent>
      </Overlay>,
      document.querySelector('#modal-root')
    );
  }
}
