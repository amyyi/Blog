import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class ContentField extends Component {

  static propTypes = {
    input: PropTypes.object.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    meta: PropTypes.object.isRequired,
  };

  render() {
    const {
      input,
      type,
      placeholder,
      meta: { touched, error },
    } = this.props;

    return (
      <div className="edit-input">
        <textarea
          {...input}
          className="padding-input content-textarea"
          placeholder={placeholder}
          type={type}
        />
        {touched && error && <span className="error-msg">{error}</span>}
      </div>
    );
  }
}
