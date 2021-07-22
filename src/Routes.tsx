import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Details } from './views/Details';
import { Home } from './views/Home';
import { NotFound } from './views/NotFound';

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/details/:hotelId">
        <Details />
      </Route>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  </BrowserRouter>
);
