import { cart, emptyCart } from "../data/cart.js";

let orders = [];

// function renderFinalizedOrders() {
//   // orders.forEach((orderItem) => {});

//   document.querySelector(".js-orders-grid").innerHTML = `
//   <div class="order-summary">
//     <div class="left-section">
//       <div class="order-date">
//         <div class="order-placed-title">Order Placed:</div>
//         <div class="order-placed-date">February 11</div>
//       </div>
//       <div class="total-price">
//         <div class="total-price-title">Total:</div>
//         <div class="total-price-amount">$46.09</div>
//       </div>
//     </div>
//     <div class="right-section">
//       <div class="orderId">
//         <div class="order-Id-title">Order ID:</div>
//         <div class="orderId-value">
//           1df730b8-3d4a-fb4b-fd55-46769bca2425
//         </div>
//       </div>
//     </div>
//   </div>
//   <div class="orders-detail-grid">
//     <div class="order-item-image">
//       <img
//         src="images/products/intermediate-composite-basketball.jpg"
//         alt=""
//       />
//     </div>
//     <div class="order-item-description">
//       <div class="item-title">Intermediate Size Basketball</div>
//       <div class="item-arrival-date">Arriving on: February 20</div>
//       <div class="item-quantity">Quantity: 2</div>
//       <button class="buy-it-again">
//         <img src="images/buy-again.png" alt="" class="buy-again-img" />
//         <span class="btn-text">Buy it again</span>
//       </button>
//     </div>
//     <div class="track-package-btn">
//       <div class="track-btn">Track package</div>
//     </div>
//   </div>
// `;
// }
// renderFinalizedOrders();

// Finalizes orders and populate the orders array

export function finalizeOrders() {
  // To-do : group orders coming in same day and display it in one
  cart.forEach((cartItem) => {
    const deliveryId = cartItem.deliveryId;
    const orderDeliveryId = orders.find(
      (id) => orders.deliveryId === deliveryId,
    );
    if (orders.deliveryId == deliveryId) {
    }
  });
  emptyCart();
}
