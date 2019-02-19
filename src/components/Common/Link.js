import React from 'react';
import { Link as Anchor } from 'react-router-dom';
import PropTypes from 'prop-types';

const Link = ({ children, className, ...props }) => (
  <Anchor className={className} {...props}>
    {children}
  </Anchor>
);

Link.defaultProps = {
  className: '',
  children: null,
};

Link.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Link;
