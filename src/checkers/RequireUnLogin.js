import {Component, PropTypes} from 'react';
import {isSignin} from 'redux/modules/auth';

export default class RequireUnLogin extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ])
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  componentWillMount() {
    this._checkLogin();
  }

  shouldComponentUpdate() {
    return this._checkLogin();
  }

  _checkLogin() {
    const {router} = this.context;

    if (isSignin()) {
      router.replace('/');
      return false;
    }
    return true;
  }

  render() {
    return (
      this.props.children
    );
  }
}
