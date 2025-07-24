function addToCart(itemName) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

 
  const existingItem = cart.find(item => item.name === itemName);
  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({ name: itemName, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalQty = 0;
  cart.forEach(item => {
    totalQty += item.qty;
  });

  const cartCountElem = document.getElementById("cart-count");
  if (cartCountElem) {
    cartCountElem.textContent = totalQty;
  }
}


window.onload = updateCartCount;
