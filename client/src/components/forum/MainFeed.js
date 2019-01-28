import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MainFeedItem from './MainFeedItem';
import Spinner from '../common/Spinner';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class MainFeed extends Component {


  render() {


    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-10">
            <h2>Home</h2>
          </div>
          <div className="col-sm-2">
            {this.props.auth.isAuthenticated ? (
              <Link to={`/add-post`} className="post-link btn btn-light">
                Add Post
              </Link>
            ) : null}
          </div>
        </div>
        <div className="row">
          <div className="col-1">
          </div>
          <div className="col-6">
            <h4 className="ml-3">Category</h4>
          </div>
          <div className="col-3">
            <h4>Posts</h4>
          </div>
          <div className="col-2">
            <h4>Last Post</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <ul className="list-group">
              TBD
            </ul>
          </div>
        </div>
      </div>
    )
  }
}




MainFeed.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(MainFeed)
