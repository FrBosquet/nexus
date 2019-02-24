import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import RoundButton from '../Common/RoundButton';

import CardSection from './CardSection';
import { fromTheme } from '../../utils/styled';
import CardHeader from './CardHeader';
import CardOptions from './CardOptions';

const SectionSubtitle = styled('h5')``;
const Input = styled('input')``;

class ContactEditor extends Component {
  static propTypes = {
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
    handleSave: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
  };

  static defaultProps = {
    className: '',
    phone: '',
    email: '',
  };

  constructor(props) {
    super(props);
    const {
      name: { first, last },
      picture: { large: picture },
      phone,
      cell,
      email,
      location: { street, postcode, city },
    } = props;

    this.state = {
      firstName: first,
      lastName: last,
      picture,
      phone,
      cell,
      email,
      street,
      postcode,
      city,
    };
  }

  makeHandleOnChange = field => event =>
    this.setState({ [field]: event.target.value });

  onSave = () => {
    const { handleClose, handleSave } = this.props;
    handleSave(this.state);
    handleClose();
  };

  render() {
    const { className, handleClose } = this.props;
    const {
      firstName,
      lastName,
      picture,
      phone,
      cell,
      email,
      street,
      postcode,
      city,
    } = this.state;

    const { makeHandleOnChange } = this;
    return (
      <article className={className}>
        <CardHeader name={`${firstName} ${lastName}`} picture={picture} />
        <CardSection icon="person">
          <Input onChange={makeHandleOnChange('firstName')} value={firstName} />
          <SectionSubtitle>First name</SectionSubtitle>
          <Input onChange={makeHandleOnChange('lastName')} value={lastName} />
          <SectionSubtitle>Last name</SectionSubtitle>
          <Input onChange={makeHandleOnChange('picture')} value={picture} />
          <SectionSubtitle>Picture url</SectionSubtitle>
        </CardSection>
        <CardSection icon="phone">
          <Input onChange={makeHandleOnChange('cell')} value={cell} />
          <SectionSubtitle>Cell</SectionSubtitle>
          <Input onChange={makeHandleOnChange('phone')} value={phone} />
          <SectionSubtitle>Phone</SectionSubtitle>
        </CardSection>
        <CardSection icon="email">
          <Input onChange={makeHandleOnChange('email')} value={email} />
          <SectionSubtitle>email</SectionSubtitle>
        </CardSection>
        <CardSection icon="home">
          <Input onChange={makeHandleOnChange('street')} value={street} />
          <SectionSubtitle>Street</SectionSubtitle>
          <Input
            onChange={makeHandleOnChange('postcode')}
            type="number"
            value={postcode}
          />
          <SectionSubtitle>Postcode</SectionSubtitle>
          <Input onChange={makeHandleOnChange('city')} value={city} />
          <SectionSubtitle>City</SectionSubtitle>
        </CardSection>
        <CardOptions>
          <RoundButton onClick={this.onSave} icon="save" />
          <RoundButton onClick={handleClose} icon="close" />
        </CardOptions>
      </article>
    );
  }
}

export default styled(ContactEditor)`
  width: 100%;

  animation-name: fade;
  animation-duration: 0.5s;

  z-index: 101;

  ${CardSection} {
    ${Input} {
      color: ${fromTheme('--color-primary')};
      text-align: right;
      width: 100%;
      border: none;
      border-bottom: 1px solid ${fromTheme('--color-blueish-white')};
      transition: padding 0.5s;
      font-weight: 800;

      &:focus {
        padding: 0.5rem;
        outline: none;
        color: ${fromTheme('--color-main')};
        border-bottom: 1px solid ${fromTheme('--color-main')};
      }
    }

    &:not(:last-child) {
      border-bottom: 1px solid ${fromTheme('--color-secondary')};
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

  @media (${fromTheme('--screen-medium')}) {
    border: 1px solid ${fromTheme('--color-primary')};
    box-shadow: 0px 0px 50px 0px ${fromTheme('--color-dark')};
    margin: auto;
    width: 46rem;
  }
`;
