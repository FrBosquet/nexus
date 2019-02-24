import React, { Component } from 'react';
import { rgba } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Icon from '../Common/Icon';
import Link from '../Common/Link';
import Spinner from '../Common/Spinner';

import ContactCard from './ContactCard';
import ContactEditor from './ContactEditor';

import Contacts from '../../services/contacts';
import { fromTheme } from '../../utils/styled';

const Container = styled('section')``;
const Header = styled('header')``;

class ContactDetails extends Component {
  static defaultProps = {
    className: '',
  };

  static propTypes = {
    className: PropTypes.string,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  state = {
    contact: null,
    editing: false,
    saving: false,
  };

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    this.refreshContact(id);
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: { id: currentId },
      },
    } = this.props;
    const {
      match: {
        params: { id: prevId },
      },
    } = prevProps;

    if (currentId !== prevId) this.refreshContact(currentId);
  }

  renderChild = () => {
    const { contact, editing, saving } = this.state;

    if (!contact || saving)
      return (
        <Container>
          <Spinner />
        </Container>
      );

    if (editing)
      return (
        <ContactEditor
          {...contact}
          handleClose={this.stopEditing}
          handleSave={this.handleSave}
        />
      );

    return <ContactCard {...contact} handleEdit={this.startEditing} />;
  };

  handleSave = async ({
    firstName,
    lastName,
    picture,
    cell,
    phone,
    email,
    street,
    postcode,
    city,
  }) => {
    this.setState({ saving: true });
    const { contact } = this.state;
    const { id } = contact;
    const updatedContact = {
      ...contact,
      name: {
        first: firstName,
        last: lastName,
      },
      picture: {
        ...contact.picture,
        large: picture,
      },
      phone,
      cell,
      email,
      location: { street, postcode: parseInt(postcode, 10), city },
    };

    await Contacts.update(id, updatedContact);
    await this.refreshContact(id);
  };

  startEditing = () => this.setState({ editing: true });

  stopEditing = () => this.setState({ editing: false });

  async refreshContact(id) {
    this.setState({ contact: null });
    const contact = await Contacts.read(id);
    this.setState({ contact, saving: false });
  }

  render() {
    const { className } = this.props;

    return (
      <article className={className}>
        <Header>
          <Link to="/">
            <Icon>arrow_back_ios</Icon>
          </Link>
        </Header>
        {this.renderChild()}
      </article>
    );
  }
}

export default styled(ContactDetails)`
  background: ${fromTheme('--color-light')};
  height: calc(100% - 2.5rem);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 101;
  //
  ${Header} {
    position: absolute;

    ${fromTheme('--font-extra-large')};
    align-items: center;
    display: flex;
    height: 5rem;
    justify-content: center;
    text-align: center;

    ${Icon} {
      height: 5rem;
      color: ${fromTheme('--color-light')};
      text-shadow: 1px 1px black;
      left: 0;
      line-height: 5rem;
      position: absolute;
      top: 0;
      width: 5rem;
    }
  }

  ${Container} {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (${fromTheme('--screen-medium')}) {
    border-left: 1px solid ${props => rgba(props.theme['--color-dark'], 0.1)};
    left: 32rem;
    width: calc(100% - 32rem);

    ${Header} {
      position: relative;
    }

    ${Header} ${Icon} {
      text-shadow: none;
      color: black;
    }
  }
`;
