import { StyledButton } from './Button.styled';
import { LoaderButton } from 'components/Loader/Loader';

export const Button = ({ onClick, disabled, isLoading }) => {
  return (
    <StyledButton type="button" onClick={onClick} disabled={disabled}>
      {isLoading ? <LoaderButton /> : 'Load more...'}
    </StyledButton>
  );
};
