console.log("Bullion sort script has loaded successfully.");

// This returns a node list of all bullion card elements
const allCards = document.querySelectorAll(".bullion-card");
// This creates an array from the node list to make it easier to work with
const visibleCards = Array.from(allCards).filter(
  (card) => window.getComputedStyle(card).display !== "none"
);

function priceDesc() {
  // Create an array of objects, containng the card and it's price
  const cardData = visibleCards.map((card) => {
    const priceText = card.querySelector(".price-value").textContent;
    // Remove all symbols and currencies from priceText
    const price = parseFloat(priceText.replace(/[^0-9.-]+/g, ""));
    return { card, price };
  });

  // Sort the array of objects in descending order based on the price
  cardData.sort((a, b) => b.price - a.price);

  // Get the parent container of the cards
  const container = visibleCards[0].parentNode;

  // Rearrange the cards in the DOM
  cardData.forEach((item) => {
    container.appendChild(item.card);
  });

  // Log the results
  cardData.forEach((item) => {
    console.log(
      `Product: ${item.card.querySelector(".card-title").textContent}, Price: ${
        item.card.querySelector(".price-value").textContent
      }`
    );
  });
}

export function bullionSort(sort) {
  // TODO: Implement sorting functionality

  // Document how the user wants to sort the products
  const userSort = sort.replace(/-/g, "");
  console.log(`Sorted products: ${userSort}`);

  // If statements to sort products based on the user's selection
  if (userSort === "pricedesc") {
    // Call priceDesc function
    console.log("Sorting by price in descending order");
    priceDesc();
  } else if (userSort === "priceasc") {
    // Call priceAsc function
    console.log("Sorting by price in ascending order");
    priceAsc();
  } else if (userSort === "weightdesc") {
    // Call weightDesc function
    console.log("Sorting by weight in descending order");
    weightDesc();
  } else {
    // Call weightAsc function
    console.log("Sorting by weight in ascending order");
    weightAsc();
  }
}

// Ensure the script runs when the dom is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Targets all button elements with the class "sort-item". Returns a node list
  const sortButtons = document.querySelectorAll(".sort-item");

  // Iterate through each button
  sortButtons.forEach((button) => {
    // Add a click event listener
    button.addEventListener("click", (event) => {
      const sort = event.target.getAttribute("data-sort");
      console.log(sort);
      bullionSort(sort);
    });
  });
});
