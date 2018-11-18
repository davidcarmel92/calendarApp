import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import { addPin } from '../../actions/pinActions';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

class PinForm extends Component {

  state = {
    title: '',
    description: '',
    status: 'todo',
    file: null,
    errors: {}
  }

  componentWillReceiveProps(newProps) {
    if(newProps.errors) {
      this.setState({ errors: newProps.errors })
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const data = {
      title: this.state.title,
      description: this.state.description,
      status: this.state.status,
      user_id: this.props.auth.user.id
    }

    this.props.addPin(data, this.props.history)

  }

  onSubmitPhoto = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('myImage',this.state.file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    axios.post('api/pins/photo',formData,config)
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  fileChangedHandler = (event) => {
    this.setState({file: event.target.files[0]})
  }

  render() {

    const options = [
      {
        label: 'To Do',
        value: 'todo'
      },
      {
        label: 'Currently planned',
        value: 'doing'
      },
      {
        label: 'Already Completed',
        value: 'done'
      }
    ];


    const { errors } = this.state;

    return (
      <div className="post-form mb-3 mr-4 ml-4">
        <Link to={`/dashboard`} className="btn btn-light mb-3">
          Back To Home
        </Link>
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Create a New Pin!
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
                   placeholder="Describe the Bucket list item"
                   name="description"
                   value={this.state.description}
                   onChange={this.onChange}
                   error={errors.description}
                />
              </div>
              <div className="form-group">
                <SelectListGroup
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
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

// <form className="form-group mt-2" encType="multipart/form-data" onSubmit={this.onSubmitPhoto}>
//   <input type="file" name="photo" onChange={this.fileChangedHandler}/>
//   <button type="submit" className="btn btn-success" >Submit Photo</button>
// </form>

PinForm.propTypes = {
  addPin: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  profile: state.profile
})

export default connect(mapStateToProps, { addPin })(withRouter(PinForm))
