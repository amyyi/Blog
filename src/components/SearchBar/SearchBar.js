import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';

import {validateInterge} from 'utils/searchInterge';

export default class SearchBar extends Component {

  static propTypes = {
    articleTypes: PropTypes.object.isRequired,
    filterSubmit: PropTypes.func.isRequired,
    resetArticle: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      checkboxMultiple: [],
      inputFilter: '',
      checkboxError: '',
      filterError: '',
      keyWord: '',
      openCheckbox: false,
    };
    this.handleFormInputChange = this.handleFormInputChange.bind(this);
    this._toggleList = this._toggleList.bind(this);
    this._submitSearch = this._submitSearch.bind(this);
    this._touchInput = this._touchInput.bind(this);
    this._getDefaultData = this._getDefaultData.bind(this);
  }

  handleFormInputChange(e) {
    const el = e.target;
    const name = el.name;
    const type = el.type;
    const {checkboxMultiple} = this.state;
    const validInput = validateInterge(el.value);

    if (type === 'checkbox') {

      // 判斷選項是否有被勾選，checked是true表示有被勾選
      if (el.checked) {
        this.setState({
          checkboxError: '',
        });
        checkboxMultiple.push(el.value);
      } else {

        // 在checkboxMultiple找到相同的value並移除它
        checkboxMultiple.splice(checkboxMultiple.indexOf(el.value), 1);

        if (checkboxMultiple.length === 0) {
          this.setState({
            checkboxError: 'error',
          });
        }
      }

    } else if (type === 'text' && name === 'filterInput') {

      if (!validInput) {
        this.setState({
          filterError: 'error',
        });
      } else {
        this.setState({
          filterError: '',
          inputFilter: el.value,
        });
      }
    } else {
      this.setState({
        keyWord: el.value,
      });
    }

  }

  _toggleList() {
    const menuState = !this.state.openCheckbox;
    this.setState({
      openCheckbox: menuState,
    });
  }

  _touchInput(e) {
    const el = e.target;
    const name = el.name;

    if (name === 'checkInput' && el.value.length === 0) {
      this.setState({
        checkboxError: 'error',
      });
    } else if (name === 'checkInput' && el.value.length !== 0) {
      this.setState({
        checkboxError: '',
      });
    } else if (name === 'filterInput' && el.value.length === 0) {
      this.setState({
        filterError: 'error',
      });
    } else if (name === 'filterInput' && el.value.length !== 0) {
      this.setState({
        filterError: '',
      });
    }
  }

  _submitSearch() {
    const searchData = {};
    const {checkboxMultiple, inputFilter, keyWord} = this.state;
    const validInput = validateInterge(inputFilter);

    if (checkboxMultiple.length === 0 && !validInput) {
      this.setState({
        checkboxError: 'error',
        filterError: 'error',
      });
    } else if (checkboxMultiple.length !== 0 && !validInput) {
      this.setState({
        filterError: 'error',
      });
      searchData['checkboxMultiple'] = checkboxMultiple;
    } else if (checkboxMultiple.length === 0 && validInput) {
      this.setState({
        heckboxError: 'error',
      });
      searchData['inputFilter'] = inputFilter;
    } else if (checkboxMultiple.length !== 0 && validInput) {
      searchData['checkboxMultiple'] = checkboxMultiple;
      searchData['inputFilter'] = inputFilter;
      searchData['keyWord'] = keyWord;
      this.props.filterSubmit(searchData);
    }

  }

  _getDefaultData() {
    this.props.resetArticle();
  }

  render() {
    const {
      articleTypes,
    } = this.props;
    const {checkboxError, filterError, openCheckbox, checkboxMultiple} = this.state;
    const checkboxClass = openCheckbox === true ? 'open' : '';
    const filterClass = filterError === 'error' ? 'has-error' : '';

    return (
      <div>
        <form className="search-form" onChange={this.handleFormInputChange} >
          <div className={`select-div ${checkboxError === 'error' ? 'has-error' : ''}`} onClick={this._toggleList}>
            <input
              className="full-inputWidth input-nobg"
              name="checkInput"
              value={checkboxMultiple}
              onFocus={this._touchInput}
              onChange={this.handleFormInputChange}
            />
            <ul className={`select-ul ${checkboxClass}`}>
              {
                articleTypes.map((item, index) => {
                  return (
                    <li key={`checkbox_${index}`}>
                      <label className="pure-checkbox">
                        <input
                          type="checkbox"
                          name="checkbox-multiple"
                          value={item}
                        /> {item}
                      </label>
                    </li>
                  );
                })
              }
            </ul>
            {checkboxError === 'error' && <span className="error-msg search-error">please select at lease one category </span>}
          </div>

          <div className={`filter-div ${filterClass}`}>
            <input
              className={`full-inputWidth ${filterClass}`}
              name="filterInput"
              placeholder="熱門數"
              onFocus={this._touchInput}
              onChange={this.handleFormInputChange}
            />
            {filterError === 'error' &&
              <div className="errorTip">
                <div className="trangle"></div>
                <span className="tip-span">{`Can user >=, >, <=, <, +interger number.`}</span>
              </div>
            }
          </div>

          <div className="filter-div input-width">
            <input
              className="full-inputWidth"
              type="input"
              placeholder="keyWord"
            />
          </div>
          <button
            type="button"
            className="search-btn"
            onClick={this._submitSearch}
          >
            Search Articles
          </button>
          <button
            type="button"
            className="search-btn blue-btn"
            onClick={this._getDefaultData}
          > Reset Articles
          </button>
        </form>
      </div>
    );
  }
}
