export let cart;

// todo: call backend fetch
export async function addToCart(productId) {
  const itemDetail = {
    productId: productId,
    quantity: 1,
    deliveryOptionId: 1,
  };
  try {
    const response = await fetch("/carts/addToCart", {
      method: "POST",
      body: JSON.stringify(itemDetail),
      credentials: "include",
    });

    data = await response.json();

    if (data.message === "Failed to Verify") {
      return "";
    }

    if (data.message === "add-to-cart successful") {
      return data.totalItems;
    }
  } catch (error) {
    alert(error.message);
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
  saveToStorage();
}

export async function calculateCartQuantity() {
  let totalCartItems = 0;
  try {
    const response = await fetch("/cart/getCartQuantity", {
      method: "GET",
    });

    data = await response.json();

    if (data.message === "Failed to Verify") {
      return "";
    }

    if (data.message === "total items retrieved") {
      totalCartItems = data.totalItems;
    }

    return totalCartItems;
  } catch (error) {
    alert(error.message);
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

export function emptyCart() {
  cart = [];
  saveToStorage();
}
