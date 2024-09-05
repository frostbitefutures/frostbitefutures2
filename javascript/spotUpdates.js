export function updateTroyForm() {
  console.log("Troy form is running...");

  // Function to clean up the price and convert it to a number
  function cleanPrice(priceText) {
    return parseFloat(priceText.replace(/[,$]/g, ""));
  }

  const goldSpot = cleanPrice(
    document.getElementById("goldSpotPrice").textContent
  );
  const silverSpot = cleanPrice(
    document.getElementById("silverSpotPrice").textContent
  );
  const platinumSpot = cleanPrice(
    document.getElementById("platinumSpotPrice").textContent
  );
  const palladiumSpot = cleanPrice(
    document.getElementById("palladiumSpotPrice").textContent
  );

  console.log(goldSpot, silverSpot, platinumSpot, palladiumSpot);

  const ozTroyValue = document.getElementById("ozType").value.toLowerCase();

  // Update Troy Oz Form
  if (ozTroyValue === "silver") {
    document.getElementById("troySpotPrice").value = silverSpot;
  } else if (ozTroyValue === "gold") {
    document.getElementById("troySpotPrice").value = goldSpot;
  } else if (ozTroyValue === "platinum") {
    document.getElementById("troySpotPrice").value = platinumSpot;
  } else {
    document.getElementById("troySpotPrice").value = palladiumSpot;
  }
}

export function updateGramForm() {
  console.log("Gram form is running...");

  // Function to clean up the price and convert it to a number
  function cleanPrice(priceText) {
    return parseFloat(priceText.replace(/[,$]/g, ""));
  }

  const goldSpot = cleanPrice(
    document.getElementById("goldSpotPrice").textContent
  );
  const silverSpot = cleanPrice(
    document.getElementById("silverSpotPrice").textContent
  );
  const platinumSpot = cleanPrice(
    document.getElementById("platinumSpotPrice").textContent
  );
  const palladiumSpot = cleanPrice(
    document.getElementById("palladiumSpotPrice").textContent
  );

  console.log(goldSpot, silverSpot, platinumSpot, palladiumSpot);

  const ozGramValue = document
    .getElementById("metalTypeGram")
    .value.toLowerCase();

  // Update Gram Weight Form
  if (ozGramValue === "silver") {
    document.getElementById("spotPriceGram").value = silverSpot;
  } else if (ozGramValue === "gold") {
    document.getElementById("spotPriceGram").value = goldSpot;
  } else if (ozGramValue === "platinum") {
    document.getElementById("spotPriceGram").value = platinumSpot;
  } else {
    document.getElementById("spotPriceGram").value = palladiumSpot;
  }
}

// Event listener for Troy Oz Form
document.getElementById("ozType").addEventListener("input", updateTroyForm);

// Event listener for Gram Weight Form
document
  .getElementById("metalTypeGram")
  .addEventListener("input", updateGramForm);
