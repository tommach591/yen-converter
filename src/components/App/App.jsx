import "./App.css";
import Table from "../Table";
import { useEffect, useState } from "react";
import { getRates } from "../../utils/CurrencyRates";

function App() {
  const [JPYRates, setJPYRates] = useState();

  /* Set JPY Rates on load */
  useEffect(() => {
    // localStorage.clear();
    const storedData = JSON.parse(localStorage.getItem("JPYRates"));
    const todayUTC = new Date(
      Date.UTC(
        new Date().getUTCFullYear(),
        new Date().getUTCMonth(),
        new Date().getUTCDate(),
        0,
        0,
        0,
        0
      )
    );
    const targetDateUTC = new Date(storedData?.time_next_update_utc);

    const fetchData = async () => {
      try {
        getRates().then((res) => {
          setJPYRates(res);
          localStorage.setItem("JPYRates", JSON.stringify(res));
        });
      } catch (error) {
        if (storedData) {
          console.log("using last data");
          setJPYRates(storedData);
        } else console.error("Error fetching JPY Rates:", error);
      }
    };
    fetchData();
    if (todayUTC < targetDateUTC) {
      /* Using last fetched data */
      console.log("Cached");
      setJPYRates(storedData);
    } else {
      /* Fetching new data */
      console.log("Fetched");
      fetchData();
    }
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

