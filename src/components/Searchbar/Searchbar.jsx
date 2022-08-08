import { Component } from 'react';
import { SearchContainer } from './SearchContainer.styled';
import { SearchForm } from 'components/Searchbar/SearchForm.styled';
import { SearchFormButton } from './SearchFormButton.styled';
import { SearchFormLabel } from './SearchFormLabel.styled';
import { SearchFormInput } from './SearchFormInput.styled';

export class Searchbar extends Component {
  state = {
    currentQuery: '',
  };

  render() {
    return (
      <SearchContainer>
        <SearchForm>
          <SearchFormButton />
          <SearchFormLabel>
            <SearchFormInput />
          </SearchFormLabel>
        </SearchForm>
      </SearchContainer>
    );
  }
}
