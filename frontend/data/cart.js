export let cart;
import { checkAuthStatus } from "../src/scripts/verify";

const isLoggedIn = await checkAuthStatus();
// todo: call backend fetch
export async function addToCart(productId, quantity) {
  if (isLoggedIn) {
    const itemDetail = {
      productId: productId,
      quantity: quantity,
      deliveryOptionId: 1,
    };
    try {
      const response = await fetch("/cart/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemDetail),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to get total cart items");
      }

      const data = await response.json();

      if (data.message === "add-to-cart successful") {
        return true;
      }
      return false;
    } catch (error) {
      alert(error.message);
    }
  }
}

export function removeFromCart(productId) {
  const updatedCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      updatedCart.push(cartItem);
    }
  });
  cart = updatedCart;
}

export async function calculateCartQuantity() {
  if (isLoggedIn) {
    let totalCartItems = 0;
    try {
      const response = await fetch("/cart/getCartQuantity", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to get total cart items");
      }

      const data = await response.json();

      if (data.message === "Failed to Verify") {
        return 0;
      }

      if (data.message === "total items retrieved") {
        totalCartItems = data.totalItems;
      }

      return totalCartItems;
    } catch (error) {
      console.log("Error: ", error.message);
      return 0;
    }
  }
}

export function updateCart(productId, quantity) {
  const cartItem = cart.find((item) => item.productId === productId);
  cartItem.quantity = quantity;
  saveToStorage();
}

export function updateDeliveryOptions(productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((item) => {
    if (item.productId === productId) {
      matchingItem = item;
    }
  });
  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}

export function emptyCart() {}
