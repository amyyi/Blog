import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import NotificationSystem from 'react-notification-system';
import {isSignin} from 'redux/modules/auth';
import {getAccountInfo} from 'redux/modules/account';

import {
  Head,
} from 'components';
import createNotification from 'helpers/createNotification';

// bundle後該reduce內容有更新才會更新此component
@connect(
  state => ({
    auth: state.auth,
  }), {
    isSignin,
    getAccountInfo,
  }
)

export default class App extends Component {

  static propTypes = {
    children: PropTypes.any,
    auth: ImmutablePropTypes.map.isRequired,
    isSignin: PropTypes.func.isRequired,
    getAccountInfo: PropTypes.func,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  static childContextTypes = {
    globalFromApp: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.addNotification = this.addNotification.bind(this);

    this.globalFromApp = {
      addNotification: this.addNotification,
    };
  }

  getChildContext() {
    return {
      globalFromApp: this.globalFromApp,
    };
  }

  componentDidMount() {
    this.notificationSystem = this.notificationSystem;
  }

  // notification
  addNotification(type, msg, autoDismiss, position) {
    const notification = createNotification(type, msg, autoDismiss, position);
    return this.notificationSystem.addNotification(notification);
  }

  render() {
    return (
      <div className="app">

        {/* global component */}
        <NotificationSystem ref={(c) => { this.notificationSystem = c; }} allowHTML />
        {this.props.children}
      </div>
    );
  }
}

