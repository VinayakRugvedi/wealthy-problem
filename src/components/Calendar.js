import React from 'react'

import ReactCalendar from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import '../styles/Calendar.scss'

const localizer = RBC.momentLocalizer(moment)

class Calendar extends React.Component {
  constructor () {
    super()
    this.state = {
      priceEvents : []
    }
  }

  render () {
    return (
      <div className="calendarWrapper">
        <ReactCalendar
        localizer={localizer}
        events={this.state.priceEvents}
        startAccessor="start"
        endAccessor="end"/>
      </div>
    )
  }
}

export default Calendar
