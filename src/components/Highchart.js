import React from 'react'
import Highcharts from 'highcharts'
import ReactHighcharts from 'highcharts-react-official'

import moment from 'moment'

const options = {
  chart: {
    type: 'spline'
  },
  title: {
    text: 'This Stock Trend'
  },
  xAxis: {
    type: 'datetime'
  },
  series: [
    {
      name: 'Month',
      data: []
    }
  ]
}

class Highchart extends React.Component {
  constructor (props) {
    super(props)
  }

  getDataArray () {
    let stockDetails = this.props.stockDetails
    let dataArray = []
    for (let stock of stockDetails) {
      dataArray.push([
        moment(stock.date).valueOf(),
        stock.stockPrice * 1
      ])
    }
    return dataArray
  }

  render () {
    let dataArray = this.getDataArray()
    options.series[0].data = dataArray
    return (
      <div className="highchartWrapper">
        <ReactHighcharts highcharts={Highcharts} options={options} ref={ this.chartRef } oneToOne={true} updateArgs={[true, true, true]}/>
      </div>
    )
  }
}



export default Highchart
