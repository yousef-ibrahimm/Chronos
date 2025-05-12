function doGet(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName("master");
  const data = ws.getRange("A1").getDataRegion().getValues();
  const headers = data.shift();

  // Convert sheet data to JSON array
  const jsonArray = data.map((r) => {
    let obj = {};
    headers.forEach((h, i) => {
      obj[h] = r[i];
    });
    return obj;
  });

  // Get the query parameter (e.parameter.PARAM_NAME)
  const filterKey = e.parameter.filterKey; // Example parameter name
  const filterValue = e.parameter.filterValue; // Example parameter value

  // Apply filtering if parameters are provided
  const filteredData = jsonArray.filter((row) => {
    if (!filterKey || !filterValue) return true; // No filter, return all
    return (
      String(row[filterKey]).toLowerCase() === String(filterValue).toLowerCase()
    );
  });

  // Prepare the response
  const response = [{ status: 200, data: filteredData }];
  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(
    ContentService.MimeType.JSON
  );
}
