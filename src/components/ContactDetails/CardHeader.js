import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fromTheme } from '../../utils/styled';

const HeaderImage = styled('img')``;
const HeaderTitle = styled('h1')``;

const CardHeader = ({ className, name, picture }) => (
  <div className={className}>
    <HeaderTitle>{name}</HeaderTitle>
    <HeaderImage src={picture} />
  </div>
);

CardHeader.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
};

CardHeader.defaultProps = {
  className: '',
};

export default styled(CardHeader)`
  ${HeaderImage} {
    border-bottom: 1px solid ${fromTheme('--color-primary')};
    height: 32rem;
    object-fit: cover;
    width: 100%;
  }

  ${HeaderTitle} {
    color: white;
    padding: 1.5rem;
    position: absolute;
    text-shadow: 1px 1px black;
    margin-top: 26rem;
  }

  @media (${fromTheme('--screen-medium')}) {
    ${HeaderImage} {
      height: 15rem;
    }

    ${HeaderTitle} {
      margin-top: 10rem;
    }
  }
`;
