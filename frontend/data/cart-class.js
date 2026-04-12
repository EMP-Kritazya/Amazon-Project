class Cart {
  cartItems;
  #localStorageKey;

  constructor(key) {
    this.#localStorageKey = key;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.cartItems =
      JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
  }
  #saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }
  addToCart(productId) {
    let matchingItem;

    this.cartItems.forEach((item) => {
      if (item.productId === productId) {
        matchingItem = item;
      }
    });
    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: "1",
      });
    }
    this.#saveToStorage();
  }

  removeFromCart(productId) {
    const updatedCart = [];
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        updatedCart.push(cartItem);
      }
    });
    this.cartItems = updatedCart;
    this.#saveToStorage();
  }
  updateDeliveryOptions(productId, deliveryOptionId) {
    let matchingItem;
    thiscartItems.forEach((item) => {
      if (item.productId === productId) {
        matchingItem = item;
      }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;
    this.#saveToStorage();
  }

  emptyCart() {
    this.cartItems = [];
    this.#saveToStorage();
  }

  calculateCartQuantity() {
    let totalCartItems = 0;
    this.cartItems.forEach((item) => {
      totalCartItems += item.quantity;
    });
    return totalCartItems;
  }

  updateCart(productId, quantity) {
    const cartItem = this.cartItems.find(
      (item) => item.productId === productId,
    );
    cartItem.quantity = quantity;
    this.#saveToStorage();
  }
}

// Creating instance of the Cart
const cart = new Cart();
const businessCart = new Cart();

cart.localStorageKey = "cart-oop";
businessCart.localStorageKey = "cart-business";

console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);
