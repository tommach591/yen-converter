import "./Collapsible.css";
import currencySymbol from "currency-symbol";
import he from "he";
import { useState } from "react";

function Collapsible({ JPYRates, currency, list, isTrue }) {
  const [isCollapsed, setIsCollapsed] = useState(isTrue);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`Collapsible ${isCollapsed ? "Collapsed" : "Expanded"}`}>
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
                  src={`https://api.iconify.design/material-symbols:arrow-drop-${
                    isCollapsed ? "down" : "up"
                  }.svg?color=%23ffffff`}
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
