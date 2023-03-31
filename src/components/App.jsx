import { useState } from 'react';
import { ContainerApp } from './App.styled';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';

export const App = () => {
  const [query, setQuery] = useState('');

  const handleSearch = event => {
    event.preventDefault();
    setQuery(event.target.elements.search.value);
  };

  return (
    <ContainerApp>
      <Searchbar onSubmit={handleSearch} />
      <ImageGallery query={query} />
    </ContainerApp>
  );
};
