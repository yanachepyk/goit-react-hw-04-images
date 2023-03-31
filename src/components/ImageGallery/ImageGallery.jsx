import LoadMore from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
import { useState, useEffect } from 'react';
import {
  ContainerGallery,
  ContainerMesseg,
  TextMesseg,
} from './ImageGallery.styled';
import ImageGalleryItem from './ImageGalleryItem';

export const ImageGallery = ({ query }) => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [sourceImage, setSourceImage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const handleModalToggle = (showModal, sourceImage) => {
    setShowModal(showModal);
    setSourceImage(sourceImage);
  };

  useEffect(() => {
    setImages([]);
    setPage(1);
  }, [query]);

  useEffect(() => {
    if (query === '') {
      return;
    }
    setLoading(true);
    fetch(
      `https://pixabay.com/api/?q=${query}&page=${page}&key=34035283-4d31da2bf260205eb23ca149e&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => res.json())
      .then(res => (res.total === 0 ? Promise.reject() : res))
      .then(res => {
        if (page === 1) {
          setImages(res.hits);
        } else {
          setImages(prevState => [...prevState, ...res.hits]);
        }
      })
      .catch(() => {
        setShowMessage(true);
      })
      .finally(() => setLoading(false));
  }, [page, query]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <ContainerGallery>
        {showMessage ? (
          <ContainerMesseg>
            <TextMesseg>
              Oops, no results were found for your search.
            </TextMesseg>
          </ContainerMesseg>
        ) : (
          images.map(img => (
            <ImageGalleryItem
              key={img.id}
              previewImg={img.webformatURL}
              sourceImg={img.largeImageURL}
              alt={img.tags}
              handleItemClick={handleModalToggle}
            />
          ))
        )}
      </ContainerGallery>
      {loading && <Loader />}
      {images.length > 0 && <LoadMore handleClick={loadMore} />}
      {showModal && (
        <Modal onModalClose={handleModalToggle} sourceImg={sourceImage} />
      )}
    </>
  );
};
