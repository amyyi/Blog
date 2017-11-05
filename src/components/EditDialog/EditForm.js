import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {reduxForm, Field} from 'redux-form';

import validation from './validation';
import {
  TitleInput,
  ContentField,
  DialogBase,
} from 'components';

@connect((state) => {

  return {
    initialValues: {
      editTitle: state.article.getIn(['editArticle', 'title']),
      editContent: state.article.getIn(['editArticle', 'content']),
      editType: state.article.getIn(['editArticle', 'articleType']),
    },
  };
})

@reduxForm({
  form: 'editArticle',
  enableReinitialize: true,
  validate: validation,
})


export default class EditForm extends Component {

  static propTypes = {
    articleArray: ImmutablePropTypes.map.isRequired,
    invalid: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    closeDialog: PropTypes.bool,
    handleSubmit: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this._openConfirmDialog = this._openConfirmDialog.bind(this);
    this._closeConfirmDialog = this._closeConfirmDialog.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {closeDialog} = this.props; // 依據上一層傳來的state來決定是否關閉dialog
    if (!closeDialog && nextProps.closeDialog) {
      this.dialog.close();
    }
  }

  _openConfirmDialog() {
    this.dialog.show();
  }

  _closeConfirmDialog() {
    this.dialog.close();
  }

  _handleSubmit() {
    const {id} = this.props;
    this.props.handleSubmit();
  }
  render() {
    const {articleArray, invalid, submitting} = this.props;
    const disabled = invalid || submitting;

    return (
      <div>
        <form onSubmit={this._handleSubmit}>
          <Field
            name="editTitle"
            type="text"
            component={TitleInput}
          />
          <div className="edit-title">
            <span>Content</span>
          </div>
          <Field
            name="editContent"
            type="text"
            component={ContentField}
          />
          <span>category</span>
          <label><Field name="editType" component="input" type="radio" value="food" /> food</label>
          <label><Field name="editType" component="input" type="radio" value="sport" /> sport</label>

          <div className="save-block">
            <button
              className="save-btn"
              type="button"
              disabled={disabled}
              onClick={this._openConfirmDialog}
            >Save</button>
          </div>
        </form>

        <DialogBase
          ref={(c) => { this.dialog = c; }}
          className="dialog-modellist"
          title="Confirm Dialog"
          zIndex={1010}
          articleArray={articleArray}
        >
          <p>Do you want to change this Article</p>
          <div>
            <button
              className="save-btn"
              type="submit"
              onClick={this._handleSubmit}
            >Save</button>
            <button
              className="save-btn"
              type="submit"
              onClick={this._closeConfirmDialog}
            >cancel</button>
          </div>
        </DialogBase>
      </div>
    );
  }
}
