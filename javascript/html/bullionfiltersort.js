console.log("Filter and sort script has loaded successfully.");

// Function to filter bullion products based on user selection
export function bullionFilter(filter) {
  // TODO: Implement filter functionality

  // Put the filter to upper case to make the comparison case-insensitive
  const newFilter = filter.charAt(0).toUpperCase() + filter.slice(1);
  console.log(`Filtered products: ${newFilter}`);

  // Select all product cards
  const bullionCards = document.querySelectorAll(".bullion-card");
  bullionCards.forEach((card) => {
    // Store metal type of the current card
    const cardMetal = card.getAttribute("data-metal");

    // If metal type matches the current filter, show the card
    if (cardMetal === newFilter || newFilter === "All") {
      card.style.display = "block"; // Show the card
    } else {
      card.style.display = "none"; // Hide the card
    }
  });
}

// Ensure the script runs when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");
  // Add event listeners for each filter option
  // Select all filter button options
  const filterButtons = document.querySelectorAll(".filter-item");
  // iterate through each button
  filterButtons.forEach((button) => {
    // Add a click event listener to each button
    button.addEventListener("click", (event) => {
      // event.target refers to the button that was clicked
      // The complete line retrieves the value of the data-filter attribute of the clicked button
      const filter = event.target.getAttribute("data-filter");
      bullionFilter(filter);
    });
  });
});
