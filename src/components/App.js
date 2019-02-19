import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Route } from 'react-router-dom';

import AddressBook from './AddressBook';
import ContactDetails from './ContactDetails';
import Empty from './Common/Empty';
import Router from './Common/Router';
import Theme from './Theme';

const App = () => (
  <Router>
    <Theme>
      <AddressBook>
        <Route path="/:id" component={ContactDetails} />
        <Route component={Empty} />
      </AddressBook>
    </Theme>
  </Router>
);

export default hot(App);
