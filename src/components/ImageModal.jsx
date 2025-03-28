import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 2rem;
  cursor: pointer;
`;

const ModalImage = styled(motion.img)`
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 8px;
  cursor: default;
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const ImageModal = ({ isOpen, imageUrl, onClose }) => {
  const handleClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClick}
        >
          <ModalImage
            src={imageUrl}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          />
          <CloseButton
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ×
          </CloseButton>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default ImageModal;
