// Initialize Cart Data
let cart = [];

// Update Cart UI
function updateCartUI() {
  const cartItemsDiv = document.getElementById("cart-items");
  const totalPriceDiv = document.getElementById("total-price");

  // Clear previous cart items
  cartItemsDiv.innerHTML = '';

  let totalPrice = 0;
  
  cart.forEach((item, index) => {
    totalPrice += item.price * item.quantity;

    const itemDiv = document.createElement('div');
    itemDiv.innerHTML = `
      <p>${item.name} - ₹${item.price} x ${item.quantity} <button onclick="removeFromCart(${index})">Remove</button></p>
      <button onclick="changeQuantity(${index}, 1)">+</button>
      <button onclick="changeQuantity(${index}, -1)">-</button>
    `;
    cartItemsDiv.appendChild(itemDiv);
  });

  totalPriceDiv.textContent = totalPrice;
}

// Add Item to Cart
function addToCart(productId) {
  const products = document.querySelectorAll(".product-card");
  const selectedProduct = products[productId - 1];
  const name = selectedProduct.querySelector('h3').textContent;
  const price = parseInt(selectedProduct.querySelector('p').textContent.replace('₹', ''));

  // Check if product is already in the cart
  const existingProductIndex = cart.findIndex(item => item.name === name);

  if (existingProductIndex >= 0) {
    cart[existingProductIndex].quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  updateCartUI();
}

// Remove Item from Cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

// Change Item Quantity
function changeQuantity(index, delta) {
  if (cart[index].quantity + delta > 0) {
    cart[index].quantity += delta;
  }
  updateCartUI();
}

// Show Cart
function showCart() {
  document.getElementById('cart').style.display = 'flex';
}

// Close Cart
document.getElementById('close-cart').addEventListener('click', () => {
  document.getElementById('cart').style.display = 'none';
});

// Event Listener for Add to Cart Buttons
const addButtons = document.querySelectorAll(".add-to-cart");
addButtons.forEach(button => {
  button.addEventListener("click", () => {
    addToCart(button.getAttribute("data-id"));
    showCart();
  });
});
