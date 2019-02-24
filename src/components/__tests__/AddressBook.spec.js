import React from 'react';
import { Route } from 'react-router-dom';
import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
} from 'react-testing-library';
import Empty from '../Common/Empty';

import AddressBook from '../AddressBook';
import withProvider from '../../utils/hocs';

import Contacts from '../../services/contacts';

jest.mock('../../services/contacts');
global.window.scrollTo = () => null;

describe('Address Book', () => {
  const Enhanced = withProvider(() => (
    <AddressBook>
      <Route component={() => <Empty />} />
    </AddressBook>
  ));
  const contacts = [
    {
      picture: { thumbnail: '' },
      name: { first: 'Adrian', last: 'de la Rosa' },
      id: '0',
    },
    {
      picture: { thumbnail: '' },
      name: { first: 'Marta', last: 'Fonda' },
      id: '1',
    },
    {
      picture: { thumbnail: '' },
      name: { first: 'Mikel', last: 'Rumayor' },
      id: '2',
    },
  ];

  beforeEach(() => {
    Contacts.read.mockReturnValue(Promise.resolve(contacts));
  });

  afterEach(() => {
    cleanup();
  });

  it('renders by default', () => {
    const { container } = render(<Enhanced />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('calls Contact.read on mount', () => {
    render(<Enhanced />);
    expect(Contacts.read).toHaveBeenCalled();
  });

  it('renders a card for each contact', async () => {
    const { getByText } = render(<Enhanced />);
    await waitForElement(() => getByText('Marta Fonda'));
    expect(getByText('Adrian de la Rosa')).toBeDefined();
    expect(getByText('Marta Fonda')).toBeDefined();
    expect(getByText('Mikel Rumayor')).toBeDefined();
  });

  it('renders a header for each initial letter', async () => {
    const { getByText } = render(<Enhanced />);
    await waitForElement(() => getByText('Marta Fonda'));
    expect(getByText('A')).toBeDefined();
    expect(getByText('M')).toBeDefined();
  });

  it('scrolls to a heading when clicking on it', async () => {
    const { getByText } = render(<Enhanced />);
    await waitForElement(() => getByText('Marta Fonda'));
    const spy = jest.spyOn(global.window, 'scrollTo');
    getByText('A').click();
    expect(spy).toHaveBeenCalled();
  });

  it('filters the list when typing on the search bar', async () => {
    const { getByTestId, getByText } = render(<Enhanced />);
    await waitForElement(() => getByText('Marta Fonda'));
    const input = getByTestId('input');
    fireEvent.change(input, { target: { value: 'Marta' } });
    expect(() => getByText('Mikel Rumayor')).toThrow();
    expect(() => getByText('Adrian de la Rosa')).toThrow();
  });
});
