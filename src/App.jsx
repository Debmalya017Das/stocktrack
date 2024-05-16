import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import StockRow from './components/StockRow';
import './App.css';
import { AuthProvider } from './components/authprovider';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      fetchStockData(searchQuery);
    }
  }, [searchQuery]);

  const fetchStockData = async (query) => {
    try {
      const response = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=0N15IMVJXC7ECA3F`);
      const data = await response.json();
      console.log('Fetched stock data:', data);

      if (data && data.bestMatches && Array.isArray(data.bestMatches)) {
        setStockData(data.bestMatches);
      } else {
        console.error('Invalid stock data format:', data);
      }
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  const renderSearchBar = () => {
    return (
      <input
        type="text"
        placeholder="Search by ticker symbol"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="form-control mb-3"
      />
    );
  };

  return (
    <AuthProvider>
      <div className="App">
        <div className='container'>
          {renderSearchBar()}

          <Table className='table mt-5'>
            <thead>
              <tr>
                <th>ticker</th>
                <th>Time</th>
                <th>open</th>
                <th>high</th>
                <th>low</th>
                <th>close</th>
                <th>volume</th>
              </tr>
            </thead>

            <tbody>
              {stockData.map((stock, index) => (
                <StockRow key={index} query={searchQuery} {...stock} />
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
