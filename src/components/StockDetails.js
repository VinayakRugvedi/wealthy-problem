import React from 'react'

import '../styles/StockDetail.scss'
import infinity from '../assets/infinityRed.svg'

import moment from 'moment'

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

    console.log(stockAnalysis)

    let maxDiff = stockAnalysis.maxProfitData.maxProfit
    for (let i = 0; i < stockDetails.length; i++) {
      for (let j = i+1; j < stockDetails.length; j++) {
        if (stockDetails[j].stockPrice - stockDetails[i].stockPrice > maxDiff) {
          maxDiff = stockDetails[j].stockPrice - stockDetails[i].stockPrice
          stockAnalysis.maxProfitData.maxProfit = maxDiff
          stockAnalysis.maxProfitData.buyDate = stockDetails[i].date
          stockAnalysis.maxProfitData.sellDate = stockDetails[j].date
        }
      }
    }

    console.log(stockAnalysis)
    stockAnalysis.message = stockAnalysis.maxProfitData.maxProfit > 0 ?
      `Profit! Profit! Profit! and the maximum profit you can fetch is : \u20B9  ${stockAnalysis.maxProfitData.maxProfit * 10}` :
      stockAnalysis.maxProfitData.maxProfit === 0 ?
        `Neither a Gain nor a Loss, thanks to Aryabhatta!` :
          `OOPS, No chance of a Profit! But, however if you still wanna have some fun, you will incur a minimum loss of : \u20B9 ${stockAnalysis.maxProfitData.maxProfit * 10}`

    return stockAnalysis
  }

  render () {
    let stockAnalysis = {}
    if (this.props.stockDetails.length >= 2) {
      stockAnalysis = this.getStockAnalysis()
    }
    console.log(stockAnalysis)
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
