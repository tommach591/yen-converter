import "./Collapsible.css";
import currencySymbol from "currency-symbol";
import he from "he";
import { useState } from "react";

function Collapsible({ JPYRates, currency, list, isTrue }) {
  const [isCollapsed, setIsCollapsed] = useState(isTrue);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return isCollapsed ? (
    <div className="Collapsible" onClick={() => toggleCollapse()}>
      <div className="Row Group" key={list[0]}>
        <div>{`¥${list[0].toLocaleString()}`}</div>
        <div>
          {`${
            currencySymbol.symbol(currency)
              ? he.decode(currencySymbol.symbol(currency))
              : ""
          }${(
            Math.round(list[0] * JPYRates.rates[currency] * 100) / 100
          ).toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
        </div>
      </div>
    </div>
  ) : (
    <div className="Collapsible">
      {list.map((val, i) => {
        return (
          <div
            className={i === 0 ? "Row Group" : "Row"}
            key={val}
            onClick={i === 0 ? () => toggleCollapse() : () => {}}
          >
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

export default Collapsible;
