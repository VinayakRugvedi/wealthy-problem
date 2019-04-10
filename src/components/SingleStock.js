import React from 'react'

import '../styles/SingleStock.scss'
import Calender from './Calendar'

class SingleStock extends React.Component {
  constructor() {
    super()
    this.state = {

    }
  }

  render () {
    return (
      <div className="stockWrapper">
        <h1 className="stockHeading"> Stock Stock Everywhere, So, lets Stalk! </h1>
        <h3 className="stockSubheading">
          “Rule number one: Don’t lose money. Rule number two: Don’t forget rule number one.”
        </h3>

        <div className="stockInsights">
        </div>

      </div>
    )
  }
}

export default SingleStock
