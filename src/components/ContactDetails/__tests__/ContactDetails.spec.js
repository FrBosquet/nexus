import React from 'react';
import { render, cleanup, waitForElement } from 'react-testing-library';

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

  it('renders a Spinner while waiting from service data', () => {
    const { getByTestId } = render(<Enhanced {...props} />);
    expect(getByTestId('spinner')).toBeDefined();
  });

  it('renders a ContactCard with the provided contact data', async () => {
    Contact.read.mockReturnValueOnce({
      name: { first: 'Fran', last: 'Bosquet' },
      picture: { large: 'url' },
      cell: '555-555-555',
      location: { street: 'Fake Street 123' },
    });
    const { getByText } = render(<Enhanced {...props} />);
    await waitForElement(() => getByText('Fran Bosquet'));
    expect(getByText('Fran Bosquet')).toBeDefined();
  });
});
