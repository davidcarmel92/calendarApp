import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Spinner from '../common/Spinner';
import { getPin, updatePin } from '../../actions/pinActions';
import PinItem from './PinItem';
import CommentFeed from './CommentFeed';
import CommentForm from './CommentForm';

class Pin extends Component {

  componentDidMount() {
    this.props.getPin(this.props.match.params.id)
  }

  onChangePin = (pin, listChange) => {
    const { auth } = this.props;
    if(auth.user.id === pin.user){
      const data = {
        edit: 'status',
        value: listChange
      }

      this.props.updatePin(pin._id, data)
    }


  }

  render() {

    const { pin, loading } = this.props.pin;
    const { auth, profile } = this.props;
    let pinContent;

    let returnLink = '';
    let disabled = false;

    if(pin.user !== auth.user.id){
      returnLink = profile.profile._id;
      disabled = true;
    }

    if(pin === null || loading || Object.keys(pin).length === 0) {
      pinContent = <Spinner />
    }
    else {
      pinContent = (
        <div>
          <div className="card-header bg-info text-white font-weight-bold d-flex">
            <span>
              Pin Title: {pin.title}
            </span>
            <span className="ml-auto">
              <select disabled={disabled} onChange={(event) => this.onChangePin(pin, event.target.value)} defaultValue={pin.status}>
                <option value="todo">To Do</option>
                <option value="doing">Currently Planned</option>
                <option value="done">Completetd</option>
              </select>
            </span>
          </div>
          <div>
            <PinItem pin={pin} showActions={true} />
          </div>
          <CommentForm pinId={pin._id} />
          <CommentFeed pinId={pin._id} comments={pin.comments} pin={pin} />
        </div>
      )
    }


    return (
      <div className="pin">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to={`/dashboard/${returnLink}`} className="btn btn-light mb-3">
                Back To Home
              </Link>

              {pinContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Pin.propTypes = {
  pin: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getPin: PropTypes.func.isRequired,
  updatePin: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  pin: state.pin,
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, { getPin, updatePin })(Pin)
