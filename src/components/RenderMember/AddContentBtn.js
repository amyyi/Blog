import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { updateInitial } from 'redux/modules/account';

export default class AddContentBtn extends Component {

  static propTypes = {
    updateInitial: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this._addInfo = this._addInfo.bind(this);
  }

  _addInfo() {
    this.props.updateInitial('add');
  }

  render() {
    return (
      <button type="button" onClick={this._addInfo}>Add Content Info</button>
    );
  }
}
