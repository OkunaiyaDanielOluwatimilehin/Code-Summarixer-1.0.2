document.addEventListener("DOMContentLoaded", () => {
    const contactBtn = document.getElementById("contactNavBtn");
    const contactSection = document.getElementById("contactSection");
    const aboutContent = document.getElementById("aboutContent");
    const goBackBtn = document.getElementById("goBackButton");
  
    // Show contact form and hide about content
    contactBtn.addEventListener("click", () => {
      contactSection.classList.remove("hidden");
      aboutContent.classList.add("hidden");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  
    // Go back to about content
    goBackBtn.addEventListener("click", () => {
      contactSection.classList.add("hidden");
      aboutContent.classList.remove("hidden");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    const testimonials = document.querySelectorAll(".testimonial");
let index = 0;

function showNextTestimonial() {
  testimonials[index].classList.remove("active");
  index = (index + 1) % testimonials.length;
  testimonials[index].classList.add("active");
}

setInterval(showNextTestimonial, 4000); // change every 4 seconds

  });
  