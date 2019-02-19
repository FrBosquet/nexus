import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter } from 'react-router-dom';

const Router = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;

Router.defaultProps = {
  children: null,
};

Router.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Router;
