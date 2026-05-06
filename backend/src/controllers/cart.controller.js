import Cart from "../models/cart.model.js";

const getCart = async (userId) => {
  let cart = await Cart.findOne({ userId: userId });

  if (!cart) {
    // create new cart
    cart = await Cart.create({
      userId: userId,
      items: [],
    });
  }

  return cart;
};

export const addToCart = async (req, res) => {
  try {
    const cart = await getCart(req.userId);
    console.log(req.body);
    const { productId, quantity, deliveryOptionId } = req.body;

    const existingItem = cart.items.find(
      (item) => item.id.toString() === productId.toString(),
    );

    if (existingItem) {
      existingItem.quantity += Number(quantity);
    } else {
      cart.items.push({
        id: productId,
        quantity: quantity,
        deliveryOptionId: deliveryOptionId,
      });
    }

    await cart.save();

    const msg = "add-to-cart successful";

    return res.status(201).json({
      message: msg,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to add to cart",
    });
  }
};

export const getCartItems = async (req, res) => {
  let cart = await getCart(req.userId);

  if (!cart) {
    return res.status(404).json({
      message: "User not found. Please login again",
      items: [],
    });
  }

  let cartItems = cart.items;

  if (!cartItems) {
    cartItems = [];
  }
  return res.json({
    message: "successfully loaded cart items",
    items: cartItems,
  });
};

export const cartQuantity = async (req, res) => {
  try {
    const cart = await getCart(req.userId);

    let totalItems = 0;

    cart.items.forEach((item) => {
      totalItems += Number(item.quantity);
    });

    return res.json({
      message: "total items retrieved",
      totalItems: totalItems,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
