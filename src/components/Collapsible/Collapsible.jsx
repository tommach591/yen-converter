import "./Collapsible.css";
import currencySymbol from "currency-symbol";
import he from "he";
import { useState } from "react";

function Collapsible({ JPYRates, currency, list, isTrue }) {
  const [isOpen, setIsOpen] = useState(isTrue);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return !isOpen ? (
    <div className="Collapsible" onClick={() => toggleCollapse()}>
      <div className="Row Group" key={list[0]}>
        <div className="Child">{`¥${list[0].toLocaleString()}`}</div>
        <div className="Child">
          {`${
            currencySymbol.symbol(currency)
              ? he.decode(currencySymbol.symbol(currency))
              : ""
          }${(
            Math.round(list[0] * JPYRates.rates[currency] * 100) / 100
          ).toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
        </div>
        <div className="Arrow">
          <img
            src="https://api.iconify.design/material-symbols:arrow-drop-down.svg?color=%23ffffff"
            alt=""
          />
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
            <div className="Child">{`¥${val.toLocaleString()}`}</div>
            <div className="Child">
              {`${
                currencySymbol.symbol(currency)
                  ? he.decode(currencySymbol.symbol(currency))
                  : ""
              }${(
                Math.round(val * JPYRates.rates[currency] * 100) / 100
              ).toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
            </div>
            {i === 0 ? (
              <div className="Arrow">
                <img
                  src="https://api.iconify.design/material-symbols:arrow-drop-up.svg?color=%23ffffff"
                  alt=""
                />
              </div>
            ) : (
              <div />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Collapsible;
