import React from 'react';
import { matchPath, Switch } from 'react-router-dom';

export class Layout extends Switch {
  static propTypes = Switch.propTypes;

  match(children, route) {
    const location = this.props.location || route.location;

    return React.Children.toArray(children).reduce((result, element) => {
      if (!result && React.isValidElement(element)) {
        if (element.type.name === 'Route') {
          const {
            path: pathProp,
            exact,
            from,
            sensitive,
            strict,
          } = element.props;
          const path = pathProp || from;

          const isMatch = path
            ? matchPath(location.pathname, { path, exact, strict, sensitive })
            : route.match;

          return isMatch && element;
        }

        return this.match(element.props.children, route) && element;
      }

      return result;
    }, null);
  }

  render() {
    const { route } = this.context.router;
    const { children } = this.props;

    return this.match(children, route);
  }
}

export default Layout;
