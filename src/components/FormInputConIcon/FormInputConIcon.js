import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {shouldComponentUpdate} from 'react-immutable-render-mixin';

export default class FormInputConIcon extends Component {

  static propTypes = {
    status: PropTypes.string.isRequired
  };

  static defaultProps = {
    status: ''
  };

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate = shouldComponentUpdate; // 避免input每輸入一個字都render

  renderIconCon() {
    const {status} = this.props;

    if (status === 'loading') {
      return <i className="icon-position fa fa-spinner"></i>;
    }
    if (status === 'success') {
      return <i className="icon-position fa fa-check-circle"></i>;
    }
    return false;
  }

  render() {
    return this.renderIconCon();
  }
}
