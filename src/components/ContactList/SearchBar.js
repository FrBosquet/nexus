import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from '../Common/Icon';

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
  i {
    color: ${props => props.theme['--color-main']};
    position: absolute;
    top: 2.5rem;
    right: 1rem;
  }

  input {
    position: fixed;
    top: 2.5rem;
    width: 100%;
    padding: 0.5rem;
    border: none;
    border-bottom: 1px solid ${props => props.theme['--color-secondary']};

    &:focus {
      outline: none;
      border-bottom: 1px solid ${props => props.theme['--color-main']};
    }
  }

  @media (${props => props.theme['--screen-medium']}) {
    i {
      left: 29rem;
    }

    input {
      width: 32rem;
    }
  }
`;