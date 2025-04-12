document.addEventListener("DOMContentLoaded", function () {
  // Section references
  const heroSection = document.querySelector(".heroSection");
  const inputSection = document.getElementById("inputSection");
  const outputContainer = document.getElementById("outputContainer");
  const outputBox = document.getElementById("outputBox");
  const backButton = document.getElementById("backButton");
  const submitButton = document.getElementById("submitButton");
  const resetButton = document.getElementById("resetButton");
  const heroStartBtn = document.getElementById("getStartedButton");
  const typewriterEl = document.getElementById("typewriter");

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

  // ========== Hero Get Started ==========
  if (heroStartBtn) {
    heroStartBtn.addEventListener("click", () => {
      console.log("Hero Get Started clicked");
      heroSection.classList.add("hidden");
      inputSection.classList.remove("hidden");
      inputSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  // ========== Submit/Summarize ==========
  if (submitButton) {
    submitButton.addEventListener("click", () => {
      console.log("Summarize clicked");
      outputBox.value = "This is a summarized version of the input text.";
      outputContainer.classList.remove("hidden");
      resetButton.classList.remove("hidden");
    });
  }

  // ========== Back ==========
  if (backButton) {
    backButton.addEventListener("click", () => {
      console.log("Back clicked");
      inputSection.classList.add("hidden");
      heroSection.classList.remove("hidden");
      heroSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  // ========== Reset ==========
  if (resetButton) {
    resetButton.addEventListener("click", () => {
      outputContainer.classList.add("hidden");
      resetButton.classList.add("hidden");
      inputSection.classList.remove("hidden");
      outputBox.value = "";
    });
  }
  document.addEventListener("DOMContentLoaded", function () {
    const testimonySection = document.getElementById("testimonySection");
  
    const testimonies = [
      {
        text: "This tool has been incredibly helpful for streamlining our coding process. Highly recommend it!",
        author: "John Doe, Developer"
      },
      {
        text: "A game changer for developers looking to save time. Simple and easy to use!",
        author: "Jane Smith, Software Engineer"
      }
      // Add more testimonies as needed
    ];
  
    testimonies.forEach(testimony => {
      const testimonyDiv = document.createElement("div");
      testimonyDiv.classList.add("testimony");
      
      const testimonyText = document.createElement("p");
      testimonyText.textContent = `"${testimony.text}"`;
      
      const testimonyAuthor = document.createElement("h4");
      testimonyAuthor.textContent = `- ${testimony.author}`;
      
      testimonyDiv.appendChild(testimonyText);
      testimonyDiv.appendChild(testimonyAuthor);
      
      testimonySection.appendChild(testimonyDiv);
    });
  });
  
});
