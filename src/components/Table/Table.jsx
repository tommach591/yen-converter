import "./Table.css";
import currencySymbol from "currency-symbol";
import he from "he";
import Collapsable from "../Collapsible";
import { useEffect, useState } from "react";

function Table({ JPYRates }) {
  const [value, setValue] = useState(0);
  const [currency, setCurrency] = useState("USD");
  const listOfCurrency = ["USD", "CAD", "AUD", "EUR", "CNY", "KRW", "INR"];

  const sets = [
    Array.from({ length: 9 }, (_, i) => (i + 1) * 100),
    Array.from({ length: 8 }, (_, i) => 1000 + i * 500),
    Array.from({ length: 10 }, (_, i) => 5000 + i * 500),
    Array.from({ length: 10 }, (_, i) => 10000 + i * 1000),
    Array.from({ length: 10 }, (_, i) => 20000 + i * 1000),
    Array.from({ length: 10 }, (_, i) => 30000 + i * 1000),
    Array.from({ length: 10 }, (_, i) => 40000 + i * 1000),
    Array.from({ length: 10 }, (_, i) => 50000 + i * 5000),
    Array.from({ length: 10 }, (_, i) => 100000 + i * 10000),
    Array.from({ length: 10 }, (_, i) => 200000 + i * 10000),
    Array.from({ length: 10 }, (_, i) => 300000 + i * 10000),
    Array.from({ length: 10 }, (_, i) => 400000 + i * 10000),
    Array.from({ length: 11 }, (_, i) => 500000 + i * 50000),
  ];

  useEffect(() => {
    const storedData = localStorage.getItem("currency");
    if (storedData) setCurrency(storedData);
  }, []);

  return (
    <div className="Table">
      <div className="Row Group">
        <div className="Child">JYP</div>
        <label htmlFor="currencySelect" className="VisuallyHidden"></label>
        <select
          id="currencySelect"
          value={currency}
          onChange={(event) => {
            setCurrency(event.target.value);
            localStorage.setItem("currency", event.target.value);
          }}
        >
          {listOfCurrency.map((val) => {
            return (
              <option key={val} value={val}>
                {val}
              </option>
            );
          })}
        </select>
      </div>
      <div className="Row">
        <div
          className="Child"
          style={{ justifyContent: "center", paddingLeft: "0px" }}
        >
          <h1>¥</h1>
          <input
            type="number"
            value={value}
            onChange={(event) => {
              if (event.target.value > 0)
                setValue(event.target.value.replace(/^0+/, ""));
              else setValue(0);
            }}
          />
        </div>
        <div className="Child">
          {`${
            currencySymbol.symbol(currency)
              ? he.decode(currencySymbol.symbol(currency))
              : ""
          }${(
            Math.round(value * JPYRates.rates[currency] * 100) / 100
          ).toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
        </div>
      </div>
      {sets.map((set, i) => {
        return (
          <Collapsable
            key={i}
            JPYRates={JPYRates}
            currency={currency}
            list={set}
            isTrue={true}
          />
        );
      })}
    </div>
  );
}

export default Table;
