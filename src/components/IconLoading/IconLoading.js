import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {shouldComponentUpdate} from 'react-immutable-render-mixin';

export default class IconLoading extends Component {

  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
  };

/*
react-immutable-render-mixin可改善immutable效能
引用shouldComponentUpdate可簡化程式
而shouldComponentUpdate = shouldComponentUpdate;
是把mixin裡面的shouldComponentUpdate function取代component裡面的shouldComponentUpdate
*/
  shouldComponentUpdate = shouldComponentUpdate;

  renderNonDestory() {
    const {isLoading} = this.props;
    const isLoadingClass = isLoading ? 'fa fa-spinner fa-spin' : 'hide';
    return (
      <i className={`icon-loading ${isLoadingClass}`}></i>
    );
  }

  render() {
    return this.renderNonDestory();
  }
}
