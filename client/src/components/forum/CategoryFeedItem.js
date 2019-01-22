import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

class CategoryFeedItem extends Component {


  render() {

    return (
      <div>
        <Link to={`/post/${this.props.post._id}`} className="post-link">
          <li className="list-group-item">
            {this.props.post.title}
          </li>
        </Link>
      </div>
    )
  }
}

CategoryFeedItem.propTypes = {

}


export default CategoryFeedItem;
