import { renderItemsSummary } from "./checkout/itemSummary.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { loadProductsFetch } from "../../data/product.js";

async function loadPage() {
  // try {
  //   await loadProductsFetch();
  // } catch (error) {
  //   console.log("Unexpected Error. Please try again later!");
  // }
  await renderItemsSummary();
  await renderOrderSummary();
}
loadPage();

// new Promise((resolve) => {
//   loadProductsFetch().then(() => {
//     renderItemsSummary();
//     renderOrderSummary();
//     resolve();
//   });
// });
