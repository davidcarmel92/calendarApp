import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CategoryFeedItem from './CategoryFeedItem';
import { connect } from 'react-redux';
import { getPostsByCategory } from '../../actions/forumActions.js'

class CategoryFeed extends Component {

  componentDidMount() {

    const category = this.props.match.params.category;
    if(category){
      this.props.getPostsByCategory(category);
    }
    else {
      this.props.getPostsByCategory('Sports');
    }

  }

  render() {

    let feed;

    const { posts } = this.props.posts

    if(posts){
      feed = posts.map(post => (
        <CategoryFeedItem key={post._id} title={post.title} />
      ));
    } else {
      feed = (<div>lol</div>)
    }



    return (
      <div>
        <ul className="list-group">
          {feed}
        </ul>
      </div>
    )
  }
}

CategoryFeed.propTypes = {
  getPostsByCategory: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts
})

export default connect(mapStateToProps, { getPostsByCategory })(CategoryFeed)
