import { addToCart, calculateCartQuantity } from "../data/cart.js";
import { products, loadProductsFetch } from "../data/product.js";

await loadProductsFetch();

let productsHTML = "";
let timeoutId = null;

products.forEach((product) => {
  productsHTML += `
  <div class="product-area">
    <div class="product-details">
      <div class="product-image">
        <img src="${product.image}" alt="" />
      </div>
      <div class="product-description limit-to-two-lines">
        ${product.name}
      </div>
      <div class="product-rating">
        <div class="stars">
          <img src="${product.getStarsUrl()}" alt="" />
        </div>
        <div class="number-bought">${product.rating.count}</div>
      </div>
      <div class="product-price">${product.getPrice()}</div>
      <div class="product-quantity-container">
        <select class = "js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>
    </div>
    
    ${product.extraInfoHTML()}

    <div class="added-to-cart js-added-to-cart-${product.id}">
      <img src="images/checkmark.png" alt="" />
      <div class="added-text">Added</div>
    </div>
    <button class="add-to-cart js-add-to-cart" data-product-id = "${product.id}">Add to Cart</button>
  </div>
`;
});
updateCartQuantity();

document.querySelector(".js-products-grid").innerHTML = productsHTML;

function updateCartQuantity() {
  const totalCartItems = calculateCartQuantity();
  document.querySelector(".js-number-of-items").innerHTML = totalCartItems;
}

function generateAddedText(productId) {
  const message = document.querySelector(`.js-added-to-cart-${productId}`);
  message.classList.add("show-added-message");

  if (message.timeoutId) {
    clearTimeout(message.timeoutId);
  }

  message.timeoutId = setTimeout(() => {
    message.classList.remove("show-added-message");
  }, 2000);
}

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;

    addToCart(productId);
    updateCartQuantity(productId);
    generateAddedText(productId);
    console.log(productId);
  });
});
