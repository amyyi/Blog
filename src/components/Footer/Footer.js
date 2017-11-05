import React, {Component} from 'react';

export default class Footer extends Component {

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className="footer">
        <h2 className="footer-copyright">
          Copyright © 2016 Nogle All rights reserved.
        </h2>
      </div>

    );
  }
}
