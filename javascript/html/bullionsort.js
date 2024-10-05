console.log("Bullion sort script has loaded successfully.");

function getVisibleCards() {
  // querySelectorAll returns a node list of all bullion card elements
  const allCards = document.querySelectorAll(".bullion-card");

  // Create an array of visible cards
  return Array.from(allCards).filter(
    (card) => window.getComputedStyle(card).display !== "none"
  );
}

function priceDesc() {
  // call the getVisibleCards function
  const visibleCards = getVisibleCards();
  // Create an array of objects, containng the card and it's price
  const cardData = visibleCards.map((card) => {
    // Select the price of the card and its symbols
    const priceText = card.querySelector(".price-value").textContent;
    // Remove all symbols and currencies from priceText
    const price = parseFloat(priceText.replace(/[^0-9.-]+/g, ""));
    // the function returns an object for each card, with includes two properties: card and price
    // result is stored in the cardData variable
    return { card, price };
  });

  // Sort the array of objects from cardData based on their price property
  // Sort function below uses a comparison function that takes 2 args; usually a and b
  // If the result of b - a is positive, then b is greater than a, and should come first
  // If the result of b - a is negative, than a is greater than b, and b should go after a
  // If the result of b - a is 0, then a and b are equal, and should be treated as equal
  cardData.sort((a, b) => b.price - a.price);

  // Get the parent container of the cards
  const container = visibleCards[0].closest(".row");

  // Rearrange the cards in the DOM
  cardData.forEach((item) => {
    container.appendChild(item.card.closest(".col"));
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

function priceAsc() {
  // call the getVisibleCards function to get all visible cards
  const visibleCards = getVisibleCards();
  // Create an array of objects, containing the card and it's price
  const cardData = visibleCards.map((card) => {
    // Select the price text
    const priceText = card.querySelector(".price-value").textContent;

    // Remove the symbols and non-numerics
    const price = parseFloat(priceText.replace(/[^0-9.-]+/g, ""));

    // Store the result in an array
    return { card, price };
  });

  // sort the data
  cardData.sort((a, b) => a.price - b.price);
}

export function bullionSort(sort) {
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
      // gets the value of the data-sort attribute
      const sort = event.target.getAttribute("data-sort");
      console.log(sort);
      // Uses the retrieved value to call the bullionSort function
      bullionSort(sort);
    });
  });
});
