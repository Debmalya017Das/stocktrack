import { Component } from 'react';
import PropTypes from 'prop-types';

class StockRow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }
  }

  componentDidMount() {
    const api_token = '88TS4WZEQMVLE2FZ';
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${this.props.query}&interval=1min&apikey=${api_token}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data && data['Time Series (1min)']) {
          const latestTimestamp = Object.keys(data['Time Series (1min)'])[0];
          const latestData = data['Time Series (1min)'][latestTimestamp];
          const { '1. open': open, '2. high': high, '3. low': low, '4. close': close, '5. volume': volume } = latestData;

          this.setState({
            data: {
              timestamp: latestTimestamp,
              open,
              high,
              low,
              close,
              volume
            }
          });
        } else {
          console.error('Error fetching stock data: Time Series (1min) data not found');
        }
      })
      .catch((error) => {
        console.error('Error fetching stock data:', error);
      });
  }

  render() {
    return (
      <tr>
        <td>{this.props.ticker}</td>
        <td>{this.state.data.timestamp}</td>
        <td>{this.state.data.open}</td>
        <td>{this.state.data.high}</td>
        <td>{this.state.data.low}</td>
        <td>{this.state.data.close}</td>
        <td>{this.state.data.volume}</td>
      </tr>
    )
  }
}

StockRow.propTypes = {
  ticker: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired
};

export default StockRow;