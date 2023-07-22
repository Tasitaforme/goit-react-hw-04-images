import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types'

import{ImageGalleryUL} from './ImageGallery.styled'

export const ImageGallery = ({ images, onClickImage, listRef }) => {
 
  return (
    <ImageGalleryUL ref={listRef}>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <ImageGalleryItem
            key={id}
            src={webformatURL}
            alt={tags}
            largeImageURL={largeImageURL}
            onClickImage={onClickImage}
          />
        );
      })}
    </ImageGalleryUL>
  );
};

ImageGallery.propTypes = {
  images:PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
  onClickImage: PropTypes.func.isRequired,
};
