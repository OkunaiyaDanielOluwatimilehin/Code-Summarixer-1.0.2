document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("submitButton");
    const outputBox = document.getElementById("outputBox");
    const inputBox = document.getElementById("inputBox");
    const resetButton = document.getElementById("resetButton");
    const heroSection = document.querySelector(".heroSection");
    const getStartedButton = document.getElementById("getStartedButton");
    const inputSection = document.getElementById("inputSection");
    const backButton = document.getElementById("backButton");
    
  
    // ✅ This is what you're looking for:
    getStartedButton.addEventListener("click", function () {
      heroSection.classList.add("hidden");
      inputSection.classList.remove("hidden");
    });
    
    // Hide back button on page load
  backButton.style.display = "none";
  
    button.addEventListener("click", async function () {
      const inputText = inputBox.value;
  
      if (inputText.trim() === "") {
        outputBox.classList.add("hidden");
        alert("Please enter some text.");
        return;
      }

       // Shrink input and expand output
    inputBox.classList.add("shrunk");
    outputBox.classList.add("expanded");
    outputBox.style.display = "block";
    outputBox.value = "Processing...";

       // Show reset and back button ONLY after summarizing starts
       resetButton.style.display = "inline-block";
       backButton.style.display = "inline-block";
  
      outputBox.classList.remove("hidden");
      outputBox.value = "Processing...";
      resetButton.classList.remove("hidden");
  
      try {
        const response = await fetch("/api/summarize", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: inputText }),
        });
  
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        const data = await response.json();
        console.log("Backend Response:", data);
  
        if (data.status === true && data.result) {
          outputBox.value = data.result;
        } else {
          outputBox.value = data.error || "Failed to get summary.";
        }
      } catch (error) {
        console.error("Error:", error);
        outputBox.value = "An error occurred. Please try again.";
      }
    });
    backButton.addEventListener("click", function () {
        // Go back to hero section
        inputSection.classList.add("hidden");
        heroSection.classList.remove("hidden");
        // Reset input and output boxes
    });

    // RESET functionality
  resetButton.addEventListener("click", function () {
    inputBox.classList.remove("shrunk");
    inputBox.value = "";
    outputBox.value = "";
    outputBox.classList.remove("expanded");
    outputBox.style.display = "none";
    resetButton.style.display = "none";
    backButton.style.display = "none";
  });
});