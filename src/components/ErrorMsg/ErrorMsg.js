import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {shouldComponentUpdate} from 'react-immutable-render-mixin';

export default class ErrorMsg extends Component {

  static propTypes = {
    isLoaded: PropTypes.bool.isRequired,
    loaderr: PropTypes.oneOfType([
      ImmutablePropTypes.map,
      PropTypes.bool
    ]),
  };

  shouldComponentUpdate = shouldComponentUpdate;

  render() {
    const {isLoaded, loaderr} = this.props;
    let errmsg = '';

    if (loaderr) {
      errmsg = <p className="errmsg err">{loaderr.get('errorMsg')}</p>;
    } else {
      return false;
    }

    return (
      (isLoaded || loaderr) &&
        <div className="errmsg-wrap">
          <div className="errmsg-inner-wrap">
            {errmsg}
          </div>
        </div>
      );
  }
}
