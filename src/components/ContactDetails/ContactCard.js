import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import RoundButton from '../Common/RoundButton';

import CardSection from './CardSection';
import CardHeader from './CardHeader';
import CardOptions from './CardOptions';
import { fromTheme } from '../../utils/styled';

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
  handleEdit,
}) => (
  <article className={className}>
    <CardHeader name={`${first} ${last}`} picture={picture} />
    <CardSection icon="phone">
      {cell && (
        <Fragment>
          <SectionTitle>{cell}</SectionTitle>
          <SectionSubtitle>Cell</SectionSubtitle>
        </Fragment>
      )}
      {phone && (
        <Fragment>
          <SectionTitle>{phone}</SectionTitle>
          <SectionSubtitle>Home</SectionSubtitle>
        </Fragment>
      )}
    </CardSection>
    <CardSection icon="email">
      <SectionTitle>{email}</SectionTitle>
      <SectionSubtitle>Personal</SectionSubtitle>
    </CardSection>
    <CardSection icon="home">
      <SectionTitle>{`${street}, ${postcode} ${city}`}</SectionTitle>
      <SectionSubtitle>Home</SectionSubtitle>
    </CardSection>
    <CardOptions>
      <RoundButton onClick={handleEdit} icon="edit" />
    </CardOptions>
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
  handleEdit: PropTypes.func.isRequired,
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

  @media (${fromTheme('--screen-medium')}) {
    border: 1px solid ${fromTheme('--color-primary')};
    box-shadow: 0px 0px 50px 0px ${fromTheme('--color-dark')};
    margin: auto;
    width: 46rem;
  }
`;
