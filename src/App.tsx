import { useState } from "react";
import Button from "react-bootstrap/Button";

function App() {
  const defaultCurrency = {
    from: "USD",
    to: "PLN",
    value: 0,
  };
  const exchangeRates = {
    USDtoPLN: 4,
    PLNtoUSD: 0.25,
  };
  const [currency, setCurrency] = useState(defaultCurrency);
  const [result, setResult] = useState(0);
  const [hide, setHide] = useState(true);
  const [error, setError] = useState(false);

  const calculate = () => {
    if (currency.value) {
      if (currency.from === "USD" && currency.to === "PLN") {
        const result = currency.value * exchangeRates.USDtoPLN;
        setResult(result);
      } else if (currency.from === "PLN" && currency.to === "USD") {
        const result = currency.value * exchangeRates.PLNtoUSD;
        setResult(result);
      }
      setError(false);
      setHide(false);
    } else {
      setError(true);
      setHide(false);
    }
    console.log(currency.value);
  };
  const swap = () => {
    if (currency.value) {
      setHide(true);
      setError(false);
      const newCurrency = { ...currency, from: currency.to, to: currency.from };
      setCurrency(newCurrency);
    } else {
      setHide(false);
      setError(true);
    }
  };

  const getUserValue = (e: any) => {
    const value = e.target.value;
    const wantToCalculate = value !== "0"; // Sprawdzamy, czy wartość jest różna od "0"

    if (!value || !wantToCalculate) {
      setError(true);
      setHide(false);
    } else {
      setHide(true);
      setError(false);
    }
    const newCurrency = { ...currency, value: value };
    setCurrency(newCurrency);
  };
  const displayResult = () => {
    if (error) return "Insert correct value";
    else return `${currency.value} ${currency.from} = ${result} ${currency.to}`;
  };
  return (
    <div className="app-container">
      <header>
        <h1 className="title">Currency calculator</h1>
      </header>
      <main className="display">
        <h2 hidden={hide} id="result">
          {displayResult()}
        </h2>

        <label htmlFor="input-value">Insert value: </label>
        <input
          placeholder="How much?"
          type="number"
          name="currency-value"
          id="input-value"
          onChange={getUserValue}
          min={0}
          max={99999}
        />
        <p className="from-currency">
          I want to convert {currency.value}{" "}
          <span id="from">{currency.from}</span> to{" "}
          <span id="to">{currency.to}</span>.
        </p>
      </main>
      <footer>
        <Button onClick={calculate} variant="success">
          Convert
        </Button>
        <Button onClick={swap} variant="primary">
          Swap
        </Button>
      </footer>
    </div>
  );
}

export default App;
