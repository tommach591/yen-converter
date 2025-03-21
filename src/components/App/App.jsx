import "./App.css";
import Table from "../Table";
import { useEffect, useState } from "react";
import { getRates } from "../../utils/CurrencyRates";

function App() {
  const [JPYRates, setJPYRates] = useState();

  /* Set JPY Rates on load */
  useEffect(() => {
    const storedString = localStorage.getItem("JPYRates");
    let storedData = null;
  
    try {
      storedData = storedString ? JSON.parse(storedString) : null;
    } catch (error) {
      console.error("Error parsing stored JPYRates:", error);
    }
    const todayUTC = new Date().setUTCHours(0, 0, 0, 0); // Simplified today's date UTC
    const targetDateUTC = storedData ? new Date(storedData?.time_next_update_utc).getTime() : 0;
  
    const fetchData = async () => {
      try {
        if (storedData) setJPYRates(storedData);
  
        const res = await getRates();
        setJPYRates(res);
        localStorage.setItem("JPYRates", JSON.stringify(res));
      } catch (error) {
        if (storedData) {
          setJPYRates(storedData);
        } else {
          console.error("Error fetching JPY Rates:", error);
        }
      }
    };
  
    if (storedData && todayUTC < targetDateUTC) {
      setJPYRates(storedData);
    } else {
      fetchData();
    }
  }, []);

  return JPYRates ? (
    <div className="App">
      <Table JPYRates={JPYRates} />
    </div>
  ) : (
    <div className="App Load">
      <h1>Loading data...</h1>
      <button onClick={() => {
        localStorage.clear();
        window.location.reload(false);
      }
      }>
        Clear Local Storage
      </button>
      </div>
  );
}

export default App;

