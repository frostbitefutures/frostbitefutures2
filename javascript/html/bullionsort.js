console.log("Bullion sort script has loaded successfully.");

// function that targets all bullion-card elements and returns an array of visible cards
function getVisibleCards() {
  // querySelectorAll returns a node list of all bullion card elements
  const allCards = document.querySelectorAll(".bullion-card");

  // Create an array of visible cards
  return Array.from(allCards).filter(
    (card) => window.getComputedStyle(card).display !== "none"
  );
}

// function that sorts products from highest --> lowest price
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

  // Get the parent row of the cards
  // visibleCards[0] refers to the first element in the visibleCards array
  // closest() is a dom method that traverses up the DOM tree from the element it is called on, and returns the closest match
  const parentRow = visibleCards[0].closest(".row");

  // Rearrange the cards in the DOM
  // We iterate through the sorted cardData array, and append each cards column element (col) to the parentRow container
  cardData.forEach((item) => {
    // For each item, the card property is accessed and the closest(col) method is called on this card element to find its closest ancestor element with the class col
    // appendChild adds the specified element to the end of the list of children of the parentRow element
    parentRow.appendChild(item.card.closest(".col"));
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

// function that sorts products from lowest --> highest price
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

  // get the parent row of the cards
  const parentRow = visibleCards[0].closest(".row");

  // Rearrange the cards in the DOM
  cardData.forEach((item) => {
    parentRow.appendChild(item.card.closest(".col"));
  });
}

// function that sorts products from highest --> lowest weight
function weightDesc() {
  // call the getVisibleCards function
  const visibleCards = getVisibleCards();
  // make an array with the card and it's weight
  const cardData = visibleCards.map((card) => {
    // Target the span with the data-weight attribute
    const weightElement = card.querySelector(
      ".product-description-text[data-weight"
    );
    // Now we can target the data-weight attribute and set its value to the weight variable
    const weight = weightElement.getAttribute("data-weight");
    // Return an array with 2 properties; card and weight
    return { card, weight };
  });
  console.log("Card Data:", cardData);

  // sort by weight, highest --> lowest
  cardData.sort((a, b) => b.weight - a.weight);

  // get the parent row
  const parentRow = visibleCards[0].closest(".row");

  // append to the parent row and rearrange the dom
  // Iterate through the array
  cardData.forEach((item) => {
    parentRow.appendChild(item.card.closest(".col"));
  });
}

// function that sorts products from lowest --> highest weight
function weightAsc() {
  // call getVisible cards function
  const visibleCards = getVisibleCards();

  // make a new array with the properties { card, weight}
  const cardData = visibleCards.map((card) => {
    // Target the span element that contains the data-weight attribute
    const weightElement = card.querySelector(
      ".product-description-text[data-weight]"
    );
    // Target the data-weight attribute and store its value into the weight variable
    const weight = weightElement.getAttribute("data-weight");

    // return the array
    return { card, weight };
  });

  // sort the array by weight, lowest --> highest
  cardData.sort((a, b) => a.weight - b.weight);

  // find the parent row
  const parentRow = visibleCards[0].closest(".row");

  // append and rearrange
  // iterate through the sorted array
  cardData.forEach((item) => {
    // append to the parentRow
    parentRow.appendChild(item.card.closest(".col"));
  });
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
