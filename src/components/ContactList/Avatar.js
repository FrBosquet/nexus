import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Image = styled('img')``;

export const Avatar = ({ className, image, name }) => (
  <figure className={className}>
    <Image
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
      alt={name}
      style={{ backgroundImage: `url('${image}')` }}
    />
  </figure>
);

Avatar.defaultProps = {
  className: '',
};

Avatar.propTypes = {
  className: PropTypes.string,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default styled(Avatar)`
  border-radius: 0.4rem;
  height: 4rem;
  overflow: hidden;
  width: 4rem;

  ${Image} {
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
  }
`;
