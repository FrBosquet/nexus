import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CardOptions = ({ className, children }) => (
  <div className={className}>{children}</div>
);

CardOptions.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

CardOptions.defaultProps = {
  className: '',
  children: null,
};

export default styled(CardOptions)`
  padding: 2rem;
  display: flex;
  justify-content: flex-end;

  *:not(:last-child) {
    margin-right: 1rem;
  }
`;
