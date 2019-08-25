import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { toggleEventForm, selectEvent, deleteEvent } from '../actions/calendarActions';
import EventForm from './EventForm';

class Events extends Component {


  openEventForm = (type) => {
    if(type === 'add'){
      this.props.selectEvent(null);
    }
    this.props.toggleEventForm(true);
  }

  closeEventForm = () => {
    this.props.toggleEventForm(false);
  }

  onSelectEvent = (el) => {
    if(this.props.event.eventSelected && this.props.event.eventSelected._id === el._id){
      this.props.selectEvent(null);
    }
    else {
      this.props.selectEvent(el);
    }
  }

  onDeleteEvent = (el) => {
    this.props.deleteEvent(el)
  }

  render(){

    const { event, app } = this.props;

    let content = null;

    const editClass = classnames("btn", {
      "edit-faded": !event.eventSelected
    })

    return (
      <div className="events">
        {app.selectedDay ? (
          <>
            <div className="buttons">
              <button onClick={() => this.openEventForm('add')} className="btn">Add</button>
              <button disabled={!event.eventSelected} className={editClass} onClick={this.openEventForm}>Edit</button>
            </div>
            {event.eventFormOpen ? (
              <EventForm closeEventForm={this.closeEventForm} />
            ) : (
              <ul className="event-list">
                {event.events.length > 0 && event.events.map(el => {
                  if(el.day === app.selectedDay){
                    const selectedDay = event.eventSelected && event.eventSelected._id === el._id
                    const eventClasses = classnames("event-item", {
                      "selected-event": selectedDay
                    })
                    return (
                      <li className="event-li" key={el._id}>
                        <div onClick={() => this.onSelectEvent(el)} className={eventClasses}>{el.text} {el.time}</div>
                        { selectedDay ? (<button className="btn-delete" onClick={() => this.onDeleteEvent(el)}>
                        <span className="fas fa-times"></span></button>) : null}
                      </li>
                    )
                  }})
                }
              </ul>
            )}
        </>
      ) : (
        <p className="text">Select a day to view or add an event.</p>
      )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  event: state.event,
  app: state.app
})

export default connect(mapStateToProps, { toggleEventForm, selectEvent, deleteEvent })(Events);
