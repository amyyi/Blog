import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';

import {signout} from 'redux/modules/auth';
import Dropdown from './Dropdown';

@connect(
  state => ({
    account: state.account,
  }), {
    signout,
  }
)

export default class Head extends Component {

  static propTypes = {
    account: ImmutablePropTypes.map.isRequired,
    signout: PropTypes.func.isRequired,
    showProfile: PropTypes.func.isRequired,
    onClickOutsideCallback: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this._showProfile = this._showProfile.bind(this);
    this._logOut = this._logOut.bind(this);

  }

  _showProfile() {
    this.props.showProfile();
  }

  _logOut() {
    this.props.signout();
  }

  render() {
    const {account} = this.props;

    return (
      <div className="head-div">
        <h1 className="title">BLOG</h1>
        <Dropdown
          account={account}
          showProfile={this._showProfile}
          logOut={this._logOut}
        />

      </div>
    );
  }
}

