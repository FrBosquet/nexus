import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { fromTheme } from '../../utils/styled';

const ItemsBar = styled('div')``;
const Item = styled('span')``;

const ListIndex = ({ className, items, handleSelect }) => {
  if (!items.length) return null;

  return (
    <nav className={className}>
      <ItemsBar>
        {items.map(({ header }) => (
          <Item key={header} onClick={handleSelect}>
            {header}
          </Item>
        ))}
      </ItemsBar>
    </nav>
  );
};

ListIndex.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string,
    }),
  ).isRequired,
  handleSelect: PropTypes.func.isRequired,
};

ListIndex.defaultProps = {
  className: '',
};

export default styled(ListIndex)`
  top: 0;
  position: fixed;
  width: 100%;
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  pointer-events: none;

  ${ItemsBar} {
    pointer-events: all;
    z-index: 100;
    background-color: ${fromTheme('--color-main')};
    color: white;
    border-radius: 1.5rem 0 0 1.5rem;
    padding: 0.5rem;

    ${Item} {
      display: block;
      text-align: center;
      text-transform: capitalize;
      cursor: pointer;
      transition: font-weight 0.3s;

      &:hover {
        font-weight: 600;
      }
    }
  }

  @media (${fromTheme('--screen-medium')}) {
    width: 32rem;
  }
`;
