document.addEventListener("DOMContentLoaded", function() {
    const getStartedButton = document.getElementById("getStartedButton");
    const inputSection = document.getElementById("inputSection");
    const heroSection = document.getElementById("heroSection");
    const submitButton = document.getElementById("submitButton");
    const resetButton = document.getElementById("resetButton");
    const inputBox = document.getElementById("inputBox");
    const outputBox = document.getElementById("outputBox");
    const backButton = document.querySelector(".back-button");

    // Add event listener to "Get Started" button
    getStartedButton.addEventListener("click", function() {
        // Hide the hero section and show the input section
        heroSection.classList.add("hidden");
        inputSection.classList.remove("hidden");

        // Show the back button (aligned to the right of the textarea)
        backButton.style.display = "inline-block";
    });

    // Go back to the hero section when back button is clicked
    backButton.addEventListener("click", function() {
        inputSection.classList.add("hidden");
        heroSection.classList.remove("hidden");

        // Hide the back button again when returning to the hero section
        backButton.style.display = "none";
    });
    

    
    // Handle Summarize button click
    submitButton.addEventListener("click", async function() {
        const inputText = inputBox.value;

        if (inputText.trim() === "") {
            outputBox.style.display = "none";
            alert("Please enter some text.");
            return;
        }

        outputBox.style.display = "block";
        outputBox.value = "Processing...";

        // Add shrink class to input box and expand class to output box
        inputBox.classList.add("shrunk");
        outputBox.classList.add("expanded");

        // Show the reset button
        resetButton.style.display = "inline-block";
        try {
            const response = await fetch('/api/summarize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: inputText })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            if (data.status === true && data.result) {
                outputBox.value = data.result;
            } else {
                outputBox.value = data.error || "Failed to get summary.";
            }
        } catch (error) {
            outputBox.value = "An error occurred. Please try again.";
        }

        // Show the Reset button after the summary is processed
        resetButton.style.display = "inline-block";
    });

    // Handle Reset button click
    resetButton.addEventListener("click", function() {
        inputBox.value = "";
        outputBox.style.display = "none";
        outputBox.value = "";
        resetButton.style.display = "none"; // Hide the Reset button after clicking
    });
});