import { calculateCartQuantity, cart } from "../../data/cart.js";
import { products } from "../../data/product.js";
import { getDeliveryCharge } from "../../data/deliveryOptions.js";
import { finalizeOrders } from "../orders.js";
import { formatCurrency } from "../../utils/money.js";

export function renderOrderSummary() {
  // Get all Required Variables
  const cartQuantity = calculateCartQuantity();
  const totalItemsCost = updateTotal();

  const sHcharge = getDeliveryCharge();
  const totalBeforeTax = totalItemsCost + sHcharge;

  let orderHtml = `
    <div class="payment-summary">
      <div class="payment-title">Order Summary</div>
      <div class="payment-details">
        <div class="elaborate-details">
          <div class="items">
            <div class="items-title">Items (${cartQuantity}):</div>
            <div class="item-price">$${formatCurrency(totalItemsCost)}</div>
          </div>
          <div class="shipping">
            <div class="shipping-title">Shipping & handling:</div>
            <div class="shipping-price">$${formatCurrency(sHcharge)}</div>
          </div>
          <div class="tax-details">
            <div class="before-tax">
              <div class="total-before-tax">Total before tax:</div>
              <div class="total-before-tax-price">$${formatCurrency(totalBeforeTax)}</div>
            </div>
            <div class="actual-tax">
              <div class="estimated-title">Estimated tax (10%):</div>
              <div class="estimated-amount">$${formatCurrency(totalBeforeTax)}</div>
            </div>
          </div>
        </div>
        <div class="final-price">
          <div class="order-total-title">Order total:</div>
          <div class="total-price">$${formatCurrency(totalBeforeTax + totalBeforeTax * 0.1)}</div>
        </div>
      </div>
      <button class="place-order js-place-order">Place your order</button>
    </div>
  `;
  document.querySelector(".js-right").innerHTML = orderHtml;

  // Helps user confirm their order and navigate to orders page
  document.querySelector(".js-place-order").addEventListener("click", () => {
    finalizeOrders();
    window.location.href = "http://127.0.0.1:5501/orders.html";
  });
}

// Generates totalCost for all items and Updates the page
export function updateTotal() {
  // reset variables
  let totalItemsCost = 0;

  // update variables
  cart.forEach((cartItem) => {
    let matchingItem = products.find((item) => item.id === cartItem.productId);
    totalItemsCost += cartItem.quantity * matchingItem.priceCents;
  });

  return totalItemsCost;
}
