/* Create a global variable that contains the total amount the user has entered into the cash received field.
  If multiple attempts to add cash are made, the totalPaid variable will hold the sum of those attempts. */
var totalPaid = 0;

/* Create an array named products which you will use to add all of your product object literals that you create in the next step. */

/* Create 3 or more product objects using object literal notation 
   Each product should include five properties
   - name: name of product (string)
   - price: price of product (number)
   - quantity: quantity in cart should start at zero (number)
   - productId: unique id for the product (number)
   - image: picture of product (url string)
*/

/* Images provided in /images folder. All images from Unsplash.com
   - cherry.jpg by Mae Mu
   - orange.jpg by Mae Mu
   - strawberry.jpg by Allec Gomes
*/
const products = [{
    name: "Cherry", 
    price: 1.99, 
    quantity: 0, 
    productId: 1, 
    image: "../images/cherry.jpg"
  },
  {
    name: "Orange",
    price: 2.49, 
    quantity: 0, 
    productId: 2, 
    image: "../images/orange.jpg"
  },
  {
    name: "Strawberry", 
    price: 2.99, 
    quantity: 0, 
    productId: 3, 
    image: "../images/strawberry.jpg"
  }];

/* Declare an empty array named cart to hold the items in the cart */
let cart = [];

// Define a helper function to reuse when looking for a product index
function findProductIndex(array, productId) {
  for (let i = 0; i < array.length; i++) {
      if (array[i].productId === productId) {
          return i;
      }
  }
  return -1; // Returns -1 if not found
}

/* Create a function named addProductToCart that takes in the product productId as an argument
  - addProductToCart should get the correct product based on the productId
  - addProductToCart should then increase the product's quantity
  - if the product is not already in the cart, add it to the cart
*/
function addProductToCart(productId) {
  // Search for the correct product
  let productIndex = findProductIndex(products, productId);

  // If product is not found, does nothing
  if (productIndex === -1) return;

  // Else, verifies if the product is already in cart
  let cartIndex = findProductIndex(cart, productId);

  if (cartIndex !== -1) {
      // Product already in cart, increase quantity
      cart[cartIndex].quantity += 1;
  } else {
      // Product not in cart, set quantity to 1 and add to cart
      products[productIndex].quantity = 1;
      cart.push(products[productIndex]);
  }
}

/* Create a function named increaseQuantity that takes in the productId as an argument
  - increaseQuantity should get the correct product based on the productId
  - increaseQuantity should then increase the product's quantity
*/
function increaseQuantity(productId) {
  // Search for the correct cart index for product
  let cartIndex = findProductIndex(cart, productId);

  // If product not found, does nothing
  if (cartIndex === -1) return;

  // Else, increase quantity
  if (cartIndex !== -1) {
      cart[cartIndex].quantity += 1;
  }
}

/* Create a function named decreaseQuantity that takes in the productId as an argument
  - decreaseQuantity should get the correct product based on the productId
  - decreaseQuantity should decrease the quantity of the product
  - if the function decreases the quantity to 0, the product is removed from the cart
*/
function decreaseQuantity(productId) {
  // Search for the correct cart index for product
  let cartIndex = findProductIndex(cart, productId);

  // If product not found, does nothing
  if (cartIndex === -1) return;

  // Else, decrement quantity in product
  cart[cartIndex].quantity -= 1;

  // If quantity reaches 0 or less, remove product from cart
  if (cart[cartIndex].quantity <= 0) {
      removeProductFromCart(productId);
  }
}

/* Create a function named removeProductFromCart that takes in the productId as an argument
  - removeProductFromCart should get the correct product based on the productId
  - removeProductFromCart should update the product quantity to 0
  - removeProductFromCart should remove the product from the cart
*/
function removeProductFromCart(productId) {
  // Search for the correct product index in cart
  let cartIndex = findProductIndex(cart, productId);

  // If product found in cart, set its quantity to 0 (just to make sure) and remove it from cart
  if (cartIndex > -1) {
      cart[cartIndex].quantity = 0;
      cart.splice(cartIndex, 1);
  }
}


/* Create a function named cartTotal that has no parameters
  - cartTotal should iterate through the cart to get the total cost of all products
  - cartTotal should return the total cost of the products in the cart
  Hint: price and quantity can be used to determine total cost
*/
function cartTotal() {
  // Sum total amount (price * quantity for each item in cart)
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
      total += cart[i].price * cart[i].quantity;
  }

  return total;
}

/* Create a function called emptyCart that empties the products from the cart */
function emptyCart() {
  // Set all quantities to 0
  for (let i = 0; i < cart.length; i++) {
      cart[i].quantity = 0;
  }

  // Clear cart array
  cart = [];
}

/* Create a function named pay that takes in an amount as an argument
  - amount is the money paid by customer
  - pay will return a negative number if there is a remaining balance
  - pay will return a positive number if money should be returned to customer
  Hint: cartTotal function gives us cost of all the products in the cart  
*/
function pay(amount) {
  //Add payment to totalPaid, in order to hold the sum of all payments
  totalPaid += amount;
  const difference = totalPaid - cartTotal();

  /* If customer paid in full or excess, reset totalPaid sum.
    The need for this was made evident by the failure of 'pay less than the total works'
    test, ran after 'pay more than the total works', when totalPaid is not reset */
  if (difference >= 0) {
    totalPaid = 0;
    /* Perhaps here we could also reset the cart, but it's not clear if
      this is required and the front end doesn't respond well if we only reset
      cart data in memory -- would require dealing with additional UI implications (clear fields,
      hide cards etc.) */
  }

  //Return difference
  return difference;
}

/* Place stand out suggestions here (stand out suggestions can be found at the bottom of the project rubric.)*/


/* The following is for running unit tests. 
   To fully complete this project, it is expected that all tests pass.
   Run the following command in terminal to run tests
   npm run test
*/

module.exports = {
   products,
   cart,
   addProductToCart,
   increaseQuantity,
   decreaseQuantity,
   removeProductFromCart,
   cartTotal,
   pay, 
   emptyCart,
   /* Uncomment the following line if completing the currency converter bonus */
   // currency
}
