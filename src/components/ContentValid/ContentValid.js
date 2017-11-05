import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import ImmutablePropTypes from 'react-immutable-proptypes';

import {convertTimestamp} from 'utils/dateTime';

import {getArticleInfo, getMoreArticle, editFavor, filterArticle, deleteArticle} from 'redux/modules/article';

import {
  IconLoading,
  SearchBar,
  EditDialog,
  TitleBtn,
} from 'components';

@connect(
  state => ({
    article: state.article,
    loadFavorSuc: state.article.get('loadFavorSuc'),
    loadFavorErr: state.article.get('loadFavorErr'),
    loadFilter: state.article.get('filter'),
    loadFilterErr: state.article.get('filterErr'),
    changeArticle: state.article.get('changeArticle'),
    changeArticleSuc: state.article.get('changeArticleSuc'),
    changeArticleErr: state.article.get('changeArticleErr'),
  }), {
    getArticleInfo,
    getMoreArticle,
    editFavor,
    filterArticle,
    deleteArticle,
  }
)
export default class ContentValid extends Component {
  static propTypes = {
    article: ImmutablePropTypes.map.isRequired,
    getArticleInfo: PropTypes.func.isRequired,
    getMoreArticle: PropTypes.func.isRequired,
    editFavor: PropTypes.func.isRequired,
    filterArticle: PropTypes.func.isRequired,
    loadFavorSuc: PropTypes.bool,
    loadFavorErr: PropTypes.bool,
    loadFilter: PropTypes.bool,
    loadFilterErr: PropTypes.bool,
    changeArticle: PropTypes.bool,
    changeArticleSuc: PropTypes.bool,
    changeArticleErr: PropTypes.bool,
    deleteArticle: PropTypes.func.isRequired,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
    globalFromApp: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      msgValue: '',
      searchObj: '',
      closeDialog: false,
    };
    this._getMore = this._getMore.bind(this);
    this._handleSearchSubmit = this._handleSearchSubmit.bind(this);
    this._retrySearch = this._retrySearch.bind(this);
    this._resetArticle = this._resetArticle.bind(this);
    this._changeDialogState = this._changeDialogState.bind(this);
    this._deleteArticle =this._deleteArticle.bind(this);
  }

  componentDidMount() {
    this.props.getArticleInfo();
  }

  componentWillReceiveProps(nextProps) {
    const {globalFromApp: {
      addNotification,
    }} = this.context;
    const {msgValue} = this.state;
    const {loadFavorSuc, loadFavorErr, changeArticle, changeArticleSuc, changeArticleErr} = this.props;
    const showedMsg = msgValue.length > 30 ? msgValue.substr(0, 30) + '...' : msgValue;

    // ref NotificationSystem
    // loadFavor
    if (!loadFavorSuc && nextProps.loadFavorSuc) {
      addNotification('success', showedMsg, 3);
    } else if (!loadFavorErr && nextProps.loadFavorErr) {
      addNotification('failure', showedMsg, 3);
    }

    // edit article state (show notification and hide dialog)
    if (!changeArticle && nextProps.changeArticle) {
      addNotification('loading', 'loading edit', 3);
    } else if (!changeArticleSuc && nextProps.changeArticleSuc) {
      addNotification('success', 'success edit', 3);
      this.setState({
        closeDialog: true,
      });
    } else if (!changeArticleErr && nextProps.changeArticleErr) {
      addNotification('failure', 'error edit', 3);
    }

    // restore dialog state
    if (!changeArticle && nextProps.changeArticle) {
      this.setState({
        closeDialog: false,
      });
    }
  }

  _getMore(info, newLength, oldlLength) {
    this.props.getMoreArticle(info, newLength, oldlLength);
  }

  _editFavor(info, loveId, idx, title) {
    const {article} = this.props;
    this.setState({
      msgValue: title, // 透過click改變state讓ref可以此state當作notification的msg
    });
    this.props.editFavor(article, info, loveId, idx);
  }

  _handleSearchSubmit(searchData) {
    this.setState({
      searchObj: searchData,
    });
    this.props.filterArticle(searchData);
  }

  _retrySearch() {
    const {searchObj} = this.state;
    this.props.filterArticle(searchObj);
  }

  _resetArticle() {
    this.props.getArticleInfo();
  }

  _changeDialogState() {
    this.setState({
      closeDialog: false,
    })
  }

  _deleteArticle(info, articleArray) {
    const {article} = this.props;
    this.props.deleteArticle(article, info, articleArray);
  }

  renderMore(info) {
    const {article} = this.props;
    const moreInfo = article.getIn(['articles', info, 'length']);
    const newLength = article.getIn(['articles', info, 'array']).size;
    const oldlLength = info !== 'food' ?
      article.getIn(['articles', 'food', 'array']).size : article.getIn(['articles', 'sport', 'array']).size;

    if (moreInfo) {
      return (
        <tr className="more-article">
          <td>
            <button className="more-button" onClick={() => this._getMore(info, newLength, oldlLength)}>More...</button>
          </td>
        </tr>
      );
    }
  }

  renderloveBtn(info, articleArray, idx) {
    const loveValue = articleArray.get('love');
    const loveId = articleArray.get('id');
    const title = articleArray.get('title');
    const btnClass = loveValue === 'true' ? 'btn-red' : '';

    return (
      <td>
        <span
          className={`article-margin ${btnClass}`}
          value={loveValue}
          onClick={() => this._editFavor(info, loveId, idx, title)}
        >
          <i className="fa fa-heart"></i>
        </span>
      </td>
    );
  }

  renderTime(articleArray) {
    return convertTimestamp(articleArray);
  }

  renderTable(info, i) {
    const {closeDialog} = this.state;

    return info.get('array').map((articleArray, idx) => {
      return (
        <tr key={`tableContent_${idx}`} className="article-border">

          {this.renderloveBtn(articleArray.get('articleType'), articleArray, idx)}

          <td>
            <TitleBtn
              articleId={articleArray.get('id')}
              articleTitle={articleArray.get('title')}
            />

          </td>
          <td><span className="article-margin">{articleArray.get('likeCount')}</span></td>
          <td><span className="article-margin">{articleArray.get('clickCount')}</span></td>
          <td><span className="article-margin">{this.renderTime(articleArray)}</span></td>
          <td>
            <div>
              <EditDialog
                ref={(c) => { this.editDialog = c; }}
                articleArray={articleArray}
                id={articleArray.get('id')}
                info={i}
                idx={idx}
                closeDialog={closeDialog}
              />

              <button
                className="article-button"
                disabled={articleArray.get('love') === 'true' ? 'disabled' : ''}
                onClick={() => this._deleteArticle(info, articleArray)}
              >Delete
              </button>
            </div>
          </td>
        </tr>
      );
    });
  }

  render() {
    const {article, loadFilter, loadFilterErr} = this.props;
    const articleTypes = article.get('articles').map((list, idx) => {
      return idx;
    });

    return (
      <div className="contentValid">
        <SearchBar
          articleTypes={articleTypes}
          filterSubmit={this._handleSearchSubmit}
          resetArticle={this._resetArticle}
        />

        <IconLoading isKeepAlive isLoading={loadFilter} />
        {loadFilterErr &&
          <div
            className="fa fa-refresh"
            onClick={this._retrySearch}
          >
              loading fail. Click this for reload
          </div>}

        {article.get('articles').map((info, i) => {

          if (info.get('array').size !== 0) {
            return (
              <div key={`table_${i}`}>
                <p className="table-title">{i}</p>
                <table className="article-table">
                  <thead key={`thead_${i}`}>
                    <tr className="article-border list-bg">
                      <td><span className="article-margin">Add Favorite</span></td>
                      <td><span className="article-margin">Article title</span></td>
                      <td><span className="article-margin">Click</span></td>
                      <td><span className="article-margin">Like</span></td>
                      <td><span className="article-margin">Edit time</span></td>
                      <td><span className="article-margin">Edit or Delete</span></td>
                    </tr>
                  </thead>
                  <tbody key={`tbody_${i}`}>
                    {this.renderTable(info, i)}

                    {this.renderMore(i)}
                  </tbody>
                </table>

              </div>
            );
          }

        })}

      </div>

    );
  }
}
