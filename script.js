document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById("submitButton");
    const outputBox = document.getElementById("outputBox");

    button.addEventListener("click", async function() {
        const inputText = document.getElementById("inputBox").value;

        if (inputText.trim() === "") {
            outputBox.style.display = "none";
            alert("Please enter some text.");
            return;
        }

        outputBox.style.display = "block";
        outputBox.value = "Processing...";

        try {
            // Make the request to the backend
            const response = await fetch('/api/summarize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: inputText })
            });
            

            // Check if the response is ok
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Parse the response JSON
            const data = await response.json();
            console.log("Backend Response:", data);

            // Handle the result based on the data returned from the server
            if (data.status === true && data.result) {
                outputBox.value = data.result; // display the summary
            } else {
                outputBox.value = data.error || "Failed to get summary."; // fallback error message
            }
        } catch (error) {
            // Handle any errors that occurred during the fetch
            console.error("Error:", error);
            outputBox.value = "An error occurred. Please try again.";
        }
    });

    // Reset the form when the reset button is clicked
    resetButton.addEventListener("click", function() {
        inputBox.style.width = "100%"; // Reset input box to default size
        inputBox.style.position = "relative"; // Reset position
        inputBox.value = ""; // Clear input box
        outputBox.style.display = "none"; // Hide output box
        outputBox.value = ""; // Clear output box
        resetButton.style.display = "none"; // Hide reset button
    });

});

function scrollToInput() {
    const inputSection = document.getElementById("inputSection"); // wrap input area in this ID
    if (inputSection) {
      inputSection.scrollIntoView({ behavior: "smooth" });
    }
  }
  
  function showInputSection() {
    document.getElementById("heroSection").classList.add("hidden");
    document.getElementById("inputSection").classList.remove("hidden");
    // Show the back button when input section is active
    document.querySelector(".back-button").style.display = "block";
}

function goBack() {
    document.getElementById("inputSection").classList.add("hidden");
    document.getElementById("heroSection").classList.remove("hidden");
    // Hide the back button when going back to the hero section
    document.querySelector(".back-button").style.display = "none";
}



const backendUrl = "https://code-summarizer-101.vercel.app/"; 
