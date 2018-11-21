import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BucketItem from './BucketItem'


class BucketGroup extends Component {

  render() {

    const { pins, title, id, onChangePin, onDeletePin } = this.props;

    const list = pins.map(pin =>
      <BucketItem
        key={pin._id}
        pin={pin}
        onDeletePin={onDeletePin}
        onChangePin={onChangePin}
        defaultValue={id}
      />
    )

    return (
      <div>
        <h1 className="bg-light p-2 mt-2 text-center">{title}</h1>
        <hr />
        <ul className="list-inline" style={{width: '100%'}}>
          {list}
        </ul>
      </div>
    )
  }
}

BucketGroup.propTypes = {
  pins: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  onChangePin: PropTypes.func.isRequired,
}

export default BucketGroup;
