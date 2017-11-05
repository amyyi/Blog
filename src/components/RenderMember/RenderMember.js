import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Field } from 'redux-form';
import { updateInitial } from 'redux/modules/account';

import {
  RenderContentForm,
  AddContentBtn,
} from 'components';

@connect(
  state => ({
    account: state.account,
  }), {
    updateInitial,
  }
)

export default class RenderMember extends Component {

  static propTypes = {
    account: ImmutablePropTypes.map.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    title: PropTypes.string,
    updateInitial: PropTypes.func,
    fields: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
    this._removeInfo = this._removeInfo.bind(this);
  }

  _removeInfo() {
    this.props.updateInitial('remove');
  }

  renderClose(index) {
    if (! index < 1) {
      return (
        <i
          className="fa fa-times"
          aria-hidden="true"
          onClick={this._removeInfo}
        >
        </i>
      );
    }
  }

  render() {
    const {
      fields,
      updateInitial,
    } = this.props;

    return (
      <div className="inline-input">
        {fields.map((member, index) =>
          <div key={`context_${index}`}>
            <div className="signbox-title title-text">
              <span>Content Info{index + 1}</span>
              <span>
               {this.renderClose(index)}
              </span>
            </div>
            <Field
              className="form-input icon-left"
              name={`${member}.addr`}
              type="text"
              title="Addr"
              component={RenderContentForm}
              placeholder="addr"
            />
            <Field
              className="form-input icon-left"
              name={`${member}.tel`}
              type="text"
              title="Tel"
              component={RenderContentForm}
              placeholder="tel"
            />
          </div>
        )}
        <AddContentBtn
          updateInitial={updateInitial}
        />
      </div>
    );
  }
}

