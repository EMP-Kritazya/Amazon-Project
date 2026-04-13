document.querySelectorAll(".signin-field-label").forEach((label) => {
  label.addEventListener("click", function () {
    const input = this.previousElementSibling;
    input.focus();
  });
});

document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("focus", function () {
    this.nextElementSibling.classList.add("label-click");
  });
  input.addEventListener("blur", function () {
    if (!this.value.trim()) {
      this.nextElementSibling.classList.remove("label-click");
    }
  });
});

// Send Data

// Get the sumbit button
const signupForm = document.querySelector(".form");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // it prevents the page from reloading

  // Now we collect data from previous fields
  const username = document.getElementById("username").value;

  const email = document.getElementById("email").value;

  const password = document.getElementById("password").value;

  const userData = { username, email, password };

  try {
    const response = await fetch("/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      alert("Account created successfully");
      window.location.href = "/api/amazon";
    } else {
      const result = await response.json();
      alert("Error: " + result.message);
    }
  } catch (error) {
    console.log("Network error: ", error);
    alert("Internal Error. Please try again after some time");
  }
});
