import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profileActions';

class Favorites extends Component {

  state = {
    favorites: [],
    addFavoriteText: ''
  }

  componentDidMount(){
    if(this.props.profile && this.props.profile.profile) {
      if(this.state.favorites !== this.props.profile.profile.favorites){
        this.setState({favorites: this.props.profile.profile.favorites})
      }
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.profile.profile && nextProps.profile.profile.favorites !== this.state.favorites){
      this.setState({favorites: nextProps.profile.profile.favorites})
    }
  }

  addFavorite = () => {

    const data = {
      favorites: [...this.state.favorites, this.state.addFavoriteText]
    }

    this.props.createProfile(data)

    this.setState({addFavoriteText: ''})
  }

  deleteFavorite = (favorite) => {

    const updatedFavorites = this.state.favorites.filter(item => item !== favorite)

    const data = {
      favorites: [...updatedFavorites]
    }

    this.props.createProfile(data)
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {

    const { favorites, addFavoriteText } = this.state;

    const favoritesList = favorites.map((favorite, index) => (
      <li
        className="list-group-item"
        key={index}>
        <span>
          {favorite}
        </span>
        <button type="button" className="close text-danger" aria-label="Close" onClick={() => this.deleteFavorite(favorite)}>
          <span aria-hidden="true">&times;</span>
        </button>
      </li>
    ))

    return (
      <div>
        <ul className="list-group">
          {favoritesList}
        </ul>
        <div className="input-group mt-2">
          <input
             value={addFavoriteText}
             type="text"
             className="form-control"
             name="addFavoriteText"
             placeholder="Add"
             aria-label="Add"
             aria-describedby="basic-addon2"
             onChange={this.onChange}
            />
          <div className="input-group-append">
            <button onClick={() => this.addFavorite()} className="btn btn-outline-secondary" type="button">Add</button>
          </div>
      </div>
      </div>
    )
  }
}

Favorites.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});


export default connect(mapStateToProps, { createProfile })(Favorites)
