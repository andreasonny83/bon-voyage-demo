import React from 'react';
import { Header } from './components/Header';
import { Routes } from './Routes';

export const App = () => {
  return (
    <div className="App">
      <Header />

      <Routes />
    </div>
  );
};
