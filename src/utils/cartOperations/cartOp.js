import { getCart } from "../../services/api/cartApi/getCartApi";

// This function will prepare the order data (items):
// It will retrieve the cart object from the server, verify the consistency of
// the cart on the client ("selected" property is not on the server) and send
// back clear object
const prepareCartForOrder = async (cart, updateCartFromServer) => {
  try {
    const cartItems = await getCart();
    const cartItemsId = cartItems.map((item) => item.item_id);
    const orderDataCart = {};
    for (const item of Object.values(cart.items)) {
      if (item.selected) {
        orderDataCart[item.id] = {
          item_id: item.id,
          item_quantity: item.quantity,
        };
      }
      if (!cartItemsId.includes(item.id)) {
        updateCartFromServer(cartItems);
        throw new Error(
          "Cart data is inconsistent, cart was updated, try again"
        );
      }
    }
    return orderDataCart;
  } catch (error) {
    throw error;
  }
};

export default prepareCartForOrder;
