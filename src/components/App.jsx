import React, { useEffect, useState, useRef } from 'react';
import { animateScroll as scroll } from 'react-scroll';

import {Searchbar} from './Searchbar/Searchbar'
import {ImageGallery} from './ImageGallery/ImageGallery'
import Button from './Button/Button'
import {Modal} from './Modal/Modal'
import {Loader} from './Loader/Loader'

import { getGalleryImages } from './api/api'

import { AppWrap } from './App.styled';

import { Toaster, toast } from 'react-hot-toast';

const App = () => {
  const [images, setImages] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showloadMore, setShowloadMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showImageModal, setShowImageModal] = useState({});

  const listRef = useRef();

  useEffect(() => {
    if (!searchQuery) return;
    apiImages();

    async function apiImages() {
      try {
        setLoading(true);
        const imagePerPage = 12;
        const { hits, totalHits } = await getGalleryImages(
          searchQuery,
          currentPage,
          imagePerPage
        );

        setImages(prevImages => [...prevImages, ...hits]);
        setShowloadMore(currentPage < Math.ceil(totalHits / imagePerPage));

        if (currentPage === 1) {
          toast.success(`Found ${totalHits} images`, {
            duration: 1000,
            icon: '👏',
            style: {
              backgroundColor: '#3f51b5',
              color: '#fff',
            },
          });
        }
      } catch (error) {
        toast.error(`${error.message}`);
      } finally {
        setLoading(false);
      }
    };

  }, [currentPage, searchQuery]);

  useEffect(() => {
    if (images) {
      if (currentPage === 1) return;
      const list = listRef.current;
      scroll.scrollTo(list.scrollHeight - list.scrollTop);
    }
  }, [images, currentPage]);
    
  const handlerSearch = inputValue => {
    if (inputValue === '') {
      toast.success('Start by typing a word into the search', {
        duration: 2000,
        icon: '🙌',
        style: {
          backgroundColor: '#a56403',
          color: '#fff',
        },
      });
      return;
    }

    if (searchQuery === inputValue) {
      toast.success(
        `You have already searched for "${inputValue}", enter another word in the search`,
        {
          duration: 2000,
          icon: '👌',
          style: {
            backgroundColor: '#5f3a02',
            color: '#fff',
          },
        }
      );
      return;
    }
    setImages([]);
    setSearchQuery(inputValue);
    setCurrentPage(1);
  };

  const handlerLoadMore = () => setCurrentPage(prevPage => prevPage + 1);

  const handlerImage = (src, alt) => {
    setShowModal(true);
    setShowImageModal ({ src, alt });
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <AppWrap>
      <Toaster />
      <Searchbar onSubmit={handlerSearch} />
      {images && (
        <ImageGallery
          images={images}
          onClickImage={handlerImage}
          listRef={listRef}
        />
      )}
      {loading && <Loader />}
      {showloadMore && <Button onClick={handlerLoadMore} />}
      {showModal && (
        <Modal
          src={showImageModal.src}
          alt={showImageModal.alt}
          onClose={toggleModal}
        />
      )}
    </AppWrap>
  );
};
export default App;