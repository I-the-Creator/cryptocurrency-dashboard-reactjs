import { useState } from "react";
import axios from "axios";
import ExchangeRate from "../ExchangeRate/ExchangeRate";

const CurrencyConverter = () => {
  const currencies = ["BTC", "ETH", "USD", "XRP", "LTC", "ADA", 'RUB'];
  const [chosenPrimaryCurrency, setChosenPrimaryCurrency] = useState("BTC");
  const [chosenSecondaryCurrency, setChosenSecondaryCurrency] = useState("USD");
  // const [exchangeRate, setExchangeRate] = useState(0);
  // const [primaryCurrencyExchanged, setPrimaryCurrencyExchanged] = useState("BTC");
  // const [secondaryCurrencyExchanged, setSecondaryCurrencyExchanged] = useState("USD");
  const [exchangedData, setExchangedData] = useState({
    primaryCurrency: 'BTC',
    secondaryCurrency: 'USD',
    exchangeRate: 0
  })
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(0);

  //   console.log(chosenPrimaryCurrency);
  //   console.log(chosenSecondaryCurrency);
  //   console.log(amount);

  // Request to backend and passing parameters through
  const convert = () => {
    const options = {
      method: "GET",
      url: "http://localhost:8000/converter",
      params: {
        from_currency: chosenPrimaryCurrency,
        function: "CURRENCY_EXCHANGE_RATE",
        to_currency: chosenSecondaryCurrency,
      },
    };

    axios
      .request(options)
      .then((response) => {
        console.log(response.data);  // getting the exchange rate
        // setExchangeRate(response.data);
        setResult(response.data * amount);
        // setPrimaryCurrencyExchanged(chosenPrimaryCurrency);
        // setSecondaryCurrencyExchanged(chosenSecondaryCurrency);
        setExchangedData({
          primaryCurrency: chosenPrimaryCurrency,
          secondaryCurrency: chosenSecondaryCurrency,
          exchangeRate: response.data
        })
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="currency-converter">
      <h2>Currency Converter</h2>
      <div className="input-box">
        <table>
          <tbody>
            <tr>
              <td>Primary Currency:</td>
              <td>
                <input
                  type="number"
                  name="currency-amount-1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </td>
              <td>
                <select
                  name="currency-option-1"
                  value={chosenPrimaryCurrency}
                  className="currency-options"
                  onChange={(event) =>
                    setChosenPrimaryCurrency(event.target.value)
                  }
                >
                  {currencies.map((currency, _index) => (
                    <option key={_index}>{currency}</option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td>Secondary Currency:</td>
              <td>
                <input
                  type="number"
                  name="currency-amount-2"
                  value={result}
                  disabled={true}
                />
              </td>
              <td>
                <select
                  name="currency-option-2"
                  value={chosenSecondaryCurrency}
                  className="currency-options"
                  onChange={(event) =>
                    setChosenSecondaryCurrency(event.target.value)
                  }
                >
                  {currencies.map((currency, _index) => (
                    <option key={_index}>{currency}</option>
                  ))}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <button id="convert-button" onClick={convert}>
          Convert
        </button>
      </div>

      <ExchangeRate 
        exchangedData={exchangedData}
      />
    </div>
  );
};

export default CurrencyConverter;
