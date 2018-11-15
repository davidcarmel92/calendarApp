import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { addLike, removeLike,  deletePinInside, updatePin } from '../../actions/pinActions';
import EditPin from './EditPin'

class PinItem extends Component {

  state = {
    description: '',
    editText: false
  }

  componentDidMount() {
    this.setState({ description: this.props.pin.description })
  }


  render() {

    const { pin, auth } = this.props;
    const { description } = this.state;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-12">
            <p className="lead">
              {description}
            </p>
            <EditPin pin={pin} />
          </div>
        </div>
      </div>
    )
  }
}

PinItem.propTypes = {
  pin: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePinInside: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { addLike, removeLike, deletePinInside })(withRouter(PinItem))
