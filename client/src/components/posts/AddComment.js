import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addComment } from '../../actions/postsActions';

class AddComment extends Component {

  state = {
    text: '',
    errors: {}
  }

  componentWillReceiveProps(newProps) {
    if(newProps.errors) {
      this.setState({ errors: newProps.errors })
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { user } = this.props.auth;

    const newComment = {
      text: this.state.text
    }

    this.props.addComment(this.props.commentId, newComment)
    this.setState({text: ''})
    this.props.handlePageChange(Math.ceil((this.props.length+1)/10))
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { errors } = this.state
    return (
      <div className="row">
        <div className="post-form mb-3 col-sm-11 ml-auto mr-auto">
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                   placeholder="Add a Comment"
                   name="text"
                   value={this.state.text}
                   onChange={this.onChange}
                   error={errors.text}
                />
              </div>
                <button type="submit" className="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

AddComment.propTypes = {
  auth: PropTypes.object.isRequired,
  commentId: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  length: PropTypes.number.isRequired
}

export default connect(mapStateToProps, { addComment })(AddComment)
