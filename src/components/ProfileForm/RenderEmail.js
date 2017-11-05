import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class RenderEmail extends Component {

  static propTypes = {
    input: PropTypes.object.isRequired,
    className: PropTypes.string,
    type: PropTypes.string,
    title: PropTypes.string,
  };


  render() {
    const {
      className,
      input,
      type,
      title,
    } = this.props;

    return (
      <div className="inline-input">
        <label>{title}</label>
        <input {...input} className={`profile-input ${className}`} type={type} value={input.value} disabled="disabled" />
      </div>
    );
  }
}

