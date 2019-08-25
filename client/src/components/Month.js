import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames'

const Month = props => {

  let weeks = [];

  const { events } = props;

  for(let i = 0; i<5; i++){
    let days = [];
    for(let j = 1; j<8; j++){

      // Get the current day.
      let day = j+(i*7)-props.firstDay;

      // Check for the first week to see if that day (Sunday, Monday ect.) is part of last month. If it is,
      // use last months number of days to determine which day should be displayed (29, 30, 31, etc.). Fade number.
      if(i === 0 && j-1 < props.firstDay){
        days.push((<td key={(i+1)*j} className="faded">{props.lastMonthDays - (props.firstDay - (j+(i*7)))}</td>));
      }
      // Check for last week of month to see if that day (Sunday, Monday ect.) is part of the next month. If it is,
      // display number starting at 1. Fade Number.
      else if(i === 4 && day > props.daysInMonth) {
        days.push((<td key={(i+1)*j} className="faded">{(day) - props.daysInMonth}</td>));
      }
      else {

        // Check to see if the day being iterated over is the selected day by the user.
        const daysClass = classnames({
          'selected': day === props.selectedDay
        });

        let current = null;
        // Check to see if the day being iterated over is the current day. Add appropriate styles to day if it is.
        if(day === props.currentDay){
          const style = {
            background: props.currentDay === props.selectedDay ? 'white' : '#2E86C1'
          }
          current = (<span className='current' style={style}></span>)
        }
        days.push((
          <td
            onClick={() => props.onSelectDay(day)}
            key={(i+1)*j}
            className={daysClass}
            >
            <span className="event-day">{day}</span>
            {events.filter(el => el.day === day).length > 0 ? (
                <p className="event-times-text">Select to see events</p>
              ) : null}
            {current}
          </td>
        ));
      }
    }
    // Push all of days to weeks array.
    weeks.push(<tr key={i}>{days}</tr>);
  }

  return (
    <div className="month">
      <table className="weekdays">
        <thead>
          <tr>
            <th><strong>Su</strong></th>
            <th><strong>Mo</strong></th>
            <th><strong>Tu</strong></th>
            <th><strong>We</strong></th>
            <th><strong>Th</strong></th>
            <th><strong>Fr</strong></th>
            <th><strong>Sa</strong></th>
          </tr>
        </thead>
        <tbody className="days">
          {weeks}
        </tbody>
      </table>
    </div>
  );
}

const mapStateToProps = state => ({
  events: state.event.events,
  app: state.app
})

export default connect(mapStateToProps)(Month);


// <div className="event-times">
//   {events.map(el => el.day === day ? (
//     <p key={el._id}>{el.time}</p>
//   ) : null)}
// </div>
