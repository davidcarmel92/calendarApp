import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';

class CategoryFeedItem extends Component {


  render() {

    const { post } = this.props;

    let content = '';
    if(post){
      content = (
        <li className="list-group-item feed-item">
          <div className="row">
            <div className="col-1">
              <i className="fas fa-file"/>
            </div>
            <div className="col-6">
              <Link to={`/post/${post._id}`} className="post-link">
                <div>
                  {post.title}
                </div>
              </Link>
              <div className="mt-2 small">
                <span>Created by <strong>{post.name}</strong>, </span>
                <span><Moment format="MM/DD/YYYY, hh:mm A" date={post.date} /></span>
              </div>
            </div>
            <div className="col-3">
              <span className="pl-4 ml-3">{post.comments.length}</span>
            </div>
            <div className="col-2">
              {post.comments.length ?
                (
                  <span>
                    <span>by {post.comments[post.comments.length - 1].name}</span>
                    <br />
                    <small><Moment format="MM/DD/YYYY, hh:mm A" date={post.comments[post.comments.length - 1].date} /></small>
                  </span>
                ) :
                (
                  <span>No Replies</span>
              )}
            </div>
          </div>
        </li>
      )
    } else {
      content = (<div><Spinner /></div>);
    }

    return (
      <div>{content}</div>
    )
  }
}

CategoryFeedItem.propTypes = {
  post: PropTypes.object.isRequired
};


export default CategoryFeedItem;
