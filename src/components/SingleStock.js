import React from 'react'

import '../styles/SingleStock.scss'
import Calendar from './Calendar'
import moment from 'moment'
import StockDetails from './StockDetails'

import airtableSecret from '../airtableSecret'

const apiURL = 'https://api.airtable.com/v0/appfjwy2Z3RFgz7qm/Table%201'

class SingleStock extends React.Component {
  constructor() {
    super()
    this.state = {
      stockDetails: [],
      sortedStockDetails: []
    }
  }

  componentDidMount () {
    fetch(apiURL, {
      headers: {
        'Authorization': `Bearer ${airtableSecret.apiKey}`
      }
    })
    .then(response => response.json())
    .then(records => {
      let stockDetails = []
      for(let item of records.records) {
        if (Object.keys(item.fields).length !== 0) {
          stockDetails.push({
            date: moment(item.fields.Date).toDate(),
            stockPrice: String(item.fields.Price),
            isBeingEdited: false
          })
        }
      }


      let sortedStockDetails =
      stockDetails.sort((dateObj1, dateObj2) => {
              if (dateObj1.date > dateObj2.date) return 1;
              if (dateObj1.date < dateObj2.date) return -1;
              return 0;
            })

      console.log(sortedStockDetails)
      this.setState({
        stockDetails,
        sortedStockDetails
      })
    })
  }

  updateStockDetails = (stockObject) => {
    let existingDetails = this.state.stockDetails
    existingDetails.push(stockObject)
    let sortedExistingDetails =
    existingDetails.sort((dateObj1, dateObj2) => {
            if (dateObj1.date > dateObj2.date) return 1;
            if (dateObj1.date < dateObj2.date) return -1;
            return 0;
          })
    this.setState({
      stockDetails: sortedExistingDetails
    })
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

    let sortedStockDetails = stockDetailsCopy.filter((stockObject) => !stockObject.isBeingEdited)
    console.log(sortedStockDetails)
    if (!editing) {
      sortedStockDetails.sort((dateObj1, dateObj2) => {
        if (dateObj1.date > dateObj2.date) return 1;
        if (dateObj1.date < dateObj2.date) return -1;
        return 0;
      })

      this.setState({
        sortedStockDetails,
        stockDetails: stockDetailsCopy
      })
    } else
          this.setState({
            stockDetails: stockDetailsCopy
          })
  }

  removeStockPrice = (date) => {
    let stockDetailsCopy = this.state.stockDetails
    for (let i = 0; i < stockDetailsCopy.length; i++) {
      if (!(date > stockDetailsCopy[i].date) && !(date < stockDetailsCopy[i].date)) {
        stockDetailsCopy.splice(i, 1)
        break
      }
    }

    let sortedStockDetailsCopy = this.state.sortedStockDetails
    for (let i = 0; i < sortedStockDetailsCopy.length; i++) {
      if (!(date > sortedStockDetailsCopy[i].date) && !(date < sortedStockDetailsCopy[i].date)) {
        sortedStockDetailsCopy.splice(i, 1)
        break
      }
    }

    this.setState({
      sortedStockDetails: sortedStockDetailsCopy,
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
            <StockDetails stockDetails={this.state.sortedStockDetails}/>
          </div>
        </div>

      </div>
    )
  }
}

export default SingleStock
