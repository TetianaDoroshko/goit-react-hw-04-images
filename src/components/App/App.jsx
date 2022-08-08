import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { Container } from './App.styled';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { getImages } from 'services/api';

export class App extends Component {
  state = {
    searchQuery: '',
    imageCollection: [],
    page: 1,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      try {
        const images = await getImages(searchQuery, page);
        this.setState({
          imageCollection: [...prevState.imageCollection, ...images.hits],
        });

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
      } catch (error) {
        Notify.warning('Something went wrong');
      }
    }
  }

  onSearchSubmit = event => {
    event.preventDefault();
    this.setState({
      searchQuery: event.target.elements.searchQuery.value,
      page: 1,
    });
    event.target.searchQuery.value = '';
  };

  changePage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { imageCollection, searchQuery, error } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.onSearchSubmit} />
        {imageCollection.length > 0 && (
          <ImageGallery images={imageCollection} />
        )}
        <Button onClick={this.changePage} />
      </Container>
    );
  }
}
