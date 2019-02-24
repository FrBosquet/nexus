import React, { Component } from 'react';
import { rgba } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Icon from '../Common/Icon';
import Link from '../Common/Link';
import Spinner from '../Common/Spinner';

import ContactCard from './ContactCard';

import Contacts from '../../services/contacts';
import { fromTheme } from '../../utils/styled';

const Container = styled('section')``;
const Header = styled('header')``;

class ContactDetails extends Component {
  static defaultProps = {
    className: '',
  };

  static propTypes = {
    className: PropTypes.string,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  state = {
    contact: null,
  };

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    this.refreshContact(id);
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: { id: currentId },
      },
    } = this.props;
    const {
      match: {
        params: { id: prevId },
      },
    } = prevProps;

    if (currentId !== prevId) this.refreshContact(currentId);
  }

  async refreshContact(id) {
    this.setState({ contact: null });
    const contact = await Contacts.read(id);
    this.setState({ contact });
  }

  render() {
    const { className } = this.props;
    const { contact } = this.state;

    return (
      <article className={className}>
        <Header>
          <Link to="/">
            <Icon>arrow_back_ios</Icon>
          </Link>
        </Header>
        {contact ? (
          <ContactCard {...contact} />
        ) : (
          <Container>
            <Spinner />
          </Container>
        )}
      </article>
    );
  }
}

export default styled(ContactDetails)`
  background: ${fromTheme('--color-light')};
  height: calc(100% - 2.5rem);
  position: fixed;
  top: 2.5rem;
  width: 100%;
  z-index: 101;
  //
  ${Header} {
    position: absolute;

    ${fromTheme('--font-extra-large')};
    align-items: center;
    display: flex;
    height: 5rem;
    justify-content: center;
    text-align: center;

    ${Icon} {
      height: 5rem;
      left: 0;
      line-height: 5rem;
      position: absolute;
      top: 0;
      width: 5rem;
    }
  }

  ${Container} {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (${fromTheme('--screen-medium')}) {
    border-left: 1px solid ${props => rgba(props.theme['--color-dark'], 0.1)};
    left: 32rem;
    width: calc(100% - 32rem);

    ${Header} {
      position: relative;
    }
  }
`;
