document.addEventListener("DOMContentLoaded", () => {
    // DOM references
    const heroSection = document.querySelector(".heroSection");
    const summarizerWrapper = document.getElementById("summarizerWrapper");
    const inputSection = document.getElementById("inputSection");
    const outputSection = document.getElementById("outputSection");    
    const inputBox = document.getElementById("inputBox");
    const outputBox = document.getElementById("outputBox");
    const submitButton = document.getElementById("submitButton");
    const resetButton = document.getElementById("resetButton");
    const backButton = document.getElementById("backButton");
    const getStartedButton = document.getElementById("getStartedButton");
    const typewriterEl = document.getElementById("typewriter");
  
    // Initial UI setup
    inputSection?.classList.add("hidden");
    outputSection.style.display = "none";
    resetButton.style.display = "none";
    backButton.style.display = "none";
  
    // ========== Typewriter Effect ==========
    if (typewriterEl) {
      const words = ["easy", "fast", "accurate"];
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
  
    // ========== Get Started Button ==========
    getStartedButton?.addEventListener("click", () => {
      heroSection.classList.add("hidden");
      summarizerWrapper.classList.remove("hidden");
      inputSection.classList.remove("hidden");
      backButton.style.display = "inline-block";
    });
    
    // ========== Summarize Button Logic ==========
    submitButton.addEventListener("click", async () => {
      const inputText = inputBox.value.trim();
  
      if (inputText === "") {
        alert("Please enter some code to summarize.");
        return;
      }
  
     // Show output and buttons
     outputSection.classList.remove("hidden");
     outputSection.style.display = "block";
      outputBox.style.display = "block";
      outputBox.value = "Summarizing...";
      resetButton.style.display = "inline-block";
      backButton.style.display = "inline-block";

  
      try {
        const response = await fetch("/api/summarize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: inputText }),
        });
  
        if (!response.ok) throw new Error("Failed to fetch summary.");
  
        const data = await response.json();
  
        if (data.status === true && data.result) {
          outputBox.value = data.result;
        } else {
          outputBox.value = data.error || "Failed to get summary.";
        }
      } catch (error) {
        console.error("API Error:", error);
        outputBox.value = "An error occurred. Please try again.";
      }
      
    });
  
    // ========== Back Button ==========
    backButton.addEventListener("click", () => {
      inputBox.value = "";
      outputBox.value = "";
      outputBox.style.display = "none";
      resetButton.style.display = "none";
      backButton.style.display = "none";
      summarizerWrapper.classList.add("hidden");
      heroSection.classList.remove("hidden");      
    });

    // ========== Reset Button ==========
    resetButton.addEventListener("click", () => {
      inputBox.value = "";
      outputBox.value = "";
      outputBox.style.display = "none";
      resetButton.style.display = "none";
      backButton.style.display = "none";
      outputSection.style.display = "none";
    });
    const footer = document.getElementById("site-footer");

    const testimonials = document.querySelectorAll(".testimonial");
let index = 0;

function showNextTestimonial() {
  testimonials[index].classList.remove("active");
  index = (index + 1) % testimonials.length;
  testimonials[index].classList.add("active");
}

setInterval(showNextTestimonial, 4000); // change every 4 seconds

  });
  