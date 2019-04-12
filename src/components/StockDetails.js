import React from 'react'

import '../styles/StockDetail.scss'
import infinity from '../assets/infinityRed.svg'

import moment from 'moment'
import Highchart from './Highchart'

class StockDetails extends React.Component {
  constructor (props) {
    super(props)
    this.getStockAnalysis = this.getStockAnalysis.bind(this)
  }

  getStockAnalysis () {
    let stockAnalysis = {}
    let stockDetails = this.props.stockDetails
    stockAnalysis.maxProfitData = {
      maxProfit: stockDetails[1].stockPrice - stockDetails[0].stockPrice,
      buyDate: stockDetails[0].date,
      sellDate:  stockDetails[1].date
    }

    let maxDiff = stockDetails[1].stockPrice - stockDetails[0].stockPrice
    let minElement = stockDetails[0]

    for (let i = 1; i < stockDetails.length; i++) {
      if ((stockDetails[i].stockPrice - minElement.stockPrice) > maxDiff) {
        maxDiff = stockDetails[i].stockPrice - minElement.stockPrice
        stockAnalysis.maxProfitData.maxProfit = maxDiff
        stockAnalysis.maxProfitData.buyDate = minElement.date
        stockAnalysis.maxProfitData.sellDate = stockDetails[i].date
      }
      if (stockDetails[i].stockPrice * 1 < minElement.stockPrice * 1)
        minElement = stockDetails[i]
    }

    stockAnalysis.message = stockAnalysis.maxProfitData.maxProfit > 0 ?
      `Profit! Profit! Profit! and the maximum profit you can fetch is : \u20B9  ${stockAnalysis.maxProfitData.maxProfit * 10}` :
      stockAnalysis.maxProfitData.maxProfit === 0 ?
        `Neither a Gain nor a Loss, thanks to Aryabhatta!` :
          `OOPS, No chance of a Profit! But, however if you still wanna have some fun, you will incur a minimum loss of : \u20B9 ${stockAnalysis.maxProfitData.maxProfit * 10}`

    return stockAnalysis
  }

  render () {
    let stockAnalysis = {}
    let newOptions
    if (this.props.stockDetails.length >= 2) {
      stockAnalysis = this.getStockAnalysis()
    }

    return (
      <div className="stockDetailsWrapper">
      {
        this.props.stockDetails.length >= 2 ?
        (
          <>
          <div className="maxProfitHolder">
            <div className="maxProfit">{stockAnalysis.message}</div>
          </div>
          <div className="stockBuySellDateHolder">
            <div className="buyDate">
              {'Buy it on : '}
              <p className="actualDate">
              { moment(stockAnalysis.maxProfitData.buyDate).format('MMMM Do YYYY') }
              </p>
            </div>
            <p className="seperator">. . . </p>
            <div className="buyDate">
              {'Sell it on : '}
              <p className="actualDate">
              { moment(stockAnalysis.maxProfitData.sellDate).format('MMMM Do YYYY') }
              </p>
            </div>
          </div>
          <div className="stockTrendHolder">
            <Highchart stockDetails={this.props.stockDetails}/>
          </div>
          </>
        ) :
        (
          <div className="stockDetailLoading">
            <img src={infinity} alt="LOADING" className="infinityLoading"/>
            <p className="loadingText">Relax, take a deep breath and add few stock prices!</p>
          </div>
        )
      }
      </div>
    )
  }
}

export default StockDetails
