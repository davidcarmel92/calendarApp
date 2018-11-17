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
        <h1 className="bg-info text-white p-2 mt-2">{title}</h1>
        <ul className="list-group-inline">
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
