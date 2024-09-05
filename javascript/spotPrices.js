export async function fetchMetalRates() {
  try {
    const url =
      "https://api.metals.dev/v1/latest?api_key=X9MCTDEGEMCESCIPCDAK369IPCDAK&currency=USD&unit=toz";

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    });

    // Check if the response was OK (Status in the range 200 - 299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);

    // Accessing the metals property from the result object
    const { gold, silver, platinum, palladium } = result.metals;

    // Update DOM elements with fetched data
    document.getElementById("goldSpotPrice").textContent = `$${gold.toFixed(
      2
    )}`;
    document.getElementById("silverSpotPrice").textContent = `$${silver.toFixed(
      2
    )}`;
    document.getElementById(
      "platinumSpotPrice"
    ).textContent = `$${platinum.toFixed(2)}`;
    document.getElementById(
      "palladiumSpotPrice"
    ).textContent = `$${palladium.toFixed(2)}`;

    // Store the current timestamp and spot prices in localStorage
    const prices = { gold, silver, platinum, palladium };
    localStorage.setItem("lastFetchTime", Date.now().toString());
    localStorage.setItem("spotPrices", JSON.stringify(prices));

    // Log Results for review
    console.log(`Last Fetch Time: ${localStorage.getItem("lastFetchTime")}`);
    console.log(`Spot Prices Stored: ${localStorage.getItem("spotPrices")}`);
  } catch (error) {
    console.error("Error fetching spot prices.", error);
  }
}

// Function to load stored prices from local Storage
function loadStoredPrices() {
  const prices = JSON.parse(localStorage.getItem("spotPrices"));
  if (prices) {
    // Update DOM elements with stored prices
    document.getElementById(
      "goldSpotPrice"
    ).textContent = `$${prices.gold.toFixed(2)}`;
    document.getElementById(
      "silverSpotPrice"
    ).textContent = `$${prices.silver.toFixed(2)}`;
    document.getElementById(
      "platinumSpotPrice"
    ).textContent = `$${prices.platinum.toFixed(2)}`;
    document.getElementById(
      "palladiumSpotPrice"
    ).textContent = `$${prices.palladium.toFixed(2)}`;
  }
}

// Function to check if we should fetch new rates
function shouldFetchRates() {
  const lastFetchTime = localStorage.getItem("lastFetchTime");
  if (!lastFetchTime) {
    // If there is no last fetch time, fetch the rates
    return true;
  }

  const elapsed = Date.now() - parseInt(lastFetchTime, 10);
  const threshold = 60 * 10000; // 10 minute in milliseconds
  console.log(`Elapsed time since last fetch: ${elapsed} ms`);
  return elapsed > threshold;
}

// Call the function to fetch and update spot prices when the page loads, if necessary
if (shouldFetchRates()) {
  fetchMetalRates();
  console.log("New Rates were fetched");
} else {
  loadStoredPrices();
  console.log("Stored Rates were loaded");
}
