import React from 'react'
// import ReactDOM from

import '../styles/Day.scss'
import addIcon from '../assets/addIcon.svg'
import removeIcon from '../assets/removeIcon.svg'

class Day extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showInput: false,
      isEditable: true,
      value: ''
    }
    this.showStockBox = this.showStockBox.bind(this)
    this.hideStockBox = this.hideStockBox.bind(this)
    this.makeEditable = this.makeEditable.bind(this)
    this.finishEditing = this.finishEditing.bind(this)
    this.updateValue = this.updateValue.bind(this)
  }

  showStockBox () {
    this.setState({
      showInput: true
    })
  }

  hideStockBox () {
      this.setState({
      showInput: false
    })
  }

  makeEditable () {
    this.setState({
      isEditable: true
    })
  }

  updateValue (event) {
    this.setState({
      value: event.target.value
    })
  }

  finishEditing (event) {
    if (event.key === 'Enter')
      this.props.updateStockPrice(event, this.props.date, this.state.value, false)
  }

  render () {
    let value = ''
    let isBeingEdited = true

    for (let item of this.props.stockDetails) {
      if ( !(item.date > this.props.date) && !(item.date < this.props.date)) {
        value = item.stockPrice
        console.log(value)
        isBeingEdited = item.isBeingEdited
      }
    }

    let trueValue = (value.length === 0 || value === undefined) ? this.state.value : value

    return (
      <div className="dayWrapper">
        <div className="dayValue">{ this.props.label }</div>
        <div className="stockPriceHolder"
          style={{display: (value.length > 0 || this.state.showInput) ? true : 'none'}}>
          <input type="text"
            id={10}
            ref={this.textInput}
            className={"stockBox " + (isBeingEdited ? "inEditing" : "")}
            placeholder="Stock" disabled={!isBeingEdited}
            onKeyDown={this.finishEditing} value={trueValue} autoFocus="autoFocus"
            onChange={this.updateValue}
            />
        </div>
        <button className="addButton buttons" title="Add Stock Price" onClick={this.showStockBox} style={{display: value.length === 0 ? 'initial' : 'none'}}>
          <img src={addIcon} alt="ADD" className="addIcon icons"/>
        </button>
        <button className="removeButton buttons" title="Remove Stock Price" onClick={() => this.props.removeStockPrice(this.props.date)} style={{display: value.length > 0 ? 'initial' : 'none'}}>
          <img src={removeIcon} alt="REMOVE" className="removeIcon icons"/>
        </button>
      </div>
    )
  }
}

export default Day
