import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

class CategoryFeedItem extends Component {


  render() {

    return (
      <li className="list-group-item">
        {this.props.title}
      </li>
    )
  }
}

CategoryFeedItem.propTypes = {

}


export default CategoryFeedItem;
