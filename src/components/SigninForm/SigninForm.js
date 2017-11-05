import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {Link} from 'react-router';
import { reduxForm, Field } from 'redux-form';

import validation from './validation';
import {ErrorMsg, IconLoading, RenderField } from 'components';

@reduxForm({
  form: 'login',
  validate: validation
})

@connect((state) => {
  return {
    auth: state.auth
  };
})

export default class SigninForm extends Component {

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    auth: ImmutablePropTypes.map.isRequired,
    invalid: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      validLogin: true,
    };
    this._signFormChange = this._signFormChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _signFormChange() {
    const {invalid, submitting} = this.props;
    if (invalid) {
      this.setState({
        validLogin: true,
      });
    } else {
      this.setState({
        validLogin: false,
      });
    }
  }
  _handleSubmit() {
    this.setState({
      validLogin: true,
    });
    this.props.handleSubmit();
  }

  render() {

    const {
      handleSubmit,
      auth,
      invalid,
      submitting
    } = this.props;
    const {validLogin} = this.state;

    return (
      <div className="signbox">

        <ErrorMsg isLoaded={auth.get('signin')} loaderr={auth.get('signinErr')} />

        <form className="signbox-form form" onChange={this._signFormChange} >

          <div className="form-group">
            <i className="fa fa-envelope icon-input"></i>
            <Field
              className="form-input icon-left"
              name="account"
              component={RenderField}
              type="text"
              placeholder="Email"
            />
          </div>

          <div className="form-group">
            <i className="fa fa-key icon-input"></i>
            <Field
              className="form-input icon-left"
              name="password"
              component={RenderField}
              type="password"
              placeholder="Password"
            />
          </div>

          <button
            className={`btn btn-primary signbox-submit`}
            type="submit"
            disabled={validLogin}
            onClick={this._handleSubmit}
          >
            <span className="btn-text">
              Sign in
              <IconLoading isLoading={auth.get('signin')} />
            </span>
          </button>

        </form>

      </div>
    );
  }
}
