const path = window.location.pathname;

// SCRIPT PARA MANEJAR EL INICIO DE SESIÓN
// =======================================

if (path == "/login.html") {

  const iniciarSesion = document.getElementById("login-button").addEventListener("click", () => {

    const emailLogin = document.getElementById("emailLogin");
    const contraLogin = document.getElementById("clave");
    let avisoLogin = document.getElementById("avisoLogin");

    if (contraLogin.value != "" && emailLogin.value != "") { // Asegúrate de validar ambos campos
      avisoLogin.style.display = "none";
      // Llama a IngresoLogin con los valores de email y clave
      IngresoLogin(emailLogin.value, contraLogin.value); // Pasar también la contraseña

    }
    else {
      avisoLogin.style.display = "block";
      avisoLogin.style.color = "#FFED00";
      avisoLogin.style.textAlign = "left";
      avisoLogin.innerText = "Por favor, evite dejar campos vacíos.";
      if (contraLogin.value == "") {
        contraLogin.classList.add("error");
      } else {
        contraLogin.classList.remove("error");
      }
      if (emailLogin.value == "") {
        emailLogin.classList.add("error");
      } else {
        emailLogin.classList.remove("error");
      }
    }


    function IngresoLogin(username, password) {

      // Validar el username y su password usando fetch
      // Si la validación es exitosa, redirigir a orders.html
      fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            // Guarda el userId en localStorage
            localStorage.setItem('userId', data.id); // Guardar userId en localStorage
            // Redirige al usuario a la página de órdenes de compra
            window.location.href = '/orders.html';
          } else {
            // Maneja el caso donde la validación falla, mostrando un mensaje de error
            alert('Usuario y/o contraseña incorrectos. Intente denuevo.');
          }
        })
        .catch(error => {
          alert("Algo salió mal");
          console.error('Error en la solicitud:', error);
        });
    }
  });


  const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/ // 7 a 14 numeros.
  };
}

// SCRIPT PARA MANEJAR AGREGAR ITEMS AL CARRITO
// ============================================

if (path == "/orders.html") {
  const productsContainer = document.getElementById('products');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalContainer = document.getElementById('cart-total');
  const checkoutButton = document.getElementById('checkout');

  let cart = [];

  // Función para cargar productos desde la API
  const loadProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/items');
      const products = await response.json();
      displayProducts(products);
    } catch (error) {
      console.error('Error al cargar productos:', error);
      alert('Error al cargar productos. Consulta la consola para más detalles.');
    }
  };

  // Función para mostrar productos en la lista
  const displayProducts = (products) => {
    productsContainer.innerHTML = '';
    products.forEach(product => {
      const productElement = document.createElement('div');
      productElement.classList.add('product');
      productElement.innerHTML = `
        <img src="${product.image || 'img/default.png'}" alt="${product.name}">
        <div class="product-info">
          <div>
            <p>${product.category_name}. ${product.name}</p>
          </div>
          <div>
            <p>Precio: $${product.price}</p>
          </div>
          <div>
            <button class="agregarAlCarrito" data-id="${product.id}">Agregar al Carrito</button>
          </div>
        </div>
      `;
      productsContainer.appendChild(productElement);
    });
  };

  // Función para agregar ítems al carrito
  const addToCart = (productId) => {
    const product = cart.find(item => item.id === productId);
    if (product) {
      product.amount++;
    } else {
      const productElement = [...productsContainer.querySelectorAll('.product')]
        .find(productElement => productElement.querySelector('button').dataset.id == productId);
      const name = productElement.querySelector('p').innerText;
      const price = parseFloat(productElement.querySelectorAll('p')[1].innerText.replace('Precio: $', ''));
      cart.push({ id: productId, name, price, amount: 1 });
    }
    displayCart();
  };

  // Función para eliminar ítems del carrito
  const removeFromCart = (productId) => {
    cart = cart.filter(item => item.id !== productId);
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
        <p>${item.name}</p>
        <p>Cantidad: ${item.amount}</p>
        <p>Precio: $${item.price * item.amount}</p>
        <button class="remove-btn" data-id="${item.id}">Eliminar</button>
      `;
      cartItemsContainer.appendChild(cartItemElement);
      total += item.price * item.amount;
    });
    cartTotalContainer.innerHTML = `<p>Total: $${total}</p>`;
    // Mostrar o ocultar botón de checkout según el carrito esté vacío
    checkoutButton.disabled = cart.length === 0;
  };

  // Eventos
  productsContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const productId = parseInt(e.target.dataset.id, 10);
      addToCart(productId);
    }
  });

  cartItemsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
      const productId = parseInt(e.target.dataset.id, 10);
      removeFromCart(productId);
    }
  });

  // Función para realizar el checkout
  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert('Debes agregar al menos un producto al carrito');
      return;
    }

    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('No se encontró el userId. Por favor, inicia sesión nuevamente.');
      return;
    }

    const orderItems = cart.map(item => ({
      item_id: item.id,
      amount: item.amount
    }));

    const order = {
      user_id: userId,
      items: orderItems
    };
    
    console.log('Order antes de enviar:', order); // Verifica la estructura de order aquí

    try {
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
        window.location.href = 'orders-list.html'; // Redirige a la lista de órdenes
      } else {
        alert('Error al realizar la compra');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      alert('Error al realizar la compra. Consulta la consola para más detalles.');
    }
  };

  // Agregar EventListener para el botón de Finalizar Compra
  checkoutButton.addEventListener('click', handleCheckout);

  // Cargar productos al inicio
  loadProducts();
}
