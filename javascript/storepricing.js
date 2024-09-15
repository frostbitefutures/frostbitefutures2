// Import product library
import { bullionProducts } from "../javascript/products.js";
console.log("Product Library Imported");

// Function to cleanup spot prices
function cleanPrice(priceText) {
  return parseFloat(priceText.replace(/[,$]/g, ""));
}

// Apply function to spot prices and store values as a const variable
const goldSpot = cleanPrice(
  document.getElementById("goldSpotPrice").textContent
);
const silverSpot = cleanPrice(
  document.getElementById("silverSpotPrice").textContent
);
const platinumSpot = cleanPrice(
  document.getElementById("platinumSpotPrice").textContent
);

function priceProducts() {
  // Function to iterate throught the array and store the products in variables
  bullionProducts.forEach((product) => {
    const productName = product.name;
    const productId = product.id;
    const productMetal = product.metal;
    const productWeight = product.weight;
  });

  // Find matches between stored products and website products
}
