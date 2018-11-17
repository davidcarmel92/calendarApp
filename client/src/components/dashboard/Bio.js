import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount, createProfile } from '../../actions/profileActions';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

class Bio extends Component {

  state = {
    bio: '',
    favorites: '',
    editProfile: false
  }

  onCreateProfile = () => {

    const data = {
      bio: this.state.bio,
      favorites: this.state.favorites
    }

    this.props.createProfile(data)

    this.setState({editProfile: false})
  }

  onCancelProfile = () => {
    this.setState({editProfile: false})
  }

  onDeleteClick = () => {
    this.props.deleteAccount();
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {

    const { profile } = this.props.profile;
    const { user } = this.props.auth;

    if(profile && profile.favorites){
      var profileFavorites = profile.favorites.map((item,index) =>
        <li
          key={index}
          className="list-group-item list-group-item-secondary font-weight-bold"
        >
          {item}
        </li>
      )
    }

    return (
      <div>
        <div className="lead text-muted">
          {profile ? profile.name : null }
          {profile && user.id === profile.user ? (
            <Link to="/add-pin"><button type="button" className="float-right btn btn-primary">Add Pin</button></Link>
          ) : null}
        </div>
        {profile && profile.bio && this.state.editProfile === false ? (
          <div>
            <p className="mt-5">{profile.bio}</p>
            <span>My favorite places:</span>
            <ul className="list-group mb-2">
              {profileFavorites}
            </ul>
            {user.id === profile.user ? (
              <button className='btn btn-secondary' onClick={() => this.setState({editProfile: true})}><i className="fas fa-edit" /></button>
            ) : null}
          </div>
        ) : (
          <span>
            <p>Share about yourself!</p>
            <TextAreaFieldGroup
              placeholder="Short Bio"
              name="bio"
              value={this.state.bio}
              onChange={this.onChange}
              info="Tell us a little about yourself"
             />
             <TextAreaFieldGroup
               placeholder="List your favorite places!"
               name="favorites"
               value={this.state.favorites}
               onChange={this.onChange}
               info="Tell us where you like to go!"
              />
            <button onClick={this.onCreateProfile} className="btn btn-primary">Save</button>
            {this.state.editProfile ? (
              <button onClick={this.onCancelProfile} className="btn btn-secondary ml-1">Cancel</button>
            ) : null}
          </span>
        )}

      </div>
    )
  }
}

Bio.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});


export default connect(mapStateToProps, { getCurrentProfile, deleteAccount, createProfile })(Bio)
