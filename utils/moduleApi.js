import axios from "axios";

export async function callApi(filterKey, filterValue) {
  try {
    const response = await axios.get(
      `https://script.google.com/macros/s/AKfycbwLbypFJAhGVXfGlRUdk5-ri_olZPwTIZfRvvTYLHPK3tDWUai7FdBlu1AKYdnlqaYrdA/exec?filterKey=${filterKey}&filterValue=${filterValue}`
    );
    return response.data;
  } catch (error) {
    console.error("Error calling API:", error);
    throw error;
  }
}
