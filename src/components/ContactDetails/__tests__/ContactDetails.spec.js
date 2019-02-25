import React from 'react';
import { render, cleanup, waitForElement } from 'react-testing-library';

import ContactDetails from '../ContactDetails';
import withProvider from '../../../utils/hocs';

import Contact from '../../../services/contacts';

jest.mock('../../../services/contacts');

describe('Contact details', () => {
  const props = { match: { params: { id: 'id1' } } };
  const response = {
    name: { first: 'Fran', last: 'Bosquet' },
    picture: { large: 'url' },
    cell: '555-555-555',
    location: { street: 'Fake Street 123' },
  };
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
    Contact.read.mockReturnValueOnce(response);
    const { getByText } = render(<Enhanced {...props} />);
    await waitForElement(() => getByText('Fran Bosquet'));
    expect(getByText('Fran Bosquet')).toBeDefined();
  });

  describe('contact editor', () => {
    beforeEach(() => {
      Contact.read.mockReturnValueOnce(response);
    });

    it('renders contact editor', async () => {
      const { getByText, container } = render(<Enhanced {...props} />);
      await waitForElement(() => getByText('Fran Bosquet'));
      getByText('edit').click();
      expect(container).toMatchSnapshot('editor');
      expect(getByText('save')).toBeDefined();
      expect(getByText('close')).toBeDefined();
    });

    it('updates a contact on save', async () => {
      const { getByText, container } = render(<Enhanced {...props} />);
      await waitForElement(() => getByText('Fran Bosquet'));
      getByText('edit').click();
      getByText('save').click();
      expect(Contact.update).toBeCalled();
      expect(container).toMatchSnapshot('detail');
    });

    it('cancels edition', async () => {
      const { getByText, container } = render(<Enhanced {...props} />);
      await waitForElement(() => getByText('Fran Bosquet'));
      getByText('edit').click();
      getByText('close').click();
      expect(getByText('edit')).toBeDefined();
      expect(container).toMatchSnapshot('detail');
    });
  });
});
