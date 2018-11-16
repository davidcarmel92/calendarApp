import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPin, getPins, updatePin, deletePin } from '../../actions/pinActions';
import { getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../common/Spinner'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import BucketGroup from './BucketGroup';
import Bio from './Bio';

class Dashboard extends Component {

  componentDidMount() {

    this.props.getCurrentProfile();
    const userId = this.props.auth.user.id;
    this.props.getPins(userId);
  }


  onDeletePin = (pin) => {

    this.props.deletePin(pin);
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onChangePin = (pin, listChange) => {
    const data = {
      edit: 'status',
      value: listChange
    }
    this.props.updatePin(pin, data)
  }



  render() {

    const { user } = this.props.auth;
    const { loading } = this.props.profile;
    const { pins } = this.props.pin;

    let dashboardContent;
    let buckets;

    if(loading) {
      dashboardContent = <Spinner />
    }
    else  {
      dashboardContent = (
        <Bio />
      )
      if(pins) {
        const categories = [
          {
            id: 'todo',
            title: 'To do',
            pins: pins.filter(pin => pin.status === 'todo')
          },
          {
            id: 'doing',
            title: 'Currently planned',
            pins: pins.filter(pin => pin.status === 'doing')
          },
          {
            id: 'done',
            title: 'Already completed',
            pins: pins.filter(pin => pin.status === 'done')
          }
        ]


      buckets = categories.map(category =>
        <BucketGroup
          key={category.id}
          id={category.id}
          onChangePin={this.onChangePin}
          title={category.title}
          pins={category.pins}
          onDeletePin={this.onDeletePin}
        />)
      }
      else {
        buckets = null;
      }


    }

    return (
      <div className="dashboard">
        <div className="container mr-1 ml-1">
          <div className="row">
            <div className="col-md-4">
              {dashboardContent}
            </div>
            <div className="col-md-8">
              {buckets}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  addPin: PropTypes.func.isRequired,
  getPins: PropTypes.func.isRequired,
  updatePin: PropTypes.func.isRequired,
  deletePin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.object.isRequired,
  pins: PropTypes.array
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  pin: state.pin,
  auth: state.auth
});

export default connect(mapStateToProps, { addPin, getPins, updatePin, deletePin, getCurrentProfile })(withRouter(Dashboard))
