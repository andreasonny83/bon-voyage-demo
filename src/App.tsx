import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Search } from './components/Search';
import { ShowRecords } from './components/ShowRecords';

export const App = () => {
  const [query, setQuery] = useState<string>();

  const handleSearch = useCallback((input: string) => {
    setQuery(input);
  }, []);

  return (
    <div className="App">
      <Header />
      <Search onChange={handleSearch} />
      <ShowRecords query={query} />
    </div>
  );
};
