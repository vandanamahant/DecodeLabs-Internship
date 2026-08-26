const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const interactiveBtn = document.getElementById("interactiveBtn");
const stateText = document.getElementById("stateText");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

let isClicked = false;
interactiveBtn.addEventListener("click", () => {
    isClicked = !isClicked;
    if (isClicked) {
        stateText.textContent = "State Active: Responsive architecture successfully verified!";
        interactiveBtn.textContent = "Reset State";
    } else {
        stateText.textContent = "";
        interactiveBtn.textContent = "Explore State";
    }
});