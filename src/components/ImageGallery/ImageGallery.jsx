import { ImageGalleryList } from './ImageGalleryList.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images }) => {
  return (
    <ImageGalleryList>
      {images.map(image => (
        <ImageGalleryItem item={image} key={image.id} />
      ))}
    </ImageGalleryList>
  );
};
