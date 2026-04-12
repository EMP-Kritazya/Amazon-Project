import { cart } from "./cart.js";

export const deliveryOptions = [
  {
    id: "1",
    deliveryDays: 7,
    priceCents: 0,
  },
  {
    id: "2",
    deliveryDays: 3,
    priceCents: 499,
  },
  {
    id: "3",
    deliveryDays: 1,
    priceCents: 999,
  },
];

export function getDeliveryCharge() {
  let total = 0;

  cart.forEach((cartItem) => {
    let deliveryId = cartItem.deliveryOptionId;
    let deliveryOption = deliveryOptions.find((item) => item.id === deliveryId);

    let quantity = deliveryOption.priceCents;
    total += quantity;
  });
  return total;
}
