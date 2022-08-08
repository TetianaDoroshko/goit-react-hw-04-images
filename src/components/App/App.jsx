import { Component } from 'react';
import { Container } from './App.styled';
import { Searchbar } from 'components/Searchbar/Searchbar';

export class App extends Component {
  render() {
    return (
      <Container>
        <Searchbar />
      </Container>
    );
  }
}
