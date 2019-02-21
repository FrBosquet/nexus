import React from 'react';
import Router from '../Common/Router';
import Theme from '../Theme';

const withProvider = Component => props => (
  <Router>
    <Theme>
      <Component {...props} />
    </Theme>
  </Router>
);

export default withProvider;
