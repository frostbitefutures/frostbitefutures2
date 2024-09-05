export function troyPremiumCalculator(event) {
  // Prevent default form submission
  event.preventDefault();

  // Get the form values inputted by the user
  // ParseFloat = used to convert a string to a floating point integer
  const spotPrice = parseFloat(document.getElementById("troySpotPrice").value);
  const weight = parseFloat(document.getElementById("weightTroy").value);
  const sellingPrice = parseFloat(
    document.getElementById("troySellingPrice").value
  );

  console.log(spotPrice);
  console.log(weight);
  console.log(sellingPrice);

  // Check if values are valid
  if (
    isNaN(sellingPrice) ||
    isNaN(weight) ||
    isNaN(spotPrice) ||
    sellingPrice < 0 ||
    weight <= 0 ||
    spotPrice <= 0
  ) {
    alert(
      "Invalid input. Please enter valid numbers for selling price, metal weight, and spot price."
    ); // Alert user if any input is not a number
    return; // Stop the function if any input is not a number
  }
  // let premium be undefined for now
  let premium;

  // Calculate premium using the given formula and metal weight
  if ((weight) => 1) {
    premium = sellingPrice / weight - spotPrice;
  } else if (weight > 0 && weight < 1) {
    premium = sellingPrice * (1 / weight) - spotPrice;
  } else {
    alert("Invalid metal weight. Please enter a weight greater than 0.");
    return;
  }

  // Caclculate the percentage premium
  const percentPremium = (premium / spotPrice) * 100;

  // Display the calculated premium and percentage premium in the respective fields.
  document.getElementById("premiumResultPercent").value =
    percentPremium.toFixed(2); // rounds to 2 decimals

  // Dipslay the calculated percentage premium to the user
  document.getElementById("premiumResultPercent").value =
    percentPremium.toFixed(2);

  // Once premium is calculated, display the result.
  document.getElementById("premiumResult").value = premium.toFixed(2); // rounds to 2 decimals
  document.getElementById("resultContainer").style.display = "block"; // Show the result container once the premium is calculated
}

// Call the function once the user clicks the calculate premium button
document
  .getElementById("calculatorForm")
  .addEventListener("submit", troyPremiumCalculator);
