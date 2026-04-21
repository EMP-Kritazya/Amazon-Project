import Cart from "../models/cart.model.js";

const getItems = async (req, res) => {
  const cart = await Cart.find(req.userId);

  cartItems = cart.items;
};

export const addToCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.userId });

    const { productId, quantity, deleveryOptionId } = req.body;

    if (!cart) {
      // create new cart
      cart = await Cart.create({
        userId: req.userId,
        items: [],
      });
    }

    const existingItem = cart.items.find((item) => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({
        id: productId,
        quantity: quantity,
        deleveryOptionId: deleveryOptionId,
      });
    }

    await cart.save();

    // get total new items
    const totalItems = cart.items.length;

    const msg = "add-to-cart successful";
    return res.status(201).json({
      message: msg,
      totalItems: totalItems,
    });
  } catch (error) {
    res.send(500).json({
      message: "Failed to add to cart",
    });
  }
};

export const getCartItems = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.userId });

  if (!cart) {
    return res.send(404).json({
      message: "User not found. Please login again",
    });
  }

  const cartItems = await cart.items;
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
    const cart = await Cart.findOne({ userId: req.userId });

    const totalItems = cart.items.length;

    return res.json({
      message: "total items retrieved",
      totalItems: totalItems,
    });
  } catch (error) {
    return res.send(500).json({
      message: "Internal Server Error",
    });
  }
};
