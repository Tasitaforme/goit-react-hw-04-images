import PropTypes from 'prop-types';
import { Overlay, ModalWrap } from './Modal.styled';
import { createPortal } from 'react-dom';
import React, { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ src, alt, onClose }) => {
  useEffect(() => {
    const handlerEscape = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handlerEscape);

    return () => {
      window.removeEventListener('keydown', handlerEscape);
    };
  }, [onClose]);

  const handlerBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handlerBackdropClick}>
      <ModalWrap>
        <img src={src} alt={alt} />
      </ModalWrap>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

// import PropTypes from 'prop-types';
// import { Overlay, ModalWrap } from './Modal.styled';
// import { createPortal } from 'react-dom';
// import { Component } from 'react';

// const modalRoot = document.querySelector('#modal-root');

// export default class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', handlerEscape);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', handlerEscape);
//   }

//   handlerEscape = e => {
//     if (e.code === 'Escape') {
//       onClose();
//     }
//   };

//   handlerBackdropClick = e => {
//     if (e.currentTarget === e.target) {
//       onClose();
//     }
//   };

//   render() {
//     return createPortal(
//       <Overlay onClick={handlerBackdropClick}>
//         <ModalWrap>
//           <img src={src} alt={alt} />
//         </ModalWrap>
//       </Overlay>,
//       modalRoot
//     );
//   }
// };

// Modal.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   src: PropTypes.string.isRequired,
//   alt: PropTypes.string.isRequired,
// };
