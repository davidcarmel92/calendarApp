import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CategoryFeedItem from './CategoryFeedItem';
import Spinner from '../common/Spinner';
import Pagination from '../common/Pagination.js'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPostsByCategory } from '../../actions/postsActions.js';

class CategoryFeed extends Component {

  state = {
    activePage: 1
  }

  componentDidMount() {
    const category = this.props.match.params.category;
    if(category){
      this.props.getPostsByCategory(category, this.state.activePage);
    }
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
      this.setState({activePage: direction}, () => {
        this.props.getPostsByCategory(this.props.match.params.category, this.state.activePage);
      });
    }
  }

  render() {

    let feed;

    const { posts, loading, length } = this.props.posts;
    const category = this.props.match.params.category;

    if(posts && !loading){
      feed = posts.map(post => (
          <CategoryFeedItem key={post._id} post={post} category={category} />
      ));
    } else {
      feed = (<div><Spinner /></div>);
    }

    let pagination = null;
    if(length > 0){
      pagination = (<Pagination length={length} handlePageChange={this.handlePageChange} activePage={this.state.activePage}/>)
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-10  d-flex flex-row">
            <h2>{category}</h2>
          </div>
          <div className="col-sm-2">
            {this.props.auth.isAuthenticated ? (
              <Link to={`/add-post`} className="post-link btn btn-light">
                Add Post
              </Link>
            ) : null}
          </div>
        </div>
        <div className="row">
          <div className="col-1">
          </div>
          <div className="col-6">
            <h4 className="ml-3">Topic</h4>
          </div>
          <div className="col-3">
            <h4>Replies</h4>
          </div>
          <div className="col-2">
            <h4>Last Post</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <ul className="list-group">
              {feed}
            </ul>
          </div>
        </div>
        <nav className="row">
         {pagination}
        </nav>
      </div>
    )
  }
}

CategoryFeed.propTypes = {
  getPostsByCategory: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts,
  auth: state.auth
})

export default connect(mapStateToProps, { getPostsByCategory })(CategoryFeed)
