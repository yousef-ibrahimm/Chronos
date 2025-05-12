function doGet(e) {
  // Get the active spreadsheet and "ids" sheet
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName("ids");

  if (!ws) {
    // Return error if sheet does not exist
    return ContentService.createTextOutput(
      JSON.stringify({ status: 404, message: "Sheet 'ids' not found" })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  // Get all data from the sheet
  const data = ws.getDataRange().getValues();

  if (data.length < 2) {
    // Return error if no data or only headers exist
    return ContentService.createTextOutput(
      JSON.stringify({ status: 400, message: "No data available" })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  // Extract headers and rows
  const headers = data.shift();
  const jsonArray = data.map((row) => {
    let obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index];
    });
    return obj;
  });

  // Get query parameter for filtering
  const filterValue = e.parameter.filterValue; // Example: ?filterValue=123
  const filteredData = jsonArray.filter((row) => {
    if (!filterValue) return true; // Return all if no filter provided
    return (
      String(row["ID"]).toLowerCase() === String(filterValue).toLowerCase()
    );
  });

  // Prepare the response
  const response = { status: 200, data: filteredData };
  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(
    ContentService.MimeType.JSON
  );
}
