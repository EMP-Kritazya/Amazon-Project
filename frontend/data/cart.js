export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
}

// Adds the product to the cart
// If the product already exists then it will just update it's quantity
// If not then it will push a new product to the cart
export function addToCart(productId) {
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
  saveToStorage();
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
