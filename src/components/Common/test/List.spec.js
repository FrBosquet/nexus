import React from 'react';
import { render } from 'react-testing-library';

import { List } from '../List';

describe('<List />', () => {
  it('renders by default', () => {
    const { container } = render(<List />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
