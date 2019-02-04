import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MainFeedItem from './MainFeedItem';
import Spinner from '../common/Spinner';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCategories } from '../../actions/postsActions.js';
import Pagination from '../common/Pagination.js';

class MainFeed extends Component {

  state = {
    activePage: 1
  }

  componentDidMount() {
    this.props.getCategories();
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

    let feed;

    const { categories } = this.props.posts;

    let pagination = null;
    if(categories){
      pagination = (<Pagination length={categories.length} handlePageChange={this.handlePageChange} activePage={this.state.activePage}/>);
      const categoryPage = ((this.state.activePage-1)*10);
      const categoriesOnPage = categories.slice(categoryPage,  categoryPage+10);
      feed = categoriesOnPage.map(category => (
          <MainFeedItem key={category._id} category={category} />
      ));
    } else {
      feed = (<div><Spinner /></div>);
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-10">
            <h2>Home</h2>
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
            <h4 className="ml-3">Category</h4>
          </div>
          <div className="col-3">
            <h4>Posts</h4>
          </div>
          <div className="col-2">
            <h4>Last Post</h4>
          </div>
        </div>
        <ul className="list-group">
          {feed}
        </ul>
        <nav className="row">
          {pagination}
        </nav>
      </div>
    )
  }
}




MainFeed.propTypes = {
  auth: PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired,
  getCategories: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  posts: state.posts
})

export default connect(mapStateToProps, { getCategories })(MainFeed)
