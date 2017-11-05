import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {signin} from 'redux/modules/auth';
import {SigninForm} from 'components';

@connect(null, {
  signin,
})

export default class Signin extends Component {

  static propTypes = {
    signin: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(data) {
    this.props.signin(data);
  }

  render() {
    return (
      <div className="sign-in container">
        <div className="sign-container">
          <SigninForm ref="form" onSubmit={this._handleSubmit} />
        </div>
      </div>
    );
  }
}
