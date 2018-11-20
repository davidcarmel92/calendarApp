import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPinFromGallery } from '../../actions/pinActions';

class GalleryItem extends Component {

  state = {
    chosen: false
  }

  onAdd = () => {
    this.setState({chosen: true})

    const pinData = {
      title: this.props.pin.title,
      user_id: this.props.auth.user.id
    }

    this.props.addPinFromGallery(pinData)
  }

  render() {

    let styles;

    if(this.state.chosen) {
      styles = {
        opacity: .4
      }
    }

    return (
      <li className="list-inline-item mt-2 gallery-pin-card" style={styles}>
        <div className="card pin-card-styles">
          <div className="card-body link-card-styles" >
            <h3 className="card-title text-white font-weight-bold">{this.props.pin.title}</h3>
          </div>
          <div className="card-footer bg-info pin-card-footer">
            {this.state.chosen ? (
              <span className="text-white">Added!</span>
            ): (
              <button className="btn btn-primary" onClick={() => this.onAdd()}>
                <span>Add pin</span>
              </button>
            )}
          </div>
        </div>
      </li>
    )
  }
}

GalleryItem.propTypes = {
  addPinFromGallery: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { addPinFromGallery })(GalleryItem);
