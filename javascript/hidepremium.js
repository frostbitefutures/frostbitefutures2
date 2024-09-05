// Function to hide calculated premium on Troy oz Form
export function hideTroyPremiumBlock() {
  document.getElementById("resultContainer").style.display = "none";
}
// Function to hide calculated premium on Gram Weight Form
export function hideGramPremiumBlock() {
  document.getElementById("resultContainerGram").style.display = "none";
}
// When user clicks clear data button on Troy oz Form, hide the container
document
  .getElementById("calculatorForm")
  .addEventListener("reset", hideTroyPremiumBlock);

// When user clicks clear data button on Gram Weight Form, hide the container
document
  .getElementById("calculatorFormGram")
  .addEventListener("reset", hideGramPremiumBlock);
