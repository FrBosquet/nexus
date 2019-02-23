import React from 'react';
import Router from '../components/Common/Router';
import Theme from '../components/Theme';

const withProvider = Component => props => (
  <Router>
    <Theme>
      <Component {...props} />
    </Theme>
  </Router>
);

export default withProvider;
