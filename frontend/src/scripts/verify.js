// Check if the user is logged in, if not then show them the guest page

export let loggedIn = false;

const getStatus = fetch("http://localhost:4000/auth/amazon");

if (!getStatus.ok) {
  loggedIn = false;
}

response = getStatus.json().data;

if (response === "load home page") {
  loggedIn = true;
}
