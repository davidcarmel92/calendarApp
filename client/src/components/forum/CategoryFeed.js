import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CategoryFeedItem from './CategoryFeedItem';
import Spinner from '../common/Spinner';
import { connect } from 'react-redux';
import { getPostsByCategory } from '../../actions/postsActions.js'

class CategoryFeed extends Component {

  componentDidMount() {

    const category = this.props.match.params.category;
    if(category){
      this.props.getPostsByCategory(category);
    }

  }

  render() {

    let feed;

    const { posts } = this.props.posts

    if(posts){
      feed = posts.map(post => (
        <CategoryFeedItem key={post._id} post={post} />
      ));
    } else {
      feed = (<div><Spinner /></div>)
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <ul className="list-group">
              {feed}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

CategoryFeed.propTypes = {
  getPostsByCategory: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts
})

export default connect(mapStateToProps, { getPostsByCategory })(CategoryFeed)
