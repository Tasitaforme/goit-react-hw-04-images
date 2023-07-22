import PropTypes from 'prop-types'
import React, { useState } from 'react';
import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SearchIcon,
  SearchFormInput,
} from './Searchbar.styled';

  
export const Searchbar = props => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchChange = e => {
    setSearchInput(e.target.value.trim());
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.onSubmit(searchInput);
    setSearchInput('');
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <SearchIcon />
        </SearchFormButton>

        <SearchFormInput
          type="text"
          name="search"
          value={searchInput}
          onChange={handleSearchChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarHeader>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};