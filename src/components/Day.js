import React from 'react'

import '../styles/Day.scss'
import addIcon from '../assets/addIcon.svg'
import removeIcon from '../assets/removeIcon.svg'

class Day extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showInput: false,
      isEditable: true
    }
    this.textInput = React.createRef();
    this.showStockBox = this.showStockBox.bind(this)
    this.hideStockBox = this.hideStockBox.bind(this)
    this.makeEditable = this.makeEditable.bind(this)
    this.finishEditing = this.finishEditing.bind(this)
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

  finishEditing (event) {
    if (event.key === 'Enter')
      this.props.updateStockPrice(event, this.props.date, event.target.value, false)
  }

  render () {
    let value = '', isBeingEdited = true

    for (let item of this.props.stockDetails) {
      if ( !(item.date > this.props.date) && !(item.date < this.props.date)) {
        value = item.stockPrice
        this.textInput = value
        isBeingEdited = item.isBeingEdited
      }
    }

    return (
      <div className="dayWrapper">
        <div className="dayValue">{ this.props.label }</div>
        <div className="stockPriceHolder"
          style={{display: (value.length > 0 || this.state.showInput) ? true : 'none'}}
          onClick={this.makeEditable}>
          <input type="text"
            ref={this.textInput}
            className={"stockBox " + (isBeingEdited ? "inEditing" : "")}
            placeholder="Stock" disabled={!isBeingEdited} value={value}
            onKeyDown={this.finishEditing}
            onChange={(event) => this.props.updateStockPrice(event, this.props.date, event.target.value)}/>
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
