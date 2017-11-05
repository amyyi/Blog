import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import onClickOutside from 'react-onclickoutside';

class Dropdown extends Component {

  static propTypes = {
    account: ImmutablePropTypes.map.isRequired,
    onClickOutsideCallback: PropTypes.func,
    showProfile: PropTypes.func.isRequired,
    logOut: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      menuActive: false,
      displayclass: false,
    }
    this.body = document.body;
    this._toggleMenu = this._toggleMenu.bind(this);
    this._toggleMobileMenu = this._toggleMobileMenu.bind(this);
    this._showProfile = this._showProfile.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this._logOut = this._logOut.bind(this);

  }

  _toggleMenu() {
    if (window.innerWidth > 401) {
      const menuState = !this.state.menuActive;
      this.setState({
        menuActive: menuState,
      });
    }
  }

  _toggleMobileMenu() {
    const {displayclass} = this.state;
    const showclass = displayclass ? false : true;
    this.setState({
      displayclass: showclass
    });
  }

  _showProfile() {
    const {body} = this;
    body.className += 'no-scroll';
    this.props.showProfile();
  }

  _logOut() {
    this.props.logOut();
  }

  handleClickOutside() {
    if (window.innerWidth > 401) {
      this.setState({
        menuActive: false,
      });
    } else {
      this.setState({
        displayclass: false,
      });
    }
  }

  render() {
    const {account} = this.props;
    const {menuActive, displayclass} = this.state;
    const headerClass = displayclass ? 'show' : 'hide';
    const userValid = account.get('blogValid') === 'valid';
    const userName = account.getIn(['contentInfo', 0, 'blogName']);
    let triangle = null;
    let menu = null;

    if (userValid) {
      if (menuActive) {
        triangle = (
          <div className="white-trangle"></div>
        );
        menu = (
          <div className="dropdown-group">
            <p className="drop-item" onClick={this._showProfile}>Profile</p>
          </div>
        );
      } else {
        triangle = (<div></div>);
        menu = (
          <div className="dropdown-group mobile-show">
            <p className="drop-item" onClick={this._showProfile}>Profile</p>
          </div>
        );
      }
    }

    return (
      <div>
        <div className="mobile-drop" onClick={this._toggleMobileMenu}></div>
        <div className={`header ${headerClass}`}>
          <nav>
            <a className="header-logo" href="#" title="Blog Desktop">
            </a>
            <ul className="header-nav">

              <li className="header-nav-item">
                <button
                  className="header-btn menuList"
                  onClick={this._toggleMenu}
                >{userName} welcome!
                </button>
                {triangle}
                {menu}
              </li>
              <li className="header-nav-item">
                <button className="header-btn" onClick={this._logOut}>Sign Out</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}
export default onClickOutside(Dropdown);

