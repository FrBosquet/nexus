import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from './Icon';
import { fromTheme } from '../../utils/styled';

const RoundButton = ({ className, icon, onClick }) => (
  <button type="button" className={className} onClick={onClick}>
    <Icon>{icon}</Icon>
  </button>
);

RoundButton.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

RoundButton.defaultProps = {
  className: '',
  icon: 'edit',
};

export default styled(RoundButton)`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: none;
  color: white;
  background-color: ${fromTheme('--color-primary')}
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:focus{
    outline: none;
  }
`;
