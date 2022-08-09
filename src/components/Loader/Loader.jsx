import { ThreeDots } from 'react-loader-spinner';

export const Loader = () => (
  <ThreeDots
    height="80"
    width="80"
    radius="9"
    color="#3f51b5"
    ariaLabel="three-dots-loading"
    visible={true}
  />
);

export const LoaderButton = () => (
  <ThreeDots
    height="30"
    width="30"
    radius="5"
    color="#ffffff"
    ariaLabel="three-dots-loading"
    visible={true}
  />
);
