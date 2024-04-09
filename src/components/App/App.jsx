import "./App.css";
import axios from "axios";
import Table from "../Table";
import { useEffect, useState } from "react";

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
        const response = await axios.get(
          "https://open.er-api.com/v6/latest/JPY"
        );
        setJPYRates(response.data);
        localStorage.setItem("JPYRates", JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching JPY Rates:", error);
      }
    };

    if (todayUTC < targetDateUTC) {
      /* Using last fetched data */
      setJPYRates(storedData);
    } else {
      /* Fetching new data */
      fetchData();
    }
  }, []);

  return JPYRates ? (
    <div className="App">
      <Table JPYRates={JPYRates} />
    </div>
  ) : (
    <div className="App">Loading data...</div>
  );
}

export default App;

