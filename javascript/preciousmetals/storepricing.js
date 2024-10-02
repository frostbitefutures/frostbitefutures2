// Import product library
import { bullionProducts } from "../../javascript/preciousmetals/products.js";
console.log("Product Library Imported");

// Function to update website pricing each time the user loads the webpage
export function updateStorePricing() {
  // This ensures the html page is fully loaded before the functions begin to access any elements, preventing errors from occuring
  document.addEventListener("DOMContentLoaded", () => {
    // Function to cleanup spot prices
    function cleanPrice(priceText) {
      return parseFloat(priceText.replace(/[,$]/g, ""));
    }

    function performPricingUpdate() {
      // Apply function to spot prices and store values as a const variable
      const goldSpotElement =
        document.getElementById("goldSpotPrice").textContent;
      const silverSpotElement =
        document.getElementById("silverSpotPrice").textContent;
      const platinumSpotElement =
        document.getElementById("platinumSpotPrice").textContent;

      // Log the spot prices to the console for debugging purposes
      console.log(goldSpotElement, silverSpotElement, platinumSpotElement);

      const goldSpot = cleanPrice(goldSpotElement);
      const silverSpot = cleanPrice(silverSpotElement);
      const platinumSpot = cleanPrice(platinumSpotElement);

      console.log(
        `Cleaned spot prices are: ${goldSpot}, ${silverSpot} and ${platinumSpot}`
      );

      // Function to calculate product price if metal = gold
      function calculateGoldPrice(weight, premium) {
        return (goldSpot + premium) * weight;
      }

      // Function to calculate product price if metal = silver
      function calculateSilverPrice(weight, premium) {
        return (silverSpot + premium) * weight;
      }

      // Function to calculate product price if metal = platinum
      function calculatePlatinumPrice(weight, premium) {
        return (platinumSpot + premium) * weight;
      }

      // Function to iterate through the product array and find matches
      // ForEach method executes the provided function ONCE for each array element
      bullionProducts.forEach((product) => {
        // This finds the html element whose ID matches the ID  of the product currently being looped through the function.
        // Then stores the reference to the html element
        // productElement now holds the reference to the <h5> element with ID 1ozGB
        const productElement = document.getElementById(product.id);

        // After it finds a match, it will store the needed properties of the array element into a variable
        if (productElement) {
          const name = product.name;
          const metal = product.metal;
          const weight = product.weight;
          const premium = product.premium;

          // Calculate the product price
          // Switch case to determine metal type and calculate price
          let price;
          // switch evaluates the metal variable
          switch (metal) {
            // each case checks if the value of "metal" matches the specified case value
            case "Gold":
              price = calculateGoldPrice(weight, premium).toFixed(2);
              // if a match is found, a break statement is used to stop the rest of the code from being executed
              break;
            case "Silver":
              price = calculateSilverPrice(weight, premium).toFixed(2);
              break;
            case "Platinum":
              price = calculatePlatinumPrice(weight, premium).toFixed(2);
              break;
            default:
              console.error("Invalid metal type");
              return;
          }

          // Update HTML elements using the new variables
          // Update Price
          const priceValueElement = productElement
            .closest(".card")
            .querySelector(".price-value");
          if (priceValueElement) {
            priceValueElement.textContent = `$${price}`;
          }

          // Update Name
          const nameValueElement = productElement
            .closest(".card-body")
            .querySelector(".card-title");
          if (nameValueElement) {
            nameValueElement.textContent = `${name}`;
          }
        }
      });
    }

    // Perform initial pricing update
    performPricingUpdate();

    // Update pricing every 15 minutes
    const updateInterval = 15 * 60 * 1000;
    setInterval(performPricingUpdate, updateInterval);

    // Check for visibility change to call the pricing function and update prices when the user returns to the page
    document.addEventListener("visibilitychange", () => {
      if (document.visbilityState === "visibile") {
        performPricingUpdate();
      }
    });
  });
}

// Call the function once the user opens the page
updateStorePricing();
