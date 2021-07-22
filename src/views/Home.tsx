import React, { useState, useCallback } from 'react';
import { Search } from '../components/Search';
import { ShowRecords } from '../components/ShowRecords';
import { SearchInput } from '../types';

export const Home = () => {
  const [query, setQuery] = useState<SearchInput>();

  const handleSearch = useCallback((input: SearchInput) => {
    setQuery(input);
  }, []);

  return (
    <div className="Home">
      <Search onChange={handleSearch} />
      <ShowRecords query={query} />
    </div>
  );
};
