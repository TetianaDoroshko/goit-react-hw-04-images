import { useState, useEffect, useRef } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { Container } from './App.styled';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { getImages } from 'services/api';
import { Loader } from 'components/Loader/Loader';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [imageCollection, setImageCollection] = useState([]);
  const [page, setPage] = useState(1);
  const [isButtonDisable, setIsButtonDisable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const reseiveImages = async () => {
      try {
        setIsLoading(true);

        const images = await getImages(searchQuery, page);

        setImageCollection(prevImages => [...prevImages, ...images.hits]);

        if (images.totalHits === 0) {
          Notify.info(
            `We don't find any images of ${searchQuery}. Change search query and try again`,
            { timeout: 3000 }
          );
        } else {
          if (page === 1) {
            Notify.success(
              `We find ${images.totalHits} images of ${searchQuery}`,
              { timeout: 3000 }
            );
          }
        }

        if (page === Math.ceil(images.totalHits / 12)) {
          Notify.info(
            "We're sorry, but you've reached the end of search results"
          );
          setIsButtonDisable(true);
        }
      } catch (error) {
        Notify.warning('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };
    reseiveImages();
  }, [page, searchQuery]);

  const onSearchSubmit = event => {
    event.preventDefault();
    if (event.target.elements.searchQuery.value) {
      setImageCollection([]);
      setSearchQuery(event.target.elements.searchQuery.value);
      setPage(1);
      setIsButtonDisable(false);
      event.target.searchQuery.value = '';
    } else {
      Notify.info(
        `Search query is empty. Please, enter a search query and try again`,
        { timeout: 3000 }
      );
    }
  };

  const changePage = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <Container>
      <Searchbar onSubmit={onSearchSubmit} />

      {isLoading && <Loader />}

      {imageCollection.length > 0 && <ImageGallery images={imageCollection} />}

      {imageCollection.length > 0 && (
        <Button
          onClick={changePage}
          disabled={isButtonDisable}
          isLoading={isLoading}
        />
      )}
    </Container>
  );
};
