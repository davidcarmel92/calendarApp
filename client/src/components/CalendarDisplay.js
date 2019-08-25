import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeSelectedDay } from '../actions/calendarActions';
import Spinner from '../common/Spinner'
import Header from './Header';
import Month from './Month';

class CalendarDisplay extends Component {

  state = {
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'november', 'December']
  }

  // Change to new month.
  onChangeMonth = (direction) => {

    const { currentYear, currentMonth } = this.props.app;

    let newYear = currentYear;
    let newMonth = currentMonth;

    // Determing if what year and month should be displayed next.
    if(direction === 'next'){
      newYear = (currentMonth === 11) ? newYear + 1 : newYear;
      newMonth = (currentMonth + 1) % 12;
    }
    else {
      newYear = (currentMonth === 0) ? newYear - 1 : newYear;
      newMonth = (currentMonth === 0) ? 11 : newMonth - 1;
    }

    this.props.getCurrentCalendarData(newMonth, newYear)
  }

  onSelectDay = (day) => {
    this.props.changeSelectedDay(day);
  }

  render(){

    const { currentDay, selectedDay, currentMonth,
      currentYear, firstDay, daysInMonth, lastMonthDays, loading } = this.props.app;

    const { months } = this.state;

    let monthContent = (<Spinner />);

    if(!loading){
      monthContent = (<Month
        currentDay={currentDay}
        selectedDay={selectedDay}
        daysInMonth={daysInMonth}
        firstDay={firstDay}
        lastMonthDays={lastMonthDays}
        onSelectDay={this.onSelectDay}
      />)
    }

    return (
      <>
        <Header
          month={months[currentMonth]}
          year={currentYear}
          onChangeMonth={this.onChangeMonth}
        />
        {monthContent}
      </>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  app: state.app
})

export default connect(mapStateToProps, { changeSelectedDay })(CalendarDisplay);
