export let cart;

loadFromBackend();

export function loadFromBackend() {
  // load from backend

  cart = JSON.parse(localStorage.getItem("cart")) || [];
}

// Adds the product to the cart
// If the product already exists then it will just update it's quantity
// If not then it will push a new product to the cart
export async function addToCart(productId) {
  let matchingItem;

  cart.forEach((item) => {
    if (item.productId === productId) {
      matchingItem = item;
    }
  });
  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: "1",
    });
  }

  const sendCartDetails = await fetch(
    "http:localhost:4000/auth/cart/addToCart",
    {
      method: "POST",
      credentials: "include",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cart),
    },
  );
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

export function calculateCartQuantity() {
  let totalCartItems = 0;
  cart.forEach((item) => {
    totalCartItems += item.quantity;
  });
  return totalCartItems;
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

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
