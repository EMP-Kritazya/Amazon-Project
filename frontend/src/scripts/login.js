import { API_BASE, parseJsonResponse } from "../../utils/api.js";

try {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (response.ok && data.message == "load homepage") {
    window.location.href = "/frontend/index.html";
  }
} catch (Error) {
  alert("Error: " + Error.message);
}

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

document.querySelector(".form").addEventListener("submit", async (form) => {
  form.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const content = { email, password };

  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(content),
    });

    const data = await parseJsonResponse(response);

    if (response.ok && data.message === "Login Successful") {
      window.location.href = "/frontend/index.html";
    } else {
      alert(data.message || "Login failed");
    }
  } catch (err) {
    alert(
      err.name === "TypeError"
        ? "Cannot reach the server. Is the backend running on port 4000?"
        : err.message,
    );
  }
});
