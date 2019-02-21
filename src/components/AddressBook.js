import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ContactList from './ContactList';
import SearchBar from './ContactList/SearchBar';
import Layout from './Common/Layout';
import StatusBar from './Common/StatusBar';

import Contacts from '../services/contacts';

class AddressBook extends Layout {
  static propTypes = {
    ...Layout.propTypes,
    className: PropTypes.string,
  };

  state = { contacts: [], filter: '' };

  async componentDidMount() {
    this.setState({ contacts: await Contacts.read() });
  }

  getFilteredList() {
    const { contacts, filter } = this.state;
    const regexp = new RegExp(filter, 'i');

    return contacts.filter(({ name: { first, last } }) =>
      regexp.test(`${first} ${last}`),
    );
  }

  updateFilter = e => this.setState({ filter: e.target.value });

  render() {
    const { className } = this.props;
    const { filter } = this.state;
    const contacts = this.getFilteredList();
    const element = super.render();

    if (!element) {
      return null;
    }

    return (
      <main className={className}>
        <StatusBar />
        <SearchBar value={filter} onChange={this.updateFilter} />
        <ContactList items={contacts} />
        {element}
      </main>
    );
  }
}

export default styled(AddressBook)`
  padding-top: 5rem;
`;
