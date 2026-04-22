import { calculateCartQuantity } from "../../data/cart.js";
import { checkAuthStatus } from "./verify.js";

let container = document.querySelector(".header");
const isLoggedIn = await checkAuthStatus();
let rightContent;

if (isLoggedIn) {
  // Get cart number
  const numberofItems = await calculateCartQuantity();

  rightContent = `
    <a href="orders.html" class="ro">
      <span class="returns">Returns</span>
      <span class="orders">& Orders</span>
    </a>

    <a href="checkout.html" class="cart">
      <img src="../../images/cart-icon.png" alt="" class="cart-icon" />
      <div class="cart-items js-number-of-items">${calculateCartQuantity()}</div>
      <div class="cart-text">Cart</div>
    </a>
  `;
} else {
  rightContent = `
    <div class="verify">
      <a href="/login.html" class = "verify-href"><span class="login">LogIn</span></a>
      <a href="/signup.html" class = "verify-href"><span class="signup">SignUp</span></a>
    </div>
  `;
}

const content = `
  <section class="left">
    <a href="amazon.html" class="header-link">
      <img src="../../images/amazon-logo-white.png" alt="" class="amazon-logo" />
      <img
        src="../../images/amazon-mobile-logo-white.png"
        alt=""
        class="amazon-mobile-logo"
      />
    </a>
  </section>
  <section class="middle">
    <input type="text" class="search-box" placeholder="Search" />
    <button class="search-button">
      <img src="../../images/search-icon.png" alt="" class="search-image" />
    </button>
  </section>
  <section class="right">
    ${rightContent}
  </section>

`;

container.innerHTML = content;
