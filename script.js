document.addEventListener("DOMContentLoaded", function () {
  // Section references
  const heroSection = document.querySelector(".heroSection");
  const outputBox = document.getElementById("outputBox");
  const inputBox = document.getElementById("inputBox");
  const resetButton = document.getElementById("resetButton");
  const backButton = document.getElementById("backButton");
  const typewriterEl = document.getElementById("typewriter");
  const submitButton = document.getElementById("submitButton");
  const getStartedButton = document.getElementById("getStartedButton");
  const inputSection = document.getElementById("inputSection");

  // ========== Typewriter Effect ==========
  if (typewriterEl) {
    const words = ["Fast", "Reliable", "Super-easy", "User-friendly"];
    let index = 0;
    let charIndex = 0;
    let typing = true;

    function typeEffect() {
      if (!typewriterEl) return;

      if (typing) {
        typewriterEl.textContent = words[index].substring(0, charIndex++);
        if (charIndex > words[index].length) {
          typing = false;
          setTimeout(typeEffect, 1000);
        } else {
          setTimeout(typeEffect, 100);
        }
      } else {
        charIndex--;
        typewriterEl.textContent = words[index].substring(0, charIndex);
        if (charIndex === 0) {
          typing = true;
          index = (index + 1) % words.length;
          setTimeout(typeEffect, 300);
        } else {
          setTimeout(typeEffect, 50);
        }
      }
    }

    typeEffect();
  }

  // ✅ Start: Toggle sections
  getStartedButton.addEventListener("click", function () {
    heroSection.classList.add("hidden");
    inputSection.classList.remove("hidden");
  });

  // Hide back button on page load
  backButton.style.display = "none";

  // Main summarize logic
  submitButton.addEventListener("click", async function () {
    const inputText = inputBox.value;

    if (inputText.trim() === "") {
      outputBox.classList.add("hidden");
      alert("Please enter some text.");
      return;
    }

    // UI Changes on summarize
    inputBox.classList.add("shrunk");
    outputBox.classList.add("expanded");
    outputBox.style.display = "block";
    outputBox.value = "Processing...";
    resetButton.style.display = "inline-block";
    backButton.style.display = "inline-block";
    outputBox.classList.remove("hidden");
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
        document.getElementById("outputSection").classList.remove("hidden");
      } else {
        outputBox.value = data.error || "Failed to get summary.";
      }
    } catch (error) {
      console.error("Error:", error);
      outputBox.value = "An error occurred. Please try again.";
    }
  });

  // 🔙 Back button functionality
  backButton.addEventListener("click", function () {
    inputSection.classList.add("hidden");
    heroSection.classList.remove("hidden");
    inputBox.value = "";
    outputBox.value = "";
    outputBox.style.display = "none";
    resetButton.style.display = "none";
    backButton.style.display = "none";
  });

  // 🔄 Reset functionality
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
