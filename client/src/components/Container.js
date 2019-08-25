import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrentDayData, getEventsForMonth } from '../actions/calendarActions';
import Events from './Events';
import CalendarDisplay from './CalendarDisplay';

class Container extends Component {



  componentDidMount(){

    // Get the current day and month when app starts.
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    this.getCurrentCalendarData(currentMonth, currentYear, true);
  }

  getCurrentCalendarData = (currentMonth, currentYear, initial) => {

    // Determine the first day of the current month of the calendar, the number of days in the month,
    // and the number of days last month.
    const firstDay = (new Date(currentYear, currentMonth)).getDay();
    const daysInMonth = 32 - (new Date(currentYear, currentMonth, 32).getDate());
    const lastMonthDays = 32 - (new Date(currentYear, currentMonth-1, 32).getDate());

    // Store all data in component state.
    const newData = {
      currentDay: currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear() ? new Date().getDate() : null,
      selectedDay: initial ? new Date().getDate() : null,
      daysInMonth: daysInMonth,
      firstDay: firstDay,
      currentMonth: currentMonth,
      currentYear: currentYear,
      lastMonthDays: lastMonthDays
    };

    this.props.getEventsForMonth(currentMonth);
    this.props.setCurrentDayData(newData);
  }



  render(){

    return (
        <div className="app">
          <div className="daily-calendar">
            <Events />
          </div>
          <div className="calendar">
            <CalendarDisplay getCurrentCalendarData={this.getCurrentCalendarData} />
          </div>
        </div>
    );
  }
}

export default connect(null, { setCurrentDayData, getEventsForMonth })(Container);
