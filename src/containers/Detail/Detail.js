
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {getArticleDetail} from 'redux/modules/article';

@connect(
  state => ({
    details: state.article.get('datils'),
  }), {
    getArticleDetail,
  }
)

export default class Detail extends Component {

  static propTypes = {
    params: PropTypes.object.isRequired,
    getArticleDetail: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const {params} = this.props;
    const id = params.id;
    this.props.getArticleDetail(id);
  }

  render() {
    const {params, details} = this.props;
    const noArticle = details.toJS().length === 0;
    const title = noArticle ? '' : details.getIn([0, 'title']);
    const content = noArticle ? 'Article Not Found' : details.getIn([0, 'content']);
    const errArticle = noArticle ? 'error-title' : '';

    return (
      <div className="detail-block">
        <h1 className="detail-title">{title}</h1>
        <p className="title-p">Article content</p>
        <div className="detailTitle-width">
          <p className={`detail-content ${errArticle}`}>{content}</p>
        </div>
      </div>
    );
  }
}
