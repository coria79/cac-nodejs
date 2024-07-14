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

// SCRIPT PARA MANEJAR AGREGAR ITEMS AL CARRITO
// ============================================

if (path == "/orders-list.html") {

  // Función para cargar las órdenes desde la API y mostrarlas
  const loadOrders = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/orders');
      const orders = await response.json();
      displayOrders(orders);
    } catch (error) {
      console.error('Error al cargar órdenes:', error);
      alert('Error al cargar órdenes. Consulta la consola para más detalles.');
    }
  };

  // Función para mostrar las órdenes en el DOM
  const displayOrders = (orders) => {
    const ordersContainer = document.getElementById('orders');
    ordersContainer.innerHTML = '';

    orders.forEach(order => {
      const orderElement = document.createElement('div');
      orderElement.classList.add('order');
      orderElement.innerHTML = `
        <div class="order-info">
          <p><strong>Orden ID:</strong> ${order.id}</p>
          <p><strong>Usuario ID:</strong> ${order.user_id}</p>
          <p><strong>Fecha de Creación:</strong> ${new Date(order.created_at).toLocaleString()}</p>
        </div>
        <div class="order-items">
          <h4>Ítems de la Orden:</h4>
          ${order.items.map(item => `
            <div class="order-item">
              <p><strong>Ítem ID:</strong> ${item.item_id}</p>
              <p><strong>Cantidad:</strong> ${item.amount}</p>
            </div>
          `).join('')}
        </div>
        <div class="order-actions">
          <button class="edit-btn" data-order-id="${order.id}">Editar</button>
          <button class="delete-btn" data-order-id="${order.id}">Eliminar</button>
        </div>
      `;
      ordersContainer.appendChild(orderElement);

      // Agregar listeners para los botones de editar y eliminar
      const editButton = orderElement.querySelector('.edit-btn');
      const deleteButton = orderElement.querySelector('.delete-btn');

      editButton.addEventListener('click', () => {
        // Redirigir a la página de edición de la orden con el ID correspondiente
        window.location.href = `/orders-edit.html?id=${order.id}`;
      });

      deleteButton.addEventListener('click', () => {
        // Confirmar la eliminación de la orden
        if (confirm(`¿Seguro que quieres eliminar la orden ${order.id}?`)) {
          deleteOrder(order.id);
        }
      });
    });
  };

  // Función para eliminar una orden
  const deleteOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/orders/${orderId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert(`Orden ${orderId} eliminada correctamente`);
        loadOrders(); // Recargar la lista de órdenes después de la eliminación
      } else {
        alert('Error al intentar eliminar la orden');
      }
    } catch (error) {
      console.error('Error al eliminar la orden:', error);
      alert('Error al intentar eliminar la orden. Consulta la consola para más detalles.');
    }
  };

  // Cargar las órdenes al cargar la página
  loadOrders();

}

// SCRIPT PARA MANEJAR EDITAR LA ORDEN YA CREADA
// =============================================


if (path.includes("/orders-edit.html")) {
  const orderId = new URLSearchParams(window.location.search).get('id');

  // Función para cargar los detalles de la orden desde la API
  const loadOrderDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/orders/${orderId}`);
      const order = await response.json();
      displayOrderDetails(order);
    } catch (error) {
      console.error(`Error al cargar la orden ${orderId}:`, error);
      alert(`Error al cargar la orden ${orderId}. Consulta la consola para más detalles.`);
    }
  };

  // Función para mostrar los detalles de la orden en el formulario de edición
  const displayOrderDetails = (order) => {
    const orderForm = document.getElementById('edit-order-form');
    orderForm.innerHTML = `
      <h2 class="order-edit-h2">Editar Orden</h2>
      <div class="order-edit-container">
        <div class="order-id">
            <div>
              <label for="order-id-${order.id}">Orden Número:</label>
            </div>
            <div>
              <input type="number" id="order-id-${order.id}" value="${order.id}" disabled>  
            </div>          
        </div>

        <div class="order-user">
          <label for="order-user-${order.user_id}">Usuario ID:</label>
          <input type="number" id="order-user-${order.user_id}" value="${order.user_id}" disabled>
        </div>

        <div class="order-date">
          <label for="order-date-${new Date(order.created_at).toLocaleString()}">Fecha Creación:</label>
          <input type="text" id="order-user-date-${new Date(order.created_at).toLocaleString()}" value="${new Date(order.created_at).toLocaleString()}" disabled>
        </div>
      
      </div>
  
      <h3 class="order-edit-h2">Ítems de la Orden:</h3>

      ${order.items.map(item => `
        <div class="order-edit-container">
          <div class="order-item">
            <label for="order-item-${item.item_id}">Ítem ID:</label>
            <input type="number" id="order-item-${item.item_id}" value="${item.item_id}" disabled>        
          </div>
          <div class="order-amount">
            <label for="amount-${item.item_id}">Cantidad:</label>
            <input type="number" id="amount-${item.item_id}" value="${item.amount}" min="1" required>
          </div>
        </div>
        
      `).join('')}
      <div class="order-edit-container">
        <button id="update-order-btn">Actualizar Orden</button>
      </div>
      
    `;

    const updateOrderButton = document.getElementById('update-order-btn');
    updateOrderButton.addEventListener('click', () => {
      updateOrder(order);
    });
  };

  const updateOrder = async (order) => {
    // Supongamos que queremos actualizar el primer ítem de la orden
    const itemId = order.items[0].item_id;

    // Construir el ID del elemento para la cantidad del ítem
    const amountElementId = `amount-${itemId}`;

    // Obtener el valor de cantidad del elemento del DOM
    const amountValue = parseInt(document.getElementById(amountElementId).value, 10);

    console.log("Valor de amount obtenido:", amountValue);

    const updatedItems = order.items.map(item => ({
      item_id: item.item_id,
      amount: item.item_id === itemId ? amountValue : item.amount
    }));

    const updatedOrder = {
      user_id: order.user_id,
      items: updatedItems
    };

    try {
      const responseEdit = await fetch(`http://localhost:3000/api/orders/${order.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedOrder)
      });

      if (responseEdit.ok) {
        alert(`Orden ${order.id} actualizada correctamente`);
        window.location.href = 'orders-list.html'; // Redirige de vuelta a la lista de órdenes
      } else {
        alert('Error al intentar actualizar la orden');
      }
    } catch (error) {
      console.error(`Error al actualizar la orden ${order.id}:`, error);
      alert(`Error al intentar actualizar la orden ${order.id}. Consulta la consola para más detalles.`);
    }
  };

  // Cargar los detalles de la orden al cargar la página
  loadOrderDetails();
}
