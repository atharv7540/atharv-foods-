
function addToCart(itemName) {
  // Get all menu cards
  const cards = document.querySelectorAll('.menu-card');
  let item = null;
  // Find the card with the matching item name
  cards.forEach(card => {
    const name = card.querySelector('h3, h4').textContent.trim();
    if (name === itemName) {
      item = {
        name: name,
        price: parseInt(card.querySelector('.price').textContent.replace('₹', '')),
        quantity: 1
      };
    }
  });
  if (!item) return;

 
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  // Check if item already in cart
  const existing = cart.find(i => i.name === item.name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push(item);
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount && updateCartCount();
  // Redirect to cart.html after adding
  window.location.href = 'cart.html';
}

function renderCart() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const container = document.getElementById('cart-items');
  container.innerHTML = '';
  let total = 0;
  cart.forEach((item, idx) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    container.innerHTML += `
      <div class="cart-item">
        <div class="item-info">
          <h4>${item.name}</h4>
          <p>Qty: <input type="number" min="1" value="${item.quantity}" data-idx="${idx}" class="cart-qty"></p>
        </div>
        <div class="item-actions">
          <p class="item-price">₹${itemTotal}</p>
          <button class="remove-btn" data-idx="${idx}">Remove</button>
        </div>
      </div>
    `;
  });
  document.getElementById('cart-total').textContent = `₹${total}`;
}

// Handle quantity change and remove
document.addEventListener('DOMContentLoaded', function () {
  renderCart();
  document.getElementById('cart-items').addEventListener('input', function (e) {
    if (e.target.classList.contains('cart-qty')) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const idx = e.target.getAttribute('data-idx');
      cart[idx].quantity = parseInt(e.target.value) || 1;
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
      updateCartCount();
    }
  });
  document.getElementById('cart-items').addEventListener('click', function (e) {
    if (e.target.classList.contains('remove-btn')) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const idx = e.target.getAttribute('data-idx');
      cart.splice(idx, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
      updateCartCount();
    }
  });
});
