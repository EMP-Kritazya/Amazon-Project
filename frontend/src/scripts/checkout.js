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
    await renderItemsSummary();
    await renderOrderSummary();
  } catch (error) {
    const status = findErrors(error.message);
    console.error(error.cause);
    showAlert(status);
    initializeCheckout();
  }
}

initializeCheckout();
