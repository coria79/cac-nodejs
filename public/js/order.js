// Script para manejar el carrito de compras
document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalContainer = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout');
  
    let cart = [];
  
    // Función para cargar productos desde la API
    const loadProducts = async () => {
      const response = await fetch('http://localhost:3000/api/items');
      const products = await response.json();
      displayProducts(products);
    };
  
    // Función para mostrar productos en la lista
    const displayProducts = (products) => {
      productsContainer.innerHTML = '';
      products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
          <img src="${product.image || 'img/default.png'}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>${product.category_name}</p>

          <p>Precio: $${product.price}</p>
          <button data-id="${product.id}">Agregar al Carrito</button>
        `;
        productsContainer.appendChild(productElement);
      });
      console.log(products);
    };
  
    // Función para agregar ítems al carrito
    const addToCart = (productId) => {
      const product = cart.find(item => item.id === productId);
      if (product) {
        product.amount++;
      } else {
        const productElement = [...productsContainer.querySelectorAll('.product')]
          .find(productElement => productElement.querySelector('button').dataset.id == productId);
        const name = productElement.querySelector('h3').innerText;
        const price = parseFloat(productElement.querySelector('p').innerText.replace('Precio: $', ''));
        cart.push({ id: productId, name, price, amount: 1 });
      }
      displayCart();
    };
  
    // Función para mostrar ítems en el carrito
    const displayCart = () => {
      cartItemsContainer.innerHTML = '';
      let total = 0;
      cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
          <h3>${item.name}</h3>
          <p>Cantidad: ${item.amount}</p>
          <p>Precio: $${item.price * item.amount}</p>
        `;
        cartItemsContainer.appendChild(cartItemElement);
        total += item.price * item.amount;
      });
      cartTotalContainer.innerHTML = `<h3>Total: $${total}</h3>`;
    };
  
    // Función para manejar el proceso de compra
    const handleCheckout = async () => {
      const order = {
        user_id: 1,  // Aquí deberías obtener el ID del usuario logueado
        items: cart.map(item => ({
          item_id: item.id,
          amount: item.amount
        }))
      };
      const response = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
      });
      if (response.ok) {
        alert('Compra realizada con éxito');
        cart = [];
        displayCart();
      } else {
        alert('Error al realizar la compra');
      }
    };
  
    // Eventos
    productsContainer.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
        const productId = parseInt(e.target.dataset.id, 10);
        addToCart(productId);
      }
    });
  
    checkoutButton.addEventListener('click', handleCheckout);
  
    // Cargar productos al inicio
    loadProducts();
  });
  