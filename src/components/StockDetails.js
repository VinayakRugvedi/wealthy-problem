import React form 'react'

import '../styles/StockDetail.scss'

class StockDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  render () {
    return (
      <div className="stockDetailsWrapper">
        <div className="maxProfitHolder">
          {}
        </div>
        <div className="stockTrendHolder">
        </div>
        <div className="stockBuySellDateHolder">
        </div>
      </div>
    )
  }
}

export default StockDetail
