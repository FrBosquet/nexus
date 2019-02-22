import React from 'react';
import PropTypes from 'prop-types';
import Contact from './Contact';
import ListHeader from './ListHeader';

const MaybeContact = props => {
  const { header } = props;
  return header ? <ListHeader {...props} /> : <Contact {...props} />;
};

MaybeContact.propTypes = {
  header: PropTypes.string,
};

MaybeContact.defaultProps = {
  header: null,
};

export default MaybeContact;
