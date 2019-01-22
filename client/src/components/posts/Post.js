import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';
import { getPostById } from '../../actions/postsActions.js';

class Post extends Component {


  componentDidMount(){
    this.props.getPostById(this.props.match.params.post_id);
  }

  render(){

    let postContent = '';
    let postTitle = '';
    let categoryName;
    if(this.props.posts.post){
      let postData = this.props.posts.post;
      postContent = (
        <div className="ml-2 mt-2">
          <p>{postData.text}</p>
        </div>
      );
      postTitle = (
        <h3>{postData.title}</h3>
      );
      categoryName = postData.category;
    }
    else {
      postContent = (
        <Spinner />
      )
      postTitle = null;
      categoryName = null;
    }

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-1">
              <Link className="btn btn-light" to={`/${categoryName}`}>
                Back
              </Link>
            </div>
            <div className="col-md-11">
              {postTitle}
            </div>
          </div>
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-11 border border-info">
              {postContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Post.propTypes = {
  getPostById: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  posts: state.posts
})

export default connect(mapStateToProps, { getPostById })(Post)
