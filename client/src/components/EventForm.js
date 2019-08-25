import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNewEvent, selectEvent, updateEvent } from '../actions/calendarActions';

class EventForm extends Component {

  state = {
    description: '',
    time: '12:00'
  }

  componentDidMount(){
    if(this.props.event.eventSelected){
      this.setState({
        description: this.props.event.eventSelected.text,
        time: this.props.event.eventSelected.time
      })
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmitEvent = () => {
    const data = {
      text: this.state.description,
      time: this.state.time,
      day: this.props.app.selectedDay,
      month: this.props.app.currentMonth
    }

    if(this.props.event.eventSelected){
      data['_id'] = this.props.event.eventSelected._id;
      this.props.updateEvent(data);
      this.props.selectEvent(null);
    }
    else {
      this.props.addNewEvent(data);
    }
  }

  render(){

    return (
        <>
          <p className="text">Enter A new event with the form below</p>
          <form className="event-form">
            <div className="form-group">
              <label className="text-area-label" htmlFor="description">Description</label>
              <textarea value={this.state.description} onChange={(e) => this.onChange(e)} className="text-area" name="description" id="" cols="60" rows="20"></textarea>
            </div>
            <div className="form-group">
              <label className="text-area-label" htmlFor="time">Time</label>
              <input value={this.state.time} onChange={(e) => this.onChange(e)} className="time-area" type="time" name="time"></input>
            </div>
          </form>
          <div className="buttons">
            <button onClick={this.onSubmitEvent} className="btn btn-submit">Submit</button>
            <button onClick={this.props.closeEventForm} className="btn btn-cancel">Cancel</button>
          </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  app: state.app,
  event: state.event
})

export default connect(mapStateToProps, { addNewEvent, selectEvent, updateEvent })(EventForm);
