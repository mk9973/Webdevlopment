//  variables and functions
// var cart = [];

// let total = 0;

// function calculateTotal() {
//   total = cart.reduce((acc, item) => acc + item.price, 0);
// }

// function addItem(item) {
//   cart.push(item);
//   calculateTotal();
// }

// function getTotal() {
//   return total;
// }
// function getCartContents() {
//   return cart;
// }

// addItem({ id: 1, pName: 'Product1', price: 10 });
// addItem({ id: 2, pName: 'Product2', price: 20 });
// addItem({ id: 3, pName: 'Product3', price: 30 });

// //get the cart container
// const cartItems = document.getElementById('cart-items');

// //Display the cart items
// const cartContent = getCartContents();
// cartContent.forEach((item) => {
//   const listItem = document.createElement('li');
//   listItem.textContent = `${item.pName} - $${item.price}`;
//   cartItems.appendChild(listItem);
// });

// // Get the total price element
// const totalPriceElement = document.getElementById('total-price');
// // Display the total price
// totalPriceElement.textContent = `Total: $${getTotal()}`;

//without using iifi above code contain 'total' variable which  conflict with 'total' in app.js thats why we use iifi module concept;

const shoppingCart = (function () {
  // Private variables and functions
  let cart = [];
  let total = 0;

  function calculateTotal() {
    total = cart.reduce((acc, item) => acc + item.price, 0);
  }

  // Public methods
  return {
    addItem: function (item) {
      cart.push(item);
      calculateTotal();
    },
    getTotal: function () {
      return total;
    },
    getCartContents: function () {
      return cart;
    },
  };
})();

shoppingCart.addItem({ id: 1, pName: 'Product1', price: 10 });
shoppingCart.addItem({ id: 2, pName: 'Product2', price: 20 });
shoppingCart.addItem({ id: 3, pName: 'Product3', price: 30 });

//get the cart container
const cartItems = document.getElementById('cart-items');

//Display the cart items
const cartContent = shoppingCart.getCartContents();
cartContent.forEach((item) => {
  const listItem = document.createElement('li');
  listItem.textContent = `${item.pName} - $${item.price}`;
  cartItems.appendChild(listItem);
});

// Get the total price element
const totalPriceElement = document.getElementById('total-price');
// Display the total price
totalPriceElement.textContent = `Total: $${shoppingCart.getTotal()}`;
