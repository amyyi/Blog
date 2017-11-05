import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {signout, getAccountId} from 'redux/modules/auth';
import {getAccountInfo, updateProfile} from 'redux/modules/account';

import {
  Footer,
  ProfileForm,
  Head,
  ContentValid,
  ContentInValid,
} from 'components';

@connect(
  state => ({
    auth: state.auth,
    account: state.account,
  }), {
    signout,
    getAccountInfo,
    updateProfile,
  }
)
export default class Home extends Component {

  static propTypes = {
    account: ImmutablePropTypes.map.isRequired,
    signout: PropTypes.func.isRequired,
    getAccountInfo: PropTypes.func.isRequired,
    updateProfile: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      showProfile: false,
    };
    this._handleProfileSubmit = this._handleProfileSubmit.bind(this);
    this._showStateProfile = this._showStateProfile.bind(this);
    this._hideStateProfile = this._hideStateProfile.bind(this);
    this.body = document.body;
  }

  componentDidMount() {
    const accountId = getAccountId(); // modules auth function可以得到現在的user帳號是誰
    this.props.getAccountInfo(accountId);
  }

  _showStateProfile() {
    this.setState({
      showProfile: true,
    });
  }

  _hideStateProfile() {
    this.setState({
      showProfile: false,
    });
  }

  _handleProfileSubmit(data) {
    const {body} = this;
    body.className = body.className.replace(/no-scroll/, '');
    this.props.updateProfile(data);
    this.setState({
      showProfile: false,
    });
  }

  renderContent() {
    const {account} = this.props;
    const validation = account.get('blogValid');

    if (typeof validation !== 'undefined') {
      if (validation === 'valid') {
        return (
          <ContentValid />
        );
      } else {
        return (
          <ContentInValid />
        );
      }
    }
  }

  render() {
    const {account} = this.props;
    const {showProfile} = this.state;
    const validation = account.get('blogValid');

    return (
      <div className="home">
        <Head
          showProfile={this._showStateProfile}
        />
        {this.renderContent()}
        {validation === 'valid' &&
          <ProfileForm
            account={account}
            onSubmit={this._handleProfileSubmit}
            show={showProfile}
            hideProfile={this._hideStateProfile}
          />
        }
        <Footer />
      </div>
    );
  }
}
