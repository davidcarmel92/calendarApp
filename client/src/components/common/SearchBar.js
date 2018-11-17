import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchProfiles } from '../../actions/profileActions';


class SearchBar extends Component {

  state = {
    searchTerm: '',
    table: []
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => this.props.searchProfiles(this.state.searchTerm))

  }

  render() {
    return (
      <span className="text-center">
        <input name="searchTerm" type="text" onChange={this.onChange} value={this.state.searchTerm} placeholder="Search.." />
      </span>
    )
  }
}

SearchBar.propTypes = {
  searchProfiles: PropTypes.func.isRequired
}

export default connect(null, { searchProfiles })(SearchBar);
