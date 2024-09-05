import { bullionProducts } from "../javascript/products.js";

// Debouncing function to limit how often input handlers run
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// This function filters the users input
export function userFilter() {
  console.log("userFilter script is running..");

  // Select the input field and the suggestions container
  const inputField = document.getElementById("productSearch");
  const datalist = document.getElementById("productSuggestions");
  const weightField = document.getElementById("weightSearch");
  const spotPrice = document.getElementById("spotPriceSearch");

  // This function displays suggestions based on the users input
  function displaySuggestions() {
    // Clear previous suggestions
    while (datalist.firstChild) {
      datalist.removeChild(datalist.firstChild);
    }

    // Get user's input
    const userInput = inputField.value.toLowerCase();

    // Exit early if User input is empty
    if (userInput === "") {
      return console.error("User input is empty");
    }

    // Filter products based on user's input
    const filteredProducts = bullionProducts.filter((product) =>
      product.name.toLowerCase().includes(userInput)
    );

    // Display the filtered products
    filteredProducts.forEach((product) => {
      const option = document.createElement("option");
      option.value = product.name;
      option.dataset.weight = product.weight;
      option.dataset.metal = product.metal;
      datalist.appendChild(option);
    });
  }

  // This function updates the weight & spot field based on the selected product
  function updateWeightSpot() {
    const selectedOption = datalist.querySelector(
      `option[value="${inputField.value}"]`
    );

    if (selectedOption) {
      // Update the weight field or clear it if no selection matches
      weightField.value = selectedOption.dataset.weight || "";

      // Function to extract the numeric value from the span text
      const getNumericValue = (elementId) => {
        const text = document.getElementById(elementId).textContent;
        return parseFloat(text.replace(/[^0-9.-]+/g, ""));
      };

      // Update the spot price field based on the metal type
      if (selectedOption.dataset.metal === "Silver") {
        spotPrice.value = getNumericValue("silverSpotPrice");
      } else if (selectedOption.dataset.metal === "Gold") {
        spotPrice.value = getNumericValue("goldSpotPrice");
      } else if (selectedOption.dataset.metal === "Platinum") {
        spotPrice.value = getNumericValue("platinumSpotPrice");
      } else {
        spotPrice.value = getNumericValue("palladiumSpotPrice");
      }

      // Log results
      console.log("Selected product:", selectedOption.value);
      console.log("Weight:", weightField.value);
      console.log("Spot Price:", spotPrice.value);
    } else {
      weightField.value = "";
      spotPrice.value = "";
    }
  }

  // Add event listener for input field
  inputField.addEventListener("input", debounce(displaySuggestions, 300));
  inputField.addEventListener("change", updateWeightSpot);
}

// This function calculates the product premium based on the users product selection from the array
export function arrayPremiumCalculator(event) {
  event.preventDefault();
  console.log("arrayPremiumCalculator script is running..");

  const spotPriceValue = parseFloat(
    document.getElementById("spotPriceSearch").value
  );
  const weightValue = parseFloat(document.getElementById("weightSearch").value);
  const sellingPrice = parseFloat(
    document.getElementById("sellingPriceSearch").value
  );

  if (
    isNaN(spotPriceValue) ||
    spotPriceValue <= 0 ||
    isNaN(sellingPrice) ||
    sellingPrice <= 0
  ) {
    alert(
      "Invalid input. Please enter valid numbers for selling price and spot price."
    );
    return;
  }
  // Calculate per oz premium
  let premium;
  if (weightValue < 1) {
    premium = (1 / weightValue) * sellingPrice - spotPriceValue;
  } else {
    premium = sellingPrice / weightValue - spotPriceValue;
  }

  // Calculate percentage premium
  const percentPremium = ((premium / spotPriceValue) * 100).toFixed(2);

  document.getElementById("premiumResultSearch").value = premium.toFixed(2);
  document.getElementById("percentResultSearch").value = percentPremium;
  document.getElementById("resultContainerSearch").style.display = "block";
  console.log("Premium:", premium);
  console.log("Percent Premium:", percentPremium);
}

// Event listener for reset button
document
  .getElementById("bullionLibrary")
  .addEventListener("reset", function () {
    document.getElementById("resultContainerSearch").style.display = "none";
    datalist.innerHTML = "";
    inputField.value = "";
    weightField.value = "";
    spotPrice.value = "";
  });

// Event listener for when the user begins filtering for a product
document.getElementById("productSearch").addEventListener("input", userFilter);

// Event listener for when the user clicks calculate premium
document
  .getElementById("bullionLibrary")
  .addEventListener("submit", arrayPremiumCalculator);

// Console log showing javascript file has imported
console.log("arrayPrem2 has successfully imported...");
