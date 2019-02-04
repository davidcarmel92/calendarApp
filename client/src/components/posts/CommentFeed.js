import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PostComment from './PostComment';
import AddComment from './AddComment';
import Pagination from '../common/Pagination.js';
import Spinner from '../common/Spinner';

class CommentFeed extends Component {

  state = {
    activePage: 1
  }

  handlePageChange = (increment) => {
    let direction = 0;
    if(increment === 'prev'){
      direction = this.state.activePage-1;
    }
    else if(increment === 'next'){
      direction = this.state.activePage+1;
    }
    else if(increment !== 'next' && increment !== 'prev'){
      direction = increment;
    }
    if(direction !== 0){
      this.setState({ activePage: direction });
    }
  }

  render() {

    let commentsFeed = null;
    let addComment = null;
    let pagination = null;
    if(this.props.posts && this.props.posts.post){
      const { loading } = this.props.posts;
      const { comments, _id } = this.props.posts.post;

      if(this.props.auth.isAuthenticated){
        addComment = (<AddComment commentId={_id} length={comments.length} handlePageChange={this.handlePageChange} />);
      } else {
        addComment = (
          <div className="col-sm-3  mt-5">
            <Link to={"/login"} className="btn btn-light">Login to add a comment</Link>
          </div>
        )
      }


      if(loading){
        commentsFeed = (<Spinner />);
      }
      else if(comments.length > 0){
        pagination = (<Pagination length={comments.length} handlePageChange={this.handlePageChange} activePage={this.state.activePage}/>)
        const commentPage = ((this.state.activePage-1)*10);
        const commentsOnPage = comments.slice(commentPage,  commentPage+10);
        commentsFeed = commentsOnPage.map(comment => <PostComment key={comment._id} comment={comment} />);
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
        <nav className="row">
          {pagination}
        </nav>
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
