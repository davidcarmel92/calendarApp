import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

class MainFeedItem extends Component {


  render() {

    const { category } = this.props;

    let content = null;
    if(category){
      content = (
        <li className="list-group-item feed-item row d-flex ml-2">
          <div className="col-1">
            <i className="fas fa-file"/>
          </div>
          <div className="col-6">
            <Link to={`/category/${category.name}`} className="post-link">
              <div>
                {category.name}
              </div>
            </Link>
          </div>
          <div className="col-3">
            <span className="pl-3">{category.length}</span>
          </div>
          <div className="col-2 mr-auto">
            <span>
              <span>{category.lastPostTitle}</span>
              <br />
              <small><Moment format="MM/DD/YYYY, hh:mm A" date={category.lastPostDate} /></small>
            </span>
          </div>
        </li>
      )
    }

    return (
      <span>{content}</span>
    )
  }
}

MainFeedItem.propTypes = {
  category: PropTypes.object.isRequired
};


export default MainFeedItem;
