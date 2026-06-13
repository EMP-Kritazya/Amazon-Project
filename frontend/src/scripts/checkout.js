import { findErrors, showAlert } from "../../errors/errors.js";
import { checkAuthStatus } from "./verify.js";

async function initializeCheckout() {
  const isLoggedIn = await checkAuthStatus();

  if (!isLoggedIn) {
    window.location.href = "/login.html";
    return;
  }

  try {
    const [
      { renderItemsSummary },
      { renderOrderSummary },
      { loadProductsFetch },
    ] = await Promise.all([
      import("./checkout/itemSummary.js"),
      import("./checkout/orderSummary.js"),
      import("../../data/product.js"),
    ]);

    await loadProductsFetch();
    console.log("Don1");
    await renderItemsSummary();
    console.log("Don2");
    await renderOrderSummary();
    console.log("Don3");
  } catch (error) {
    const status = findErrors(error.message);
    showAlert(status);
    // initializeCheckout();
  }
}

initializeCheckout();
