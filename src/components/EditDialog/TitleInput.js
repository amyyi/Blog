import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import {validateTitle} from 'utils/titleMsg';

export default class TitleInput extends Component {

  static propTypes = {
    input: PropTypes.object.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    meta: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      showCount: false,
    };
    this._showCount = this._showCount.bind(this);
    this._hideCount = this._hideCount.bind(this);

  }
  _showCount(e) {
    this.setState({
      showCount: true,
    });
  }

  _hideCount() {
    this.setState({
      showCount: false,
    });
  }

  renderError(value) {
    return validateTitle(value);
  }
  render() {
    const {
      input,
      type,
      placeholder,
      meta: { error },
    } = this.props;
    const {showCount} = this.state;
    const showClass = showCount ? 'show' : '';
    const counter = 15 - +(input.value.length);

    return (
      <div className="edit-input">
        <div className="edit-title">
          <span>Title</span>
        </div>
        <input
          {...input}
          className="padding-input"
          placeholder={placeholder}
          type={type}
          value={input.value}
          onFocus={this._showCount}
          onBlur={this._hideCount}
          maxLength={15}
        />
        <span className={`input-count ${showClass}`}>{counter}</span>
        {this.renderError(input.value)}
        {error && <span className="error-msg">{error}</span>}
      </div>
    );
  }
}
