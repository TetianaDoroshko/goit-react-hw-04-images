import { SearchHeader } from './SearchHeader.styled';
import { SearchForm } from 'components/Searchbar/SearchForm.styled';
import { SearchFormButton } from './SearchFormButton.styled';
import { SearchFormButtonLabel } from './SearchFormButtonLabel.styled';
import { SearchFormInput } from './SearchFormInput.styled';
import { BiSearch } from 'react-icons/bi';

export const Searchbar = ({ onSubmit }) => {
  return (
    <SearchHeader>
      <SearchForm onSubmit={onSubmit}>
        <SearchFormButton type="submit">
          <BiSearch />
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>
        <SearchFormInput
          type="text"
          name="searchQuery"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchHeader>
  );
};
