export function getFilteredData(data, queryObj) {
  let filteredData = data;
  for (let [key, value] of Object.entries(queryObj)) {
    filteredData = filteredData.filter(
      (dataObj) => dataObj[key] === JSON.parse(value)
    );
  }
  return filteredData;
}
