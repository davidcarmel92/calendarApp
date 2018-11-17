import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPin, getPinsByProfile, getPinsByUser, updatePin, deletePin } from '../../actions/pinActions';
import { getProfileById, getProfileByUser } from '../../actions/profileActions';
import { setUserId } from '../../actions/authActions';
import Spinner from '../common/Spinner'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import BucketGroup from './BucketGroup';
import Bio from './Bio';

class Dashboard extends Component {

  componentDidMount() {

    const profileId = this.props.match.params.profile_id;

    if(profileId) {
      this.props.getPinsByProfile(profileId);
      this.props.getProfileById(profileId);
    }
    else {
      const userId = this.props.auth.user.id;
      this.props.getPinsByUser(userId);
      this.props.getProfileByUser(userId);
    }
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
        <div className="mr-5 ml-1 container">
          <div className="row d-flex">
            <div className="col-sm-4">
              {dashboardContent}
            </div>
            <div className="ml-auto col-sm-8">
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
  getPinsByUser: PropTypes.func.isRequired,
  getPinsByProfile: PropTypes.func.isRequired,
  updatePin: PropTypes.func.isRequired,
  deletePin: PropTypes.func.isRequired,
  getProfileById: PropTypes.func.isRequired,
  getProfileByUser: PropTypes.func.isRequired,
  setUserId: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  pins: PropTypes.array
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  pin: state.pin,
  auth: state.auth
});

export default connect(mapStateToProps, { addPin, getPinsByProfile, getPinsByUser, updatePin, deletePin, getProfileById, getProfileByUser, setUserId })(withRouter(Dashboard))
