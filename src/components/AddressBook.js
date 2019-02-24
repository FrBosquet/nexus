import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ContactList from './ContactList';
import SearchBar from './ContactList/SearchBar';
import Layout from './Common/Layout';

import Contacts from '../services/contacts';
import ListIndex from './ContactList/ListIndex';

import { getInitial } from '../utils/string';
import { getLast } from '../utils/array';

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

    return contacts
      .filter(({ name: { first, last } }) => regexp.test(`${first} ${last}`))
      .reduce((acc, contact, _, arr) => {
        // No contacts, no headers
        if (arr.length === 0) {
          return acc;
        }

        // First header with first contact initial
        if (acc.length === 0) {
          const header = getInitial(arr[0]);
          return [{ header }, contact];
        }

        // On contact initial change, add header for the last one initial
        const lastInitial = getInitial(getLast(acc));
        const currentInitial = getInitial(contact);
        if (lastInitial !== currentInitial) {
          return [...acc, { header: currentInitial }, contact];
        }

        // Base case, no header
        return [...acc, contact];
      }, []);
  }

  getHeaderElements = () =>
    Array.from(document.querySelectorAll('div[data-header]')).map(element => ({
      header: element.innerText,
      top: element.parentElement.offsetTop - 60,
    }));

  handleSelectHeader = e => {
    const { innerText: target } = e.target;
    const headerElements = this.getHeaderElements();
    const { top } = headerElements.find(({ header }) => header === target);
    window.scrollTo({ top, behavior: 'smooth' });
  };

  updateFilter = e => this.setState({ filter: e.target.value });

  render() {
    const { className } = this.props;
    const { filter } = this.state;
    const listItems = this.getFilteredList();
    const headers = listItems.filter(item => item.header);
    const element = super.render();

    if (!element) {
      return null;
    }

    return (
      <main className={className}>
        <SearchBar value={filter} onChange={this.updateFilter} />
        <ListIndex items={headers} handleSelect={this.handleSelectHeader} />
        <ContactList items={listItems} />
        {element}
      </main>
    );
  }
}

export default styled(AddressBook)`
  padding-top: 2.5rem;
`;
