import "./App.css";
import Papa from "papaparse";
import { useEffect } from "react";
import CsvData from "./resources/test.csv";
function App() {
  useEffect(() => {
    const fetchParseData = async () => {
      Papa.parse(CsvData, {
        download: true,
        delimiter: ",",
        complete: (result) => {
          console.log(result.data);
        },
      });
    };
    fetchParseData();
  });
  return (
    <div className="App">
      <h1>Chronos</h1>
    </div>
  );
}

export default App;
