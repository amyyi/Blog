import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {reduxForm, Field, FieldArray} from 'redux-form';
import {isNameAcceptable} from 'redux/modules/account';

import validation from './validation';
import {createAsyncValidatorStatusChecker} from 'utils/validation';
import {
  IconLoading,
  RenderAssistantField,
  RenderEmail,
  RenderMember,
} from 'components';

@connect((state) => {
  return {
    initialValues: {
      email: state.account.get('blogEmail'),
      name: state.account.getIn(['contentInfo', 0, 'blogName']),
      gender: state.account.getIn(['contentInfo', 0, 'blogGender']),
      members: state.account.get('initial').toJS(),
    },
  };
})

@reduxForm({
  form: 'profileForm',
  enableReinitialize: true,
  asyncValidate: isNameAcceptable,
  asyncBlurFields: ['name'],
  validate: validation,
})

export default class ProfileForm extends Component {

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    asyncValidating: PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.bool,
    ]).isRequired,
    valid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    account: ImmutablePropTypes.map.isRequired,
    onSubmit: PropTypes.func.isRequired,
    show: PropTypes.bool,
    hideProfile: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.nameAsyncChecker = createAsyncValidatorStatusChecker('name');
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hideProfile = this.hideProfile.bind(this);
    this.body = document.body;
  }

  hideProfile() {
    const {body} = this;
    body.className = body.className.replace(/no-scroll/, '');
    this.props.hideProfile();
  }

  handleSubmit() {
    this.props.onSubmit();
  }

  render() {

    const {
      handleSubmit,
      asyncValidating,
      pristine,
      invalid,
      submitting,
      show,
      valid,
    } = this.props;
    const showClass = show ? 'show' : '';
    const disabled = pristine || invalid || !!asyncValidating || submitting; // 因為asyncValidating非false會顯示name，所以要變boolean值
    const loadStatus = submitting;
    const showWarn = typeof asyncValidating === 'string';

    return (
      <div className={`profile-dialog ${showClass}`}>
        <div className="profilebox">
          <button
            type="button"
            className="fa fa-times close-icon"
            type="button"
            onClick={this.hideProfile}
          ></button>
          <form className="signbox-form form">

            <p className="profile-title">Profile</p>

            <Field
              className="form-input icon-left invalid-input"
              name="email"
              component={RenderEmail}
              type="text"
              title="Email"
            />

            <div className="form-group">
              <Field
                className="form-input icon-left"
                name="name"
                component={RenderAssistantField}
                type="text"
                title="Name"
                nameAsyncChecker={this.nameAsyncChecker(asyncValidating, valid)}
              />
            </div>

            <span>Category</span>
            <label><Field name="gender" component="input" type="radio" value="Male" /> Male</label>
            <label><Field name="gender" component="input" type="radio" value="female" /> Female</label>

            <FieldArray name="members" component={RenderMember} />
            {
              showWarn &&
                <span className="error-msg">please wait for name's validation</span>
            }
            <button
              className="btn btn-primary signbox-submit prfofile-top"
              type="submit"
              disabled={disabled}
              onClick={handleSubmit}
            >
              <span className="btn-text">
                Submit
                <IconLoading isLoading={loadStatus} />
              </span>
            </button>
          </form>

        </div>
      </div>
    );
  }
}
