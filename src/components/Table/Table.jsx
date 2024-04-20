import Collapsable from "../Collapsible";
import "./Table.css";
import { useEffect, useState } from "react";

function Table({ JPYRates }) {
  const [currency, setCurrency] = useState("USD");
  const listOfCurrency = ["USD", "CAD", "AUD", "EUR", "CNY"];

  const set1 = Array.from({ length: 9 }, (_, i) => (i + 1) * 100);
  const set2 = Array.from({ length: 18 }, (_, i) => 1000 + i * 500);
  const set3 = Array.from({ length: 15 }, (_, i) => 10000 + i * 1000);
  const set4 = Array.from({ length: 25 }, (_, i) => 25000 + i * 1000);
  const set5 = Array.from({ length: 25 }, (_, i) => 50000 + i * 1000);
  const set6 = Array.from({ length: 25 }, (_, i) => 75000 + i * 1000);
  const set7 = Array.from({ length: 15 }, (_, i) => 100000 + i * 10000);
  const set8 = Array.from({ length: 25 }, (_, i) => 250000 + i * 10000);
  const set9 = Array.from({ length: 25 }, (_, i) => 500000 + i * 10000);
  const set10 = Array.from({ length: 26 }, (_, i) => 750000 + i * 10000);

  const sets = [set1, set2, set3, set4, set5, set6, set7, set8, set9, set10];

  useEffect(() => {
    const storedData = localStorage.getItem("currency");
    if (storedData) setCurrency(storedData);
  }, []);

  return (
    <div className="Table">
      <div className="Row Group">
        <div>JYP</div>
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
      {sets.map((set, i) => {
        return (
          <Collapsable
            key={i}
            JPYRates={JPYRates}
            currency={currency}
            list={set}
            isTrue={i > 0}
          />
        );
      })}
    </div>
  );
}

export default Table;
