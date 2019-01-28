import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';

class PostComment extends Component {


  render() {

    const { comment } = this.props;

    let content = null;
    let title = null;
    let postAuthor = null;

    if(comment){
      content = (
        <div className="ml-2 mt-2">
          <small>Posted at <Moment format="MM/DD/YYYY, hh:mm A" date={comment.date} /></small>
          <p className="mt-2">{comment.text}</p>
        </div>
      );
      postAuthor = (
        <div className="ml-2 mt-2">
          <small>Posted by</small>
          <p className="mt-2">{comment.name}</p>
        </div>
      )
    }

    return (
      <div className="row border-top">
        <div className="col-sm-1"></div>
        <div className="col-sm-9">
          {content}
        </div>
        <div className="col-sm-2 ml-auto">
          {postAuthor}
        </div>
      </div>


    )
  }
}

PostComment.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(PostComment)
