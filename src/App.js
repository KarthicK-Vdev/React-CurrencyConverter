import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [amount, setAmount]=useState(1);
  const [fromCurrency, setFromCurrency]=useState("INR")
  const [toCurrency, setToCurrency]=useState("USD")
  const [convertedAmount, setConvertedAmount]=useState(null)
  const [exchangeRate, setExchangeRate]=useState(null)

  useEffect(()=>{
    const getExchangeRate = async ()=>{
      try {
        let url=`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
        const response = await axios.get(url)

        setExchangeRate(response.data.rates[toCurrency])
      } catch (error) {
          console.log(error)
      }
    };
    getExchangeRate()
  },[fromCurrency, toCurrency])

  useEffect(()=>{
    if(exchangeRate!==null)
    {
      setConvertedAmount((amount * exchangeRate).toFixed(2))
    }
  },[amount, exchangeRate])

  const handleAmountChange=(e)=>{
    const value = parseFloat(e.target.value)
    setAmount(isNaN(value) ? 0 : value)
  }
  const handleFromCurrencyChange=(e)=>{
    setFromCurrency(e.target.value);
  }
  const handleToCurrencyChange=(e)=>{
    setToCurrency(e.target.value);
  }
  return (
    <div className='currency-converter'>
      <div className='box'></div>
        <div className='data'>
          <h1>Currency Converter</h1>
          <div className='input-container'>
            <label htmlFor='amt'>Amount:</label>
            <input type='number' id="amt" value={amount} onChange={handleAmountChange}></input>
          </div>
          <div className='input-container'>
            <label htmlFor='fromCurrency'>From Currency:</label>
            <select id="fromCurrency" value={fromCurrency} onChange={handleFromCurrencyChange}>
                <option value="USD">United States Dollar (USD)</option>
                <option value="EUR">Euro (EUR)</option>
                <option value="JPY">Japanese Yen (JPY)</option>
                <option value="GBP">British Pound Sterling (GBP)</option>
                <option value="AUD">Australian Dollar (AUD)</option>
                <option value="CAD">Canadian Dollar (CAD)</option>
                <option value="CHF">Swiss Franc (CHF)</option>
                <option value="CNY">Chinese Yuan (CNY)</option>
                <option value="INR">Indian Rupee (INR)</option>
                <option value="BRL">Brazilian Real (BRL)</option>
  </select>

          </div>
          <div className='input-container'>
            <label htmlFor='toCurrency'>To Currency:</label>
            <select id="fromCurrency" value={toCurrency} onChange={handleToCurrencyChange}>

                <option value="USD">United States Dollar (USD)</option>
                <option value="EUR">Euro (EUR)</option>
                <option value="JPY">Japanese Yen (JPY)</option>
                <option value="GBP">British Pound Sterling (GBP)</option>
                <option value="AUD">Australian Dollar (AUD)</option>
                <option value="CAD">Canadian Dollar (CAD)</option>
                <option value="CHF">Swiss Franc (CHF)</option>
                <option value="CNY">Chinese Yuan (CNY)</option>
                <option value="INR">Indian Rupee (INR)</option>
                <option value="BRL">Brazilian Real (BRL)</option>
  </select>

          </div>
          <div className='result'>
            <p>{amount} {fromCurrency} is equal to {convertedAmount} {toCurrency}</p>
          </div>
        </div>
      </div>
  );
}

export default App;
