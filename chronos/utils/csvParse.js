import { useEffect, useState } from "react";
import Papa from "papaparse";

const [data, setData] = useState([]);

useEffect(() => {
  const fetchParseData = async () => {
    const response = await fetch("./resources/test.csv");
    const csvText = await response.text();
    Papa.parse(csvText, {
      delimiter: ",",
      complete: (result) => {
        setData(result.data);
      },
    });
  };
  fetchParseData();
});
