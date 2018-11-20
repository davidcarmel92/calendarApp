import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import pinData from '../../data/data.json';

import GalleryItem from './GalleryItem';

class Gallery extends Component {

  state = {
    pins: []
  }

  componentDidMount() {
    this.setState({pins: pinData.pins})
  }

  render() {

   const list = this.state.pins.map((pin,i) => <GalleryItem key={i} pin={pin} />)


    return (
      <div className="container">
        <div className="row">
          <span className="col-md-6">
            <Link to={'/dashboard'} className="btn btn-primary">
              Back To Home
            </Link>
          </span>
          <h1 className="col-md-6 text-right">Pin Gallery</h1>
        </div>
        <hr />
        <div className="row gallery-container col-sm-12">
          <div>
            <ul className="list-inline" style={{width: '100%'}}>
              {list}
            </ul>
          </div>
        </div>
      </div>
    )
  }

}

export default Gallery
