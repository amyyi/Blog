import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class DialogBase extends Component {

  static propTypes = {
    children: PropTypes.any,
    hasHeaderClose: PropTypes.bool,
    className: PropTypes.string,
    title: PropTypes.string,
    zIndex: PropTypes.number
  };

  static defaultProps = {
    title: 'Base Dialog',
    zIndex: 1000
  };

  constructor(props) {
    super(props);
    this.state = {
      isShow: false
    };

    this.close = this.close.bind(this);
  }

  close() {
    this.setState({
      isShow: false
    });
  }

  show() {
    this.setState({
      isShow: true
    });
  }

  render() {
    const {children, hasHeaderClose, className, title, zIndex} = this.props;
    const isShowClass = this.state.isShow ? 'show' : '';
    const style = isShowClass ? {
      zIndex: zIndex
    } : null;

    return (
      <div className={`dialog ${className} ${isShowClass}`} style={style}>
        <div className="dialog-box">
          <div className="dialog-header">
            {
              hasHeaderClose &&
              <button type="button" className="fa fa-times close-icon" onClick={this.close}></button>
            }
            <p className="dialog-title">{title}</p>
          </div>
          {children}
        </div>
      </div>
    );
  }
}
