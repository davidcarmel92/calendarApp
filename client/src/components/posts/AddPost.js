import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addPost } from '../../actions/postsActions';


class AddPost extends Component {

  state = {
    title: '',
    text: '',
    category: '',
    errors: {}
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const data = {
      title: this.state.title,
      text: this.state.text,
      category: this.state.category
    }

    this.props.addPost(data, this.props.history)

  }


  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  goBack = () => {
    this.props.history.goBack();
  }

  render() {


    const { errors } = this.state;

    return (
      <div className="post-form mb-3 mr-4 ml-4">
        <button className="btn btn-light mb-3" onClick={this.goBack}>
          Back To List
        </button>
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Create a New Post
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                   placeholder="title"
                   name="title"
                   value={this.state.title}
                   onChange={this.onChange}
                   error={errors.title}
                />
              </div>
              <div className="form-group">
                <TextAreaFieldGroup
                   placeholder="Post text"
                   name="text"
                   value={this.state.text}
                   onChange={this.onChange}
                   error={errors.text}
                />
              </div>
              <div className="form-group">
                <TextAreaFieldGroup
                  name="category"
                  placeholder="Post category"
                  value={this.state.category}
                  onChange={this.onChange}
                  error={errors.category}
                />
              </div>
              <button type="submit" className="btn btn-success mt-2">Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}


AddPost.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { addPost })(withRouter(AddPost))
