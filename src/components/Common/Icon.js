import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Icon = ({ children, className }) => (
  <i className={cx(className, 'material-icons')}>{children}</i>
);

Icon.defaultProps = {
  className: '',
};

Icon.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default styled(Icon)``;
