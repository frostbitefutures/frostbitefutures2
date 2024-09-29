console.log("Small viewport script is running...");

// Function to reduce card size and card font when viewport is small, as well as hide the product description
export function smallCard() {
  // querySelectorAll selects all elements with th class bullion-card
  // whereas querySelector only selects the first element with the class
  const myCard = document.querySelectorAll(".bullion-card");
  console.log("Number of bullion cards found:", myCard.length);
  const viewport = window.matchMedia("(max-width: 580px");

  // myCard returns a nodelist, so we need to iterate through it
  myCard.forEach((card) => {
    // Check for null and stop if true
    if (!card || !card.classList) {
      console.error("Element found without classlist property");
      return;
    }

    // Check is viewport is small, add class if true or remove class if false
    if (viewport.matches) {
      card.classList.add("small-bullion-card");
    } else {
      card.classList.remove("small-bullion-card");
    }
  });
}
// Call the function on both page load and resize
window.addEventListener("load", smallCard);
window.addEventListener("resize", smallCard);
