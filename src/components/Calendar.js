import React from 'react'

import ReactCalendar from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'

import Day from './Day'
import '../styles/Calendar.scss'

const localizer = ReactCalendar.momentLocalizer(moment)

class Calendar extends React.Component {
  constructor () {
    super()
    this.state = {
      priceEvents : [{
      id: 0,
      title: 'All Day Event very long title',
      allDay: true,
      start: 1,
      end: 2,
      }],
      dayComponent: '',
      dayObject: {}
    }
    this.setUpDayComponent = this.setUpDayComponent.bind(this)
  }

  setUpDayComponent (dayObject) {
    return (
      <Day label={dayObject.label} date={dayObject.date}
        updateStockDetails={this.props.updateStockDetails}
        stockDetails={this.props.stockDetails}
        updateStockPrice={this.props.updateStockPrice}
        removeStockPrice={this.props.removeStockPrice}/>
    )
  }

  customDayPropGetter = (date) => {
    return {
      className: 'dayTile'
    }
  }

  render () {
    return (
      <div className="calendarWrapper">
        <ReactCalendar
          localizer={localizer}
          events={[]}
          startAccessor="start"
          endAccessor="end"
          components={{
            month: {
              dateHeader: this.setUpDayComponent
            }
          }}
          views={{
            month: true // To have Month view only
          }}
          dayPropGetter={this.customDayPropGetter}
        />
      </div>
    )
  }
}

export default Calendar
