// Super frequently used js file
export let cart;
import { checkAuthStatus } from "../src/scripts/verify";

try {
  const isLoggedIn = await checkAuthStatus();
} catch (error) {
  console.error("Error: ", error.message || "Internal Server Error");
}

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
        throw new Error("Failed to add to cart");
      }

      const data = await response.json();

      if (response.status === 201) {
        return true;
      }
      return false;
    } catch (error) {
      alert("Error: ", error.message || "Failed to add the item");
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
  let totalCartItems = 0;
  try {
    const response = await fetch("/cart/getCartQuantity", {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    if (response.status === 200) {
      totalCartItems = data.totalItems;
    }

    return totalCartItems;
  } catch (error) {
    console.error("Error: ", error.message);
    return "N/A";
  }
}

// Since

// not required maybe since I'll update the db
export function updateCart(productId, quantity) {
  const cartItem = cart.find((item) => item.productId === productId);
  cartItem.quantity = quantity;
}

// not required maybe since I'll update the db
export function updateDeliveryOptions(productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((item) => {
    if (item.productId === productId) {
      matchingItem = item;
    }
  });
  matchingItem.deliveryOptionId = deliveryOptionId;
  // saveToStorage();
}

export function emptyCart() {}
