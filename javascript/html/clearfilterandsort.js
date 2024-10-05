// Import bullionFilter() function
import { bullionFilter } from "./bullionfilter.js";

// Import bullionSort() function
import { bullionSort } from "./bullionsort.js";

export function clearFilterSort() {
  // Call the bullionFilter function with the default filter All
  bullionFilter("All");

  // Call the bullionSort function with the weightAsc()
  bullionSort("priceasc");
}

// Ensure the script runs when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Target the clear button and store in variable
  const clearButton = document.getElementById("filterReset");

  // add event listener and call clearFilterSort function
  clearButton.addEventListener("click", clearFilterSort);
});
