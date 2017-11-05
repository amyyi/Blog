import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import {Detail} from 'containers';

export default class TitleBtn extends Component {

  static propTypes = {
    router: PropTypes.object.isRequired,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this._openDetail = this._openDetail.bind(this);
  }
  _openDetail() {
    const {articleId} = this.props;
    const {router} = this.context;
    const link = router.createHref(`/detail/${articleId}`);
    window.open(
      link,
      '_blank',
      `width=530,
       height=800,
       directories=0,
       titlebar=0,
       toolbar=0,
       location=0,
       status=0,
       menubar=0,
       scrollbars=no,
       resizable=no`
     );
  }

  renderTitle(articleTitle) {
    let title = articleTitle;

    if (title.length > 10) {
      title = title.substr(0, 10) + '...';
      return title;
    } else {
      return title;
    }
  }
  render() {
    const {articleTitle} = this.props;

    return (
      <span
        className="article-margin"
        onClick={this._openDetail}
      >{this.renderTitle(articleTitle)}</span>

    );
  }
}
