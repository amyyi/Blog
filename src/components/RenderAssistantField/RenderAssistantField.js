import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {validateTitle} from 'utils/titleMsg';

import {
  FormInputConIcon,
} from 'components';

export default class RenderAssistantField extends Component {

  static propTypes = {
    input: PropTypes.object.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    title: PropTypes.string,
    nameAsyncChecker: PropTypes.string,
    meta: PropTypes.object.isRequired,
  };

  renderError(value) {
    return validateTitle(value);
  }

  render() {
    const {
      input,
      type,
      placeholder,
      title,
      nameAsyncChecker,
      meta: { touched, error },
    } = this.props;

    return (
      <div className="inline-input">
        <label>{title}</label>
        <input
          {...input}
          className={`profile-input
          ${nameAsyncChecker === 'success' ? 'success' : ''}`}
          placeholder={placeholder}
          type={type}
          maxLength={15}
        />
        <FormInputConIcon status={nameAsyncChecker} />
        {touched && error && <span className="error-msg">{error}</span>}
        {this.renderError(input.value)}
      </div>
    );
  }
}

