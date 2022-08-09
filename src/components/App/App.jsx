import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { Container } from './App.styled';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { getImages } from 'services/api';
import { Loader } from 'components/Loader/Loader';

export class App extends Component {
  state = {
    searchQuery: '',
    imageCollection: [],
    page: 1,
    isButtonDisable: false,
    isLoading: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery) {
      try {
        this.setState({ isLoading: true });

        const images = await getImages(searchQuery, page);

        this.setState({ imageCollection: images.hits });

        if (images.totalHits === 0) {
          Notify.info(
            `We don't find any images of ${searchQuery}. Change search query and try again`,
            { timeout: 3000 }
          );
        } else {
          Notify.success(
            `We find ${images.totalHits} images of ${searchQuery}`,
            { timeout: 3000 }
          );
        }

        if (page === Math.ceil(images.totalHits / 12)) {
          Notify.info(
            "We're sorry, but you've reached the end of search results"
          );
          this.setState({ isButtonDisable: true });
        }
      } catch (error) {
        Notify.warning('Something went wrong');
      } finally {
        this.setState({ isLoading: false });
      }
    }

    if (prevState.searchQuery === searchQuery && prevState.page !== page) {
      try {
        this.setState({ isLoading: true });

        const images = await getImages(searchQuery, page);
        this.setState({
          imageCollection: [...prevState.imageCollection, ...images.hits],
        });
        if (page === Math.ceil(images.totalHits / 12)) {
          Notify.info(
            "We're sorry, but you've reached the end of search results"
          );
          this.setState({ isButtonDisable: true });
        }
      } catch (error) {
        Notify.warning('Something went wrong');
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  onSearchSubmit = event => {
    event.preventDefault();
    this.setState({
      searchQuery: event.target.elements.searchQuery.value,
      page: 1,
      isButtonDisable: false,
    });
    event.target.searchQuery.value = '';
  };

  changePage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { imageCollection, isButtonDisable, isLoading } = this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.onSearchSubmit} />

        {isLoading && <Loader />}

        {imageCollection.length > 0 && (
          <ImageGallery images={imageCollection} />
        )}

        {imageCollection.length > 0 && (
          <Button
            onClick={this.changePage}
            disabled={isButtonDisable}
            isLoading={isLoading}
          />
        )}
      </Container>
    );
  }
}
