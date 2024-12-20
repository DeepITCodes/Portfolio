// haburger 

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');

hamburger.addEventListener('click', () => {
    mobileMenu.style.display = 'flex', transition = 'all 0.3s linear';
    hamburger.style.display = 'none';
});

closeMenu.addEventListener('click', () => {
    mobileMenu.style.display = 'none';
    hamburger.style.display = 'block';
});


//Get form and elements
const form = document.getElementById("contactForm");
const errorMessage = document.getElementById("errorMessage");
const successMessage = document.getElementById("successMessage");

//Form validation and API Call
form.addEventListener("submit", async (event) => {
    event.preventDefault(); //prevent form from reloading the page

    //clear previous message
    errorMessage.textContent = "";
    successMessage.textContent = "";

    //Get Form Data
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    //Basic Validation
    if (!name || !email || !message) {
        errorMessage.textContent = "All fields are required!";
        return;
    }

    if (!validateEmail(email)) {
        errorMessage.textContent = "Please enter a valid email address.";
        return;
    }

    //Prepare data to send
    const formData = {
        name: name,
        email: email,
        message: message,
    };

    // Log the form data to the console to see it before sending
    // console.log("Form Data:", formData.name + " " + formData.email + " " + formData.message); // This logs the form data

    try {
        //Make a post request to a mock API
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            successMessage.textContent = "Thank you! Your message has been sent.";
            form.reset(); //Clear the form
        } else {
            errorMessage.textContent = "Something went wrong. Please try again later.";
        }
    } catch {
        errorMessage.textContent = "Network error. Please check your connection.";
    }
});

// Function to validat email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}