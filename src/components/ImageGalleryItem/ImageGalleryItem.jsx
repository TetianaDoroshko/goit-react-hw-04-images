import { Item } from './Item.styled';
import { Image } from './Image.styled';
import { useState } from 'react';
import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Item>
      <Image
        src={item.webformatURL}
        alt={item.tags}
        loading="lazy"
        onClick={openModal}
      />
      {isModalOpen && <Modal item={item} onClose={closeModal} />}
    </Item>
  );
};
