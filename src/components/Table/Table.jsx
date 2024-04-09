import "./Table.css";
import currencySymbol from "currency-symbol";
import he from "he";
import { useEffect, useState } from "react";

function Table({ JPYRates }) {
  const [currency, setCurrency] = useState("USD");
  const listOfCurrency = Object.keys(JPYRates.rates);

  const commonYenSpendings = Array.from(
    { length: 10 },
    (_, i) => (i + 1) * 100
  ).concat(
    Array.from({ length: 18 }, (_, i) => 1000 + (i + 1) * 500),
    Array.from({ length: 90 }, (_, i) => 10000 + (i + 1) * 1000),
    Array.from({ length: 20 }, (_, i) => 100000 + (i + 1) * 10000)
  );

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
            <div>{`¥${val.toLocaleString()}`}</div>
            <div>
              {`${
                currencySymbol.symbol(currency)
                  ? he.decode(currencySymbol.symbol(currency))
                  : ""
              }${(
                Math.round(val * JPYRates.rates[currency] * 100) / 100
              ).toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Table;
