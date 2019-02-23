import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CardSection from './CardSection';

const Header = styled('div')``;
const HeaderImage = styled('img')``;
const HeaderTitle = styled('h1')``;
const SectionItem = styled('div')``;
const SectionTitle = styled('h4')``;
const SectionSubtitle = styled('h5')``;

const ContactCard = ({
  className,
  name: { first, last },
  picture: { large: picture },
  phone,
  cell,
  email,
  location: { street, postcode, city },
}) => (
  <article className={className}>
    <Header>
      <HeaderTitle>{`${first} ${last}`}</HeaderTitle>
      <HeaderImage src={picture} />
    </Header>
    <CardSection icon="phone">
      {cell && (
        <SectionItem>
          <SectionTitle>{cell}</SectionTitle>
          <SectionSubtitle>Cell</SectionSubtitle>
        </SectionItem>
      )}
      {phone && (
        <SectionItem>
          <SectionTitle>{phone}</SectionTitle>
          <SectionSubtitle>Home</SectionSubtitle>
        </SectionItem>
      )}
    </CardSection>
    <CardSection icon="email">
      <SectionItem>
        <SectionTitle>{email}</SectionTitle>
        <SectionSubtitle>Personal</SectionSubtitle>
      </SectionItem>
    </CardSection>
    <CardSection icon="home">
      <SectionItem>
        <SectionTitle>{`${street}, ${postcode} ${city}`}</SectionTitle>
        <SectionSubtitle>Home</SectionSubtitle>
      </SectionItem>
    </CardSection>
  </article>
);

ContactCard.propTypes = {
  className: PropTypes.string,
  name: PropTypes.shape({
    first: PropTypes.string.isRequired,
    last: PropTypes.string,
  }).isRequired,
  picture: PropTypes.shape({
    large: PropTypes.string.isRequired,
  }).isRequired,
  phone: PropTypes.string,
  cell: PropTypes.string.isRequired,
  email: PropTypes.string,
  location: PropTypes.shape({
    street: PropTypes.string,
    postcode: PropTypes.number,
    city: PropTypes.string,
  }).isRequired,
};

ContactCard.defaultProps = {
  className: '',
  phone: '',
  email: '',
};

export default styled(ContactCard)`
  width: 100%;

  animation-name: fade;
  animation-duration: 0.5s;

  z-index: 101;

  ${Header} {
    ${HeaderImage} {
      border-bottom: 1px solid ${props => props.theme['--color-primary']};
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
  }

  ${CardSection} {
    ${SectionTitle} {
      color: ${props => props.theme['--color-primary']};
      text-align: right;
    }

    ${SectionSubtitle} {
      color: ${props => props.theme['--color-secondary']};
      text-align: right;
    }

    &:not(:last-child) {
      border-bottom: 1px solid ${props => props.theme['--color-secondary']};
    }
  }

  @keyframes fade {
    from {
      opacity: 0;
      transform: translateY(100px);
    }

    to {
      opacity: 100;
      transform: translateY(0px);
    }
  }

  @media (${props => props.theme['--screen-medium']}) {
    border: 1px solid ${props => props.theme['--color-primary']};
    box-shadow: 0px 0px 50px 0px ${props => props.theme['--color-dark']};
    margin: auto;
    width: 46rem;

    ${Header} {
      ${HeaderImage} {
        height: 15rem;
      }

      ${HeaderTitle} {
        margin-top: 10rem;
      }
    }
  }
`;
