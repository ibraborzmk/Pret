// SearchBar.js

import React, { useState } from 'react';
import Recherche from './Recherche';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearch(term); // Appeler la fonction onSearch avec le terme de recherche
    <Recherche />;
    console.log('Recherche:', term);
  };

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={handleChange}
      placeholder="Rechercher..."
    />
  );
}

export default SearchBar;
