import "./Table.css";
import currencySymbol from "currency-symbol";
import he from "he";
import { useEffect, useState } from "react";

function Table({ JPYRates }) {
  const [currency, setCurrency] = useState("USD");
  const listOfCurrency = Object.keys(JPYRates.rates);
  const commonYenSpendings = [
    100, 200, 300, 400, 500, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000,
    9000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000, 100000,
    200000, 300000, 400000, 500000, 1000000,
  ];

  useEffect(() => {
    const storedData = localStorage.getItem("currency");
    if (storedData) setCurrency(storedData);
  }, []);

  return (
    <div className="Table">
      <div className="Row">
        <div>JYP</div>
        <select
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
      {commonYenSpendings.map((val) => {
        return (
          <div className="Row" key={val}>
            <div>{`¥${val}`}</div>
            <div>
              {`${
                currencySymbol.symbol(currency)
                  ? he.decode(currencySymbol.symbol(currency))
                  : ""
              }${(
                Math.round(val * JPYRates.rates[currency] * 100) / 100
              ).toFixed(2)}`}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Table;
