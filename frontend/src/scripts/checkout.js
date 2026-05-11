import { checkAuthStatus } from "./verify.js";

const isLoggedIn = await checkAuthStatus();

if (isLoggedIn) {
  const { renderItemsSummary } = await import("./checkout/itemSummary.js");
  const { renderOrderSummary } = await import("./checkout/orderSummary.js");
  const { loadProductsFetch } = await import("../../data/product.js");

  await loadProductsFetch();

  async function loadPage() {
    await renderItemsSummary();
    await renderOrderSummary();
  }
  loadPage();
} else {
  window.location.href = "/login.html";
}

// new Promise((resolve) => {
//   loadProductsFetch().then(() => {
//     renderItemsSummary();
//     renderOrderSummary();
//     resolve();
//   });
// });
