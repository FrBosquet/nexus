import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ListHeader = ({ className, header }) => (
  <div className={className}>
    <span>{header}</span>
  </div>
);

ListHeader.propTypes = {
  header: PropTypes.string.isRequired,
  className: PropTypes.string,
};

ListHeader.defaultProps = {
  className: '',
};

export default styled(ListHeader)`
  position: absolute;

  span {
    background: ${props => props.theme['--color-main']};
    border-radius: 0 50% 50% 0;
    color: white;
    display: block;
    font-weight: 800;
    position: relative;
    text-align: center;
    text-transform: capitalize;
    top: -0.8rem;
    width: 2rem;
  }
`;
