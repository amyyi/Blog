import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';

export default class RenderField extends Component {

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
      <div className="inline-input">
        <input
          {...input}
          className="padding-input"
          placeholder={placeholder}
          type={type}
        />
        {touched && error && <span className="error-msg">{error}</span>}
      </div>
    );
  }
}
