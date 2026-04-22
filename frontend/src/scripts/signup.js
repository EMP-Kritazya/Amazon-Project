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

document.querySelector(".form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const userData = { username, email, password };

  try {
    const response = await fetch(`/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.ok) {
      if (data.message == "User Registered") {
        window.location.href = "/frontend/login.html";
      } else {
        throw new Error("Something went Wrong");
      }
    } else {
      alert("Error: " + (data.message || "Request failed"));
    }
  } catch (error) {
    console.log("Network error: ", error);
    alert(
      "Error: " +
        (error.message ||
          "Request failed — check that the backend is running on port 4000."),
    );
  }
});
