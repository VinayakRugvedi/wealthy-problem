import React from 'react'

import '../styles/SingleStock.scss'
import infinity from '../assets/infinityRed.svg'
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
      sortedStockDetails: [],
      dateToId: {},
      isFetchComplete: false
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
      let dateToId = {}

      for(let item of records.records) {
        if (Object.keys(item.fields).length !== 0) {
          let date = moment(item.fields.Date).toDate()
          dateToId[date] = item.id
          stockDetails.push({
            date,
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
        sortedStockDetails,
        dateToId,
        isFetchComplete: true
      })
    })
    .catch(console.log)
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

      fetch(apiURL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${airtableSecret.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        fields: {
          Date: moment(date).format('M/D/YYYY'),
          Price: stockPrice * 1
          }
        })
      })
      .then(response => response.json())
      .then((success) => {
        console.log(success, 'post')
        let dateToId = this.state.dateToId
        dateToId[date] = success.id
        this.setState({
          sortedStockDetails,
          stockDetails: stockDetailsCopy,
          dateToId
        })
      })
      .catch(console.log)
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

    fetch(apiURL + `/${this.state.dateToId[date]}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${airtableSecret.apiKey}`
      }
    })
      .then(response => response.json())
      .then(success => {
        let dateToIdCopy = this.state.dateToId
        delete dateToIdCopy[date]
        this.setState({
          sortedStockDetails: sortedStockDetailsCopy,
          stockDetails: stockDetailsCopy,
          dateToId: dateToIdCopy
        })
      })
  }

  render () {
    return (
      <div className="stockWrapper">
      {
        this.state.isFetchComplete ?
          (
            <>
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
            </>
          ) : (
            <div className="stockLoading">
              <img src={infinity} alt="LOADING" className="stockLoadingIcon"/>
              <p> B . E . L . I . E . V . E </p>
            </div>
          )
      }
      </div>
    )
  }
}

export default SingleStock
