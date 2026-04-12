import {
  calculateCartQuantity,
  cart,
  removeFromCart,
  updateCart,
  updateDeliveryOptions,
} from "../../data/cart.js";
import { products } from "../../data/product.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { updateTotal } from "./orderSummary.js";
import { renderOrderSummary } from "./orderSummary.js";
import { formatCurrency } from "../../utils/money.js";

export function renderItemsSummary() {
  let cartItemId;
  let matchingProduct;
  let cartQuantity;
  let cartItemsHtml = "";

  cart.forEach((cartItem) => {
    cartItemId = cartItem.productId;
    matchingProduct = products.find((item) => item.id === cartItemId);

    if (!matchingProduct) {
      console.error("Product not found:", items.productId);
      return;
    }

    const deliveryOptionId = cartItem.deliveryOptionId;

    let deliveryOption;
    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId) {
        deliveryOption = option;
      }
    });

    const dateString = getDeliveryDate(deliveryOption.id);

    cartItemsHtml += `
      <div class="items-summary js-cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="cart-item-container">
          <div class="delivery-date js-change-delivery-date-${matchingProduct.id}">
            Delivery date: ${dateString}
          </div>
          <div class="cart-items-details-grid">
            <div class="cart-items-left">
              <img
                src="${matchingProduct.image}"
                alt=""
                class="cart-item-image"
              />
            </div>
            <div class="cart-items-middle">
              <div class="cart-product-info">
                <div class="cart-product-title">
                  ${matchingProduct.name}
                </div>
                <div class="cart-product-price">${matchingProduct.getPrice()}</div>
                <div class="cart-product-details js-cart-details-${matchingProduct.id}">
                  <div class="quantity js-update-quantity-${matchingProduct.id}">Quantity: <span class="quantity-number js-quantity-${matchingProduct.id}">${cartItem.quantity}</span></div>
                  <a class="update js-update-link" data-product-id="${matchingProduct.id}">Update</a>
                  <input class="quantity-input js-input-quantity-${matchingProduct.id}"/>
                  <span class="save-quantity-link js-save-link" data-product-id = "${matchingProduct.id}">Save</span>
                  <a class="delete js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">Delete</a>
                </div>
              </div>
            </div>
            <div class="cart-items-right-${matchingProduct.id}">
              <div class="delivery-method-text">
                Choose a delivery option:
              </div>
              ${deliveryOptionsHTML(matchingProduct, cartItem)}
            </div>
          </div>
        </div>
      </div>
    `;
  });
  document.querySelector(".js-left").innerHTML = cartItemsHtml;

  // Updates the cart quantity in the Header of the page
  updateHeaderCartQuantity();
  // Updates total cost of all items in the cart
  updateTotal();

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = "";
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
      const dateString = deliveryDate.format("dddd, MMMM D");
      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `$${deliveryOption.priceCents / 100} -`;
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
        <div class="delivery-option-buttons js-delivery-option js-edit-delivery-option-${matchingProduct.id}" data-delivery-option-id = "${deliveryOption.id}" data-product-id= "${matchingProduct.id}">
          <input
            ${isChecked ? "checked" : ""}
            type="radio"
            name="delivery-option-1-${matchingProduct.id}"
            class="delivery-option-input"
          />
          <div>
            <div class="delivery-option-date">${dateString}</div>
            <div class="delivery-option-price">${priceString} Shipping</div>
          </div>
        </div>
      `;
    });
    return html;
  }

  // Listens for click on DELETE link for all items and functions accordingly
  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      document.querySelector(`.js-cart-item-container-${productId}`).remove();

      cartQuantity = calculateCartQuantity();
      updateTotal();
      renderOrderSummary();
    });
  });

  // Listens for click on UPDATE link for all items and functions accordingly
  document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;

      // I need to display the selector and Save link
      document
        .querySelector(`.js-cart-details-${productId}`)
        .classList.add("is-editing-quantity", "is-not-editable");
    });
  });

  // Listens for click on SAVE link for all items and functions accordingly
  document.querySelectorAll(".js-save-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;

      // I need to get value from the input box and update cart quantity for that Item
      const newQuantity = parseInt(
        document.querySelector(`.js-input-quantity-${productId}`).value,
      );

      // Revert back to showing update and delete links and also updates the item quantity
      document
        .querySelector(`.js-cart-details-${productId}`)
        .classList.remove("is-editing-quantity", "is-not-editable");

      updateCart(productId, newQuantity);
      renderOrderSummary();
      renderItemsSummary();
    });
  });

  // Listens to click on Delivery Dates
  document.querySelectorAll(`.js-delivery-option`).forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;

      // Updates the deliveryId for cart
      updateDeliveryOptions(productId, deliveryOptionId);
      renderItemsSummary();
      renderOrderSummary();
    });
  });

  // Display total cart size in the header
  function updateHeaderCartQuantity() {
    cartQuantity = calculateCartQuantity();
    document.querySelector(".return-to-home-link").innerHTML =
      `${cartQuantity} items`;
  }

  function getDeliveryDate(deliveryOptionId) {
    const today = dayjs();
    const deliveryDate = today.add(parseInt(deliveryOptionId), "days");
    const dateString = deliveryDate.format("dddd, MMMM D");

    return dateString;
  }
}
