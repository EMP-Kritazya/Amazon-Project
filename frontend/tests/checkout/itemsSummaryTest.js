import { cart, loadFromStorage } from "../../data/cart.js";
import { renderItemsSummary } from "../../scripts/checkout/itemSummary.js";
import { loadProductsFetch, loadProducts } from "../../data/product.js";

// Hooks helps us share our code between tests

describe("test suite: renderItemSummary", () => {
  let product1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  let product2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
  // Before All - Hook
  beforeAll((done) => {
    loadProductsFetch().then(() => {
      done();
    });
  });
  // Before Each - Hook
  beforeEach(() => {
    spyOn(localStorage, "setItem");
    document.querySelector(".js-test-container").innerHTML = `
      <header class="return-to-home-link"></header>
      <div class = "js-left"></div>
      <div class = "js-right"></div>
    `;

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "1",
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 2,
          deliveryOptionId: "2",
        },
      ]);
    });
    loadFromStorage();

    renderItemsSummary();
  });

  // After each hook
  afterEach(() => {
    document.querySelector(".js-test-container").innerHTML = "";
  });

  it("displays the cart", () => {
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      2,
    );

    expect(
      document.querySelector(`.js-quantity-${product1}`).innerText,
    ).toEqual("1");

    expect(
      document.querySelector(`.js-quantity-${product2}`).innerText,
    ).toEqual("2");
  });

  it("removes a product", () => {
    document.querySelector(`.js-delete-link-${product1}`).click();
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      1,
    );
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(product2);
    expect(document.querySelector(`.js-delete-link-${product1}`)).toEqual(null);
    expect(document.querySelector(`.js-delete-link-${product2}`)).not.toEqual(
      null,
    );
  });
});
