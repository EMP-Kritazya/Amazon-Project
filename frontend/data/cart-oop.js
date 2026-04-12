function Cart(localStoragekey) {
  const cart = {
    cartItems: undefined,
    // method : shortcut for loadFromStorage: function(){}
    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStoragekey)) || [];
    },
    saveToStorage() {
      localStorage.setItem(localStoragekey, JSON.stringify(this.cartItems));
    },
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
      this.saveToStorage();
    },

    removeFromCart(productId) {
      const updatedCart = [];
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          updatedCart.push(cartItem);
        }
      });
      this.cartItems = updatedCart;
      this.saveToStorage();
    },

    updateDeliveryOptions(productId, deliveryOptionId) {
      let matchingItem;
      thiscartItems.forEach((item) => {
        if (item.productId === productId) {
          matchingItem = item;
        }
      });
      matchingItem.deliveryOptionId = deliveryOptionId;
      this.saveToStorage();
    },

    emptyCart() {
      this.cartItems = [];
      this.saveToStorage();
    },

    calculateCartQuantity() {
      let totalCartItems = 0;
      this.cartItems.forEach((item) => {
        totalCartItems += item.quantity;
      });
      return totalCartItems;
    },

    updateCart(productId, quantity) {
      const cartItem = this.cartItems.find(
        (item) => item.productId === productId,
      );
      cartItem.quantity = quantity;
      this.saveToStorage();
    },
  };
  return cart;
}
const cart = Cart("cart-oop");
const businessCart = Cart("cart-business");

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);
