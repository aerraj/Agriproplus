import  { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <ModalContext.Provider value={{ modalOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

// Prop Types validation for ModalProvider
ModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
