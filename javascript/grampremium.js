export function gramPremiumCalculator(event) {
  event.preventDefault();

  const spotPrice = parseFloat(
    document.querySelector('input[id="spotPriceGram"]').value
  );
  const weight = parseFloat(
    document.querySelector('input[id="weightGram"]').value
  );
  const sellingPrice = parseFloat(
    document.querySelector('input[id="sellingPriceGram"]').value
  );

  // Verify the user inputted acceptable values
  if (
    isNaN(spotPrice) ||
    isNaN(weight) ||
    isNaN(sellingPrice) ||
    sellingPrice < 0 ||
    weight <= 0 ||
    spotPrice <= 0
  ) {
    // alert the user they made a mistake
    alert(
      "Invalid input. Please enter valid numbers for selling price, weight, and spot price."
    );
    return; // end the function
  }

  // Calculate the premium using the formula below. Two formulas available
  let premium;

  if (weight >= 32) {
    premium = sellingPrice / (weight / 31.103) - spotPrice;
  } else if (weight > 0 && weight < 32) {
    premium = (1 / (weight / 31.103)) * sellingPrice - spotPrice;
  } else {
    alert("Invalid weight. Please enter a weight greater than 0.");
    return;
  }
  // Calculate the premium in percentage
  const percentPremium = (premium / spotPrice) * 100;

  // Display per oz results to the user
  document.getElementById("premiumResultGram").value = premium.toFixed(2);
  // Dipslay per oz block since it's initially hidden
  document.getElementById("resultContainerGram").style.display = "block";

  // Display the percentage premium to the user
  document.getElementById("premiumResultGramPercent").value =
    percentPremium.toFixed(2);
}

document
  .getElementById("calculatorFormGram")
  .addEventListener("submit", gramPremiumCalculator);
