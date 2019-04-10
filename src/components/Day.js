import React from 'react'

import '../styles/Day.scss'
import addIcon from '../assets/addIcon.svg'
import removeIcon from '../assets/removeIcon.svg'

class Day extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showInput: false
    }
  }

  render () {
    return (
      <div className="dayWrapper">
        <div className="dayValue">{ this.props.label }</div>
        <div className="stockPriceHolder" style={{display:'none'}}>
          <input type="text" className="stockBox" placeholder="Stock"/>
        </div>
        <button className="addButton button" title="Add Stock Price">
          <img src={addIcon} alt="ADD" className="addIcon"/>
        </button>

      </div>
    )
  }
}
// <button className="removeButton button" title="Remove Stock Price">
//   <img src={removeIcon} alt="REMOVE" className="removeIcon"/>
// </button>
export default Day
