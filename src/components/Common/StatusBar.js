import React from 'react';
import { rgba } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Icon from './Icon';

const StatusBar = ({ className }) => (
  <header className={className}>
    <Icon>signal_cellular_alt</Icon>
    movistar
    <Icon>battery_full</Icon>
  </header>
);

StatusBar.defaultProps = {
  className: '',
};

StatusBar.propTypes = {
  className: PropTypes.string,
};

export default styled(StatusBar)`
  background-color: ${props => rgba(props.theme['--color-main'], 0.9)};
  color: ${props => props.theme['--color-light']};
  height: 2.5rem;
  padding: 0 0.4rem;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;

  ${Icon} {
    color: ${props => props.theme['--color-light']};
    margin-right: 0.4rem;
    vertical-align: bottom;

    &:last-of-type {
      position: absolute;
      right: 0.4rem;
      transform: rotate(90deg);
    }
  }
`;
