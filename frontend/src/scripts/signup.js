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

  const submitBtn = document.querySelector('button[type="submit"]');

  if (submitBtn) submitBtn.disabled = true;

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

    // If server returns 4xx or 5xx status code
    if (!response.ok) {
      throw new Error(data.message || `Server error: ${response.status}`);
    }

    if (response.status === 201) {
      window.location.href = `/frontend/login.html?msg=${encodeURIComponent(data.message)}`;
    } else {
      throw new Error("Something went Wrong. Could not Complete Registration");
    }
  } catch (error) {
    alert("Error: " + (error.message || "Request failed"));
  } finally {
    if (submitBtn) submitBtn.disabled = false;
  }
});
