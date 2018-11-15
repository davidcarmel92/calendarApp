import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Explore extends Component {

  state = {
    searchTerm: ''
  }

  onChange = (e) => {

    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="text-center">
        <span className="mr-2">Explore</span>
        <input name="searchTerm" style={{width: '60%'}} type="text" onChange={this.onChange} value={this.state.searchTerm} placeholder="Search.." />
        <button type="button" className="ml-3 btn btn-primary">Search</button>
      </div>
    )
  }

}

export default Explore
