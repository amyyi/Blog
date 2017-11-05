import React, {Component} from 'react';

export default class ContentInValid extends Component {

  render() {
    return (
      <div className="contentInValid">
        <div>
          <p className="table-title">Article</p>
          <table className="article-table">
            <tbody>
              <tr className="article-border">
                <td>
                  <span className="article-margin btn-red">
                    <i className="fa fa-heart"></i>
                  </span>
                </td>
                <td>
                  <span
                    className="article-margin"
                    data-tip
                  >Welcome blog</span>
                </td>
                <td><span className="article-margin">100</span></td>
                <td><span className="article-margin">200</span></td>
                <td><span className="article-margin">2017-8-9 12:30:30</span></td>
                <td>
                  <div>
                    <button
                      className="article-button"
                      disabled="disabled"
                    >Edit</button>
                    <button
                      className="article-button"
                      disabled="disabled"
                    >Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>

    );
  }
}
