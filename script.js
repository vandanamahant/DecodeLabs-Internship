const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const interactiveBtn = document.getElementById("interactiveBtn");
const stateText = document.getElementById("stateText");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

let isClicked = false;

interactiveBtn.addEventListener("click", async () => {
    isClicked = !isClicked;
    
    if (isClicked) {
        interactiveBtn.textContent = "Loading...";
        try {
            const response = await fetch("http://localhost:5000/api/users");
            
            if (!response.ok) {
                throw new Error("Failed to fetch data from server");
            }
            
            const result = await response.json();
            const users = result.data || result;
            
            if (users.length > 0) {
                const names = users.map(user => user.name).join(", ");
                stateText.textContent = `Connected! Users: ${names}`;
            } else {
                stateText.textContent = "Connected successfully, but no users found.";
            }
            
            interactiveBtn.textContent = "Reset State";
        } catch (error) {
            stateText.textContent = "Error: Could not connect to backend server.";
            interactiveBtn.textContent = "Try Again";
            isClicked = false;
        }
    } else {
        stateText.textContent = "";
        interactiveBtn.textContent = "Explore State";
    }
});