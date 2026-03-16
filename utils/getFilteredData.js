/**
 * Filters an array of objects based on query parameters.
 *
 * @param {Object[]} data - The array of data objects to filter
 * @param {Object} queryObj - Key-value pairs to filter by (e.g. { age: "30", active: "true" })
 * @returns {Object[]} Filtered array where each object matches all query key-value pairs
 */
export function getFilteredData(data, queryObj) {
  let filteredData = data;
  for (let [key, value] of Object.entries(queryObj)) {
    filteredData = filteredData.filter(
      (dataObj) => dataObj[key] === JSON.parse(value)
    );
  }
  return filteredData;
}
