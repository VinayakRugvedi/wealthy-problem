import React from 'react'

import '../styles/SingleStock.scss'
import Calendar from './Calendar'

class SingleStock extends React.Component {
  constructor() {
    super()
    this.state = {
      stockDetails: []
    }
  }

  updateStockDetails = (stockObject) => {
    let existingDetails = this.state.stockDetails
    existingDetails.push(stockObject)
    let sortedExistingDetails = this.insertionSort(existingDetails)
    // console.log(existingDetails, 'sorrrrr')
    this.setState({
      stockDetails: sortedExistingDetails
    })
  }

  insertionSort = (stockObjects) => {
    for (let i = 0; i < stockObjects.length; i++) {
      let value = stockObjects[i].date
      for (var j = i - 1; j > -1 && stockObjects[j].date > value; j--) {
        stockObjects[j + 1] = stockObjects[j]
      }
      stockObjects[j + 1] = value
    }
    return stockObjects
  }

  updateStockPrice = (event, date, stockPrice, editing = true) => {
    let stockDetailsCopy = this.state.stockDetails
    let isFound = false
    for (let item of stockDetailsCopy) {
      if (!(date > item.date) && !(date < item.date)) {
        item.stockPrice = stockPrice
        item.isBeingEdited = editing
        isFound = true
        break
      }
    }

    if (!isFound) stockDetailsCopy.push({ date, stockPrice, isBeingEdited: editing})
    this.setState({
      stockDetails: stockDetailsCopy
    })
  }

  removeStockPrice = (date) => {
    console.log('In herrrrr')
    let stockDetailsCopy = this.state.stockDetails
    console.log(stockDetailsCopy)
    for (let i = 0; i < stockDetailsCopy.length; i++) {
      // console.log(date)
      if (!(date > stockDetailsCopy[i].date) && !(date < stockDetailsCopy[i].date)) {
        console.log('trueeeeee');
        stockDetailsCopy.splice(i, 1)
        console.log(stockDetailsCopy)
        break
      }
    }
    this.setState({
      stockDetails: stockDetailsCopy
    })
  }

  render () {
    return (
      <div className="stockWrapper">
        <h1 className="stockHeading"> Stock Stock Everywhere, So, lets Stalk! </h1>
        <h3 className="stockSubheading">
          “Rule number one: Don’t lose money. Rule number two: Don’t forget rule number one.”
        </h3>

        <div className="stockInsights">
          <Calendar updateStockDetails={this.updateStockDetails} stockDetails={this.state.stockDetails} updateStockPrice={this.updateStockPrice}
          removeStockPrice={this.removeStockPrice}/>
          <div className="stockDetails">
          </div>
        </div>

      </div>
    )
  }
}

export default SingleStock
