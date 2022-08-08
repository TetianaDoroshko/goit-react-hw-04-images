import { Item } from './Item.styled';
import { Image } from './Image.styled';

export const ImageGalleryItem = ({ item }) => {
  return (
    <Item>
      <Image src={item.webformatURL} alt="photo" />
    </Item>
  );
};
