import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PostComment from './PostComment';
import AddComment from './AddComment';

class CommentFeed extends Component {
  render() {

    let commentsFeed = null;
    let addComment = null;
    if(this.props.posts && this.props.posts.post){
      const { comments, _id } = this.props.posts.post;

      if(this.props.auth.isAuthenticated){
        addComment = (<AddComment commentId={_id}/>);
      } else {
        addComment = (
          <div className="col-sm-3  mt-5">
            <Link to={"/login"} className="btn btn-light">Login to add a comment</Link>
          </div>
        )
      }

      if(comments.length > 0){
        commentsFeed = comments.map(comment => <PostComment key={comment._id} comment={comment} />);
      } else{
        commentsFeed = (
          <div className="row border-top">
            <div className="col-sm-1"></div>
            <div className="col-sm-9">
              <div className="ml-2 mt-2">No comments yet</div>
            </div>
          </div>
        )
      }
    }

    return (
      <div>
        {commentsFeed}
        {addComment}
      </div>
    )
  }
}

CommentFeed.propTypes = {
  posts: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  posts: state.posts,
  auth: state.auth
})

export default connect(mapStateToProps, null)(CommentFeed)
