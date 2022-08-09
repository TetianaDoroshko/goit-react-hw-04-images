import { Item } from './Item.styled';
import { Image } from './Image.styled';
import { Component } from 'react';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };
  render() {
    const { item } = this.props;
    return (
      <Item>
        <Image
          src={item.webformatURL}
          alt={item.tags}
          loading="lazy"
          onClick={this.openModal}
        />
        {this.state.isModalOpen && (
          <Modal item={item} onClose={this.closeModal} />
        )}
      </Item>
    );
  }
}
