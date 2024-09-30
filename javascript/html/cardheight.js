export function equalHeight() {
  // Select all elements with the bullion card
  //This query selector returns a nodelist, which we can iterate through
  const bullionCard = document.querySelectorAll(".bullion-card");
  let cardMaxHeight = 0;

  // Check first if there are any cards to process
  if (bullionCard.length === 0) {
    console.error("No Bullion cards found");
    return;
  } else {
    console.log(`Number of bullion cards found: ${bullionCard.length}`);
  }
  // Reset the heights
  bullionCard.forEach((card) => {
    card.style.height = "auto"; // This resets the height before calculating the new height
  });

  // Iterate through all the cards and find the cards with the tallest height
  bullionCard.forEach((card) => {
    const cardHeight = card.offsetHeight;
    if (cardHeight > cardMaxHeight) {
      cardMaxHeight = cardHeight;
    }
  });
  // Set all cards to be the same height as the tallest card
  bullionCard.forEach((card) => {
    card.style.height = `${cardMaxHeight}px`; // Set the height to the calculated height
  });
}
// Throttle the function to improve resize performance
let resizeTimeout;
function throttleResize() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(equalHeight, 500); // Delay of 500 ms
}

// Call the function on page load and resize
window.addEventListener("load", equalHeight);
window.addEventListener("resize", throttleResize);
