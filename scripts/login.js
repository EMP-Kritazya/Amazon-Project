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

document.querySelector(".form").addEventListener("submit", (form) => {
  const promise = fetch("https://localhost:4000").then((response) => {});
});
