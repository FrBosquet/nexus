import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from '../Common/Icon';
import { fromTheme } from '../../utils/styled';

const SearchBar = ({ className, value, onChange }) => (
  <section className={className}>
    <input type="text" value={value} onChange={onChange} />
    <Icon>search</Icon>
  </section>
);

SearchBar.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

SearchBar.defaultProps = {
  className: '',
};

export default styled(SearchBar)`
  position: fixed;
  top: 2.5rem;
  width: 100%;
  z-index: 100;

  i {
    color: ${fromTheme('--color-main')};
    position: absolute;
    right: 1rem;
  }

  input {
    width: 100%;
    padding: 0.5rem;
    border: none;
    border-bottom: 1px solid ${fromTheme('--color-secondary')};

    &:focus {
      outline: none;
      border-bottom: 1px solid ${fromTheme('--color-main')};
    }
  }

  @media (${fromTheme('--screen-medium')}) {
    width: 32rem;

    i {
      left: 29rem;
    }
  }
`;
