import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Icon from '../Common/Icon';
import { fromTheme } from '../../utils/styled';

const SectionContent = styled('div')``;

const CardSection = ({ className, children, icon }) => (
  <section className={className}>
    <Icon>{icon}</Icon>
    <SectionContent>{children}</SectionContent>
  </section>
);

CardSection.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

CardSection.defaultProps = {
  className: '',
  icon: 'phone',
  children: null,
};

export default styled(CardSection)`
  display: flex;
  flex-direction: row;
  padding: 1rem 0;

  ${Icon} {
    margin: 0 2rem;
    color: ${fromTheme('--color-primary')};
  }

  ${SectionContent} {
    flex-grow: 1;
    padding-right: 2rem;
  }
`;
