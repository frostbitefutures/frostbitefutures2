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
  // auto height ensures any previous fixed heights are removed, so it only uses the natural height of the card based on content
  bullionCard.forEach((card) => {
    card.style.height = "auto";
  });

  // Iterate through all the cards and find the cards with the tallest height
  // offsetHeight is a property that returns the height of an element, including content and padding
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
  // Before setting a new timeout, the existing timeout is cleared. This ensures multiple resize events are fired in quick succession
  clearTimeout(resizeTimeout);
  // A new timeout is set to call the equalHeight function
  resizeTimeout = setTimeout(equalHeight, 100); // Delay of 100 ms
}

// Call the function on page load and resize
window.addEventListener("load", equalHeight);
window.addEventListener("resize", throttleResize);
