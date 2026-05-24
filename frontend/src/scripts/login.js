try {
  const response = await fetch(`/auth/login`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `Server Error: ${response.status}`);
  }

  if (data.message == "load homepage") {
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

  const submitBtn = document.querySelector("submit");

  if (submitBtn) submitBtn.disabled = true;

  try {
    const response = await fetch(`/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(content),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Server Error: ${response.status}`);
    }

    if (response.status === 200) {
      window.location.href = `/frontend/index.html?msg=${encodeURIComponent(data.message)}`;
    } else {
      throw new Error("Something went Wrong. Could not Login User");
    }
  } catch (err) {
    alert("Error: " + (error.message || "Request failed"));
  }
});
