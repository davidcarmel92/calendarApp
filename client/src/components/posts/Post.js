import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';
import { getPostById } from '../../actions/postsActions.js';
import CommentFeed from './CommentFeed';

class Post extends Component {


  componentDidMount(){
    this.props.getPostById(this.props.match.params.post_id);
  }

  render(){

    let postContent = null;
    let postTitle = null;
    let categoryName = null;
    let post = null;
    let postAuthor = null;
    if(this.props.posts.post){
      let postData = this.props.posts.post;
      postContent = (
        <div className="ml-2 mt-2">
          <small>Posted at <Moment format="MM/DD/YYYY, hh:mm A" date={postData.date} /></small>
          <p className="mt-2">{postData.text}</p>
        </div>
      );
      postTitle = (
        <h3>{postData.title}</h3>
      );
      postAuthor = (
        <div className="ml-2 mt-2">
          <small>Posted by</small>
          <p className="mt-2">{postData.name}</p>
        </div>
      )
      categoryName = postData.category;
      post = (
        <div className="container">
          <div className="row">
            <Link className="btn btn-light" to={`/category/${categoryName}`}>
              Back
            </Link>
            <div className="col-sm-11 ml-auto">
              {postTitle}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-1"></div>
            <div className="col-sm-9">
              {postContent}
            </div>
            <div className="col-sm-2">
              {postAuthor}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 mt-2">
              <CommentFeed />
            </div>
          </div>
        </div>
      )
    }
    else {
      postContent =  null;
      postTitle = null;
      categoryName = null;
      post = (<Spinner />);
    }

    return (
      <div className="post">
        {post}

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
