import { useEffect } from 'react';
import { ContainerModal, Overlay } from './Modal.styled';

const Modal = ({ sourceImg, onModalClose }) => {
  useEffect(() => {
    console.log('fghjk')
    const handleEsclick = e => {
      if (e.code === 'Escape') {
        onModalClose(null);
      }
    };
    window.addEventListener('keydown', handleEsclick);

    return () => window.removeEventListener('keydown', handleEsclick);
  }, [onModalClose]);

  const handleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      onModalClose(null);
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <ContainerModal>
        <img src={sourceImg} alt="" />
      </ContainerModal>
    </Overlay>
  );
};

export default Modal;
