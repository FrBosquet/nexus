import React from 'react';
import { rgba } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fromTheme } from '../../utils/styled';

const Empty = ({ className }) => <div className={className} />;

Empty.defaultProps = {
  className: '',
};

Empty.propTypes = {
  className: PropTypes.string,
};

export default styled(Empty)`
  @media (${fromTheme('--screen-medium')}) {
    background: ${fromTheme('--color-light')};
    border-left: 1px solid ${props => rgba(props.theme['--color-dark'], 0.1)};
    height: 100vh;
    left: 32rem;
    position: fixed;
    top: 0;
    width: calc(100% - 32rem);
  }
`;
