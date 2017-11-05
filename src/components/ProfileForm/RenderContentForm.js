import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {validateTitle} from 'utils/titleMsg';

export default class RenderContentForm extends Component {

  static propTypes = {
    input: PropTypes.object.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    title: PropTypes.string,
    meta: PropTypes.object.isRequired,
  };

  render() {
    const {
      input,
      type,
      placeholder,
      title,
      meta: { touched, error },
    } = this.props;

    return (
      <div className="inline-input">
        <label>{title}</label>
        <input
          {...input}
          className="profile-input"
          placeholder={placeholder}
          type={type}
        />
        {touched || error && <span className="error-msg">{error}</span>}
      </div>
    );
  }
}

