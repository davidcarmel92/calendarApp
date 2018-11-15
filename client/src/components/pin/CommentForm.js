import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addComment } from '../../actions/pinActions';

class CommentForm extends Component {

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
    const { pinId } = this.props;

    const newComment = {
      text: this.state.text,
      name: user.name
    }

    this.props.addComment(pinId, newComment)
    this.setState({text: ''})
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { errors } = this.state
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Make a comment...
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                   placeholder="Reply to post"
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

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  pinId: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired
}

export default connect(mapStateToProps, { addComment })(CommentForm)
