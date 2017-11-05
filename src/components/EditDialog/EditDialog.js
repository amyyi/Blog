import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import {editArticle, changeArticls} from 'redux/modules/article';

import {
  DialogBase,
} from 'components';

import EditForm from './EditForm';


@connect(
  state => ({
    article: state.article,
    changeArticle: state.article.get('changeArticle'),
    changeArticleSuc: state.article.get('changeArticleSuc'),
    changeArticleErr: state.article.get('changeArticleErr'),
  }), {
    editArticle,
    changeArticls,
  }
)

export default class EditDialog extends Component {

  static propTypes = {
    article: ImmutablePropTypes.map.isRequired,
    articleArray: ImmutablePropTypes.map.isRequired,
    editArticle: PropTypes.func,
    changeArticls: PropTypes.func,
    id: PropTypes.string,
    info: PropTypes.string,
    changeArticle: PropTypes.bool,
    changeArticleSuc: PropTypes.bool,
    changeArticleErr: PropTypes.bool,
    closeDialog: PropTypes.bool,
    idx: PropTypes.number,

  };

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
    this._openModelEditDialog = this._openModelEditDialog.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {closeDialog} = this.props; // 依據上一層傳來的state來決定是否關閉dialog
    if (!closeDialog && nextProps.closeDialog) {
      this.dialog.close();
    }
  }

  _openModelEditDialog() {
    const {articleArray} = this.props;
    this.props.editArticle(articleArray);
    this.dialog.show();
  }

  _handleSubmit(data) {
    const {article, id, info, idx} = this.props;
    this.props.changeArticls(article, info, id, data, idx);
  }

  render() {
    const {
      articleArray,
      id,
      closeDialog,
    } = this.props;

    return (
      <span>
        <button className="article-button" onClick={this._openModelEditDialog}>Edit</button>
        <DialogBase
          ref={(c) => { this.dialog = c; }}
          hasHeaderClose={true}
          className="dialog-modellist"
          title="Edit Article"
          zIndex={1010}
          articleArray={articleArray}
        >
          <EditForm
            articleArray={articleArray}
            id={id}
            closeDialog={closeDialog}
            onSubmit={this._handleSubmit}
          />
        </DialogBase>
      </span>
    );
  }
}
