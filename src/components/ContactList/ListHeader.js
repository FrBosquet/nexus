import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fromTheme } from '../../utils/styled';

const ListHeader = ({ className, header }) => (
  <div className={className} data-header={header}>
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
    background: ${fromTheme('--color-main')};
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
