const Errors = Object.freeze({
  ISE: "Internal Server Error",
  // Checkout
  USF: "User not found",
});

export function findErrors(message) {
  console.log(message);
  const entry = Object.entries(Errors).find(
    ([key, value]) => value === message,
  );

  return entry ? entry[0] : "ISE";
}

export function showAlert(status) {
  if (status === "ISE") {
    alert("Internal Server Error. Please try again after some time");
  } else if (status === "USF") {
    alert("User not found! Please login again to continue");
  } else {
    alert("Unknown Error. Please try again later");
  }
}
