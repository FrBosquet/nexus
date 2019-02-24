import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import MaybeContact from './MaybeContact';
import List from '../Common/List';
import { fromTheme } from '../../utils/styled';

const ContactList = ({ className, items }) => (
  <List className={className} items={items} template={MaybeContact} />
);

ContactList.defaultProps = {
  className: '',
  items: [],
};

ContactList.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.any),
};

export default styled(ContactList)`
  margin-top: 1.2rem;
  list-style: none;

  @media (${fromTheme('--screen-medium')}) {
    width: 32rem;
  }
`;
