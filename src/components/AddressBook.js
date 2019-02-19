import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ContactList from './ContactList';
import Layout from './Common/Layout';
import StatusBar from './Common/StatusBar';

import Contacts from '../services/contacts';

class AddressBook extends Layout {
  static propTypes = {
    ...Layout.propTypes,
    className: PropTypes.string,
  };

  state = { contacts: [] };

  async componentDidMount() {
    this.setState({ contacts: await Contacts.read() });
  }

  render() {
    const { className } = this.props;
    const { contacts } = this.state;

    const element = super.render();

    if (!element) {
      return null;
    }

    return (
      <main className={className}>
        <StatusBar />
        <ContactList items={contacts} />
        {element}
      </main>
    );
  }
}

export default styled(AddressBook)``;
