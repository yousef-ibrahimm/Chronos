import axios from "axios";

export async function callStudentsApi(id) {
  try {
    const response = await axios.get(
      `https://script.google.com/macros/s/AKfycbzEf4MvqIJN7rdPgiJA_MMx_uIGrCJNcGItIGtb-9Ujc57kqZ6R6fsXDVZyxX16nTDNRA/exec?filterValue=${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error calling API:", error);
    throw error;
  }
}
