import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Spinner from '../common/Spinner';
import { getPin } from '../../actions/pinActions';
import PinItem from './PinItem';
import CommentFeed from './CommentFeed';
import CommentForm from './CommentForm';

class Pin extends Component {

  componentDidMount() {
    this.props.getPin(this.props.match.params.id)
  }

  render() {

    const { pin, loading } = this.props.pin;
    let pinContent;

    if(pin === null || loading || Object.keys(pin).length === 0) {
      pinContent = <Spinner />
    }
    else {
      pinContent = (
        <div>
          <div className="card-header bg-info text-white font-weight-bold">
            Pin Title: {pin.title}
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
              <Link to="/dashboard" className="btn btn-light mb-3">
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
  getPin: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  pin: state.pin,
})

export default connect(mapStateToProps, { getPin })(Pin)
