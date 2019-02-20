import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Image = styled('img')``;
const CardTitle = styled('h2')``;
const Section = styled('section')``;
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
    <Image src={picture} />
    <CardTitle>{`${first} ${last}`}</CardTitle>
    <Section>
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
    </Section>
    <Section>
      <SectionItem>
        <SectionTitle>{email}</SectionTitle>
        <SectionSubtitle>Personal</SectionSubtitle>
      </SectionItem>
    </Section>
    <Section>
      <SectionItem>
        <SectionTitle>{`${street}, ${postcode} ${city}`}</SectionTitle>
        <SectionSubtitle>Home</SectionSubtitle>
      </SectionItem>
    </Section>
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
    postcode: PropTypes.string,
    city: PropTypes.string,
  }).isRequired,
};

ContactCard.defaultProps = {
  className: '',
  phone: '',
  email: '',
};

export default styled(ContactCard)`
  border: 1px solid black;
  box-shadow: 0px 0px 50px 0px black;
  margin: auto;
  width: 460px;
`;
