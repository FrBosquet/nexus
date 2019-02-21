import React from 'react';
import { render, cleanup } from 'react-testing-library';

import ContactDetails from '../ContactDetails';
import withProvider from '../../testUtils/hocs';

import Contact from '../../../services/contacts';

jest.mock('../../../services/contacts');

describe('Contact details', () => {
  const props = { match: { params: { id: 'id1' } } };
  const Enhanced = withProvider(ContactDetails);

  beforeEach(() => {
    Contact.read.mockClear();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders by default', () => {
    const { container } = render(<Enhanced {...props} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('calls Contact.read on mount', () => {
    render(<Enhanced {...props} />);
    expect(Contact.read).toHaveBeenCalledTimes(1);
    expect(Contact.read).toHaveBeenCalledWith('id1');
  });

  it('calls Contact.read on props change', () => {
    const { rerender } = render(<Enhanced {...props} />);
    const newProps = { match: { params: { id: 'id2' } } };
    rerender(<Enhanced {...newProps} />);
    expect(Contact.read).toHaveBeenCalledTimes(2);
    expect(Contact.read).toHaveBeenCalledWith('id2');
  });

  it('dont call Contact.read on props change when ids are the same', () => {
    const { rerender } = render(<Enhanced {...props} />);
    const newProps = { match: { params: { id: 'id1' } } };
    rerender(<Enhanced {...newProps} />);
    expect(Contact.read).toHaveBeenCalledTimes(1);
  });
});
