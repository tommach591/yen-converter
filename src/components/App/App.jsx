import "./App.css";
import Table from "../Table";
import { useEffect, useState } from "react";
import { getRates } from "../../utils/CurrencyRates";

function App() {
  const [JPYRates, setJPYRates] = useState();

  /* Set JPY Rates on load */
  useEffect(() => {
    getRates().then((res) => {
      setJPYRates(res);
    });
  }, []);

  return JPYRates ? (
    <div className="App">
      <Table JPYRates={JPYRates} />
    </div>
  ) : (
    <div className="App Load">Loading data...</div>
  );
}

export default App;

