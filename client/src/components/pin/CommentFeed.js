import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PinComment from './PinComment';

class CommentFeed extends Component {
  render() {
    const { comments, pinId, pin } = this.props;

    return comments.map(comment => (
      <PinComment key={comment._id} comment={comment} pinId={pinId} pin={pin} />
    ));
  }
}

CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  pinId: PropTypes.string.isRequired,
  pin: PropTypes.object.isRequired
};

export default CommentFeed;
