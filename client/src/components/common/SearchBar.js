import React, { Component } from 'react';
import PropTypes from 'prop-types';


class SearchBar extends Component {

  state = {
    searchTerm: '',
    table: ''
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      console.log()
    });
  }

  render() {
    return (
      <span className="text-center">
        <input name="searchTerm" type="text" onChange={this.onChange} value={this.state.searchTerm} placeholder="Search.." />
      </span>
    )
  }

}

export default SearchBar
