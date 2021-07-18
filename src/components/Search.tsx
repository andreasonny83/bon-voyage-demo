import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { SearchBar } from './SearchBar';

const useStyles = makeStyles({
  hero: {
    height: '250px',
  },
  img: {
    width: '100%',
    height: '500px',
    objectFit: 'cover',
  },
  searchWrapper: {
    margin: 'auto',
    width: 'fit-content',
    backgroundColor: 'white',
    position: 'relative',
    top: '-24px',
  },
  searchBar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface SearchProps {
  onChange: (value: string) => void;
}

export const Search = ({ onChange }: SearchProps) => {
  const classes = useStyles();

  return (
    <div className="Search">
      <div className={classes.hero}>
        <img
          className={classes.img}
          src="https://images.unsplash.com/photo-1582719508461-905c673771fd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=50"
          alt="hero"
        />
      </div>
      <Container>
        <div className={classes.searchWrapper}>
          <div className={classes.searchBar}>
            <SearchBar onSearch={onChange} />
          </div>
        </div>
      </Container>
    </div>
  );
};
