 // Initial Cart Array and Count
 let cart = [];
 let cartCount = 0;
 // Wishlist Array and Count
let wishlist = [];
let wishlistCount = 0;

 // Elements
 const cartItems = document.getElementById('cart-items');
 const cartCountSpan = document.getElementById('cart-count');
 const addToCartButtons = document.querySelectorAll('.add-to-cart');
 const cartSidebar = document.getElementById('cartSidebar');
 const emptyCartMessage = document.getElementById('empty-cart-message');
 const alertMessage = document.getElementById('alertMessage');
 const cartFooter = document.querySelector('.cart-footer');
 const mainContent = document.getElementById('mainContent');

 // Add to Cart Function
 addToCartButtons.forEach(button => {
   button.addEventListener('click', () => {
     const productName = button.getAttribute('data-product');
     const productPrice = button.getAttribute('data-price');
     const productImage = button.getAttribute('data-image');
     addToCart(productName, productPrice, productImage);
   });
 });

 function addToCart(productName, productPrice, productImage) {
   const existingProduct = cart.find(item => item.name === productName);

   if (existingProduct) {
     existingProduct.quantity++;
   } else {
     const product = { name: productName, price: parseFloat(productPrice), quantity: 1, image: productImage };
     cart.push(product);
   }

   cartCount++;
   cartCountSpan.innerText = cartCount;
   updateCart();
   showAlert(`"${productName}" added to the cart!`);
   showCartSidebar();
 }

 function updateCart() {
   cartItems.innerHTML = ''; // Clear the cart list

   if (cart.length === 0) {
     emptyCartMessage.style.display = 'flex';
     cartFooter.classList.add('hidden'); // Hide footer buttons when cart is empty
   } else {
     emptyCartMessage.style.display = 'none';
     cartFooter.classList.remove('hidden'); // Show footer buttons when cart has items
     cart.forEach((item, index) => {
       const li = document.createElement('li');
       li.className = 'list-group-item d-flex justify-content-between align-items-center';

       // Product Info with Quantity Control Buttons
       li.innerHTML = `
         <div class="d-flex align-items-center">
           <img src="${item.image}" alt="${item.name}" class="img-thumbnail mr-2" style="width: 50px; height: 50px;">
           <div>
             <span>${item.name}</span><br>
             <small>Price: Rp ${item.price.toFixed(2)}</small>
           </div>
         </div>
         <div class="d-flex align-items-center">
           <button class="quantity-btn btn btn-sm btn-secondary mr-1" onclick="decrementQuantity(${index})">-</button>
           <span class="quantity">${item.quantity}</span>
           <button class="quantity-btn btn btn-sm btn-secondary ml-1" onclick="incrementQuantity(${index})">+</button>
           <button class="btn btn-sm btn-danger ml-2" onclick="deleteProduct(${index})"><i class="fas fa-trash"></i></button>
         </div>
       `;
       cartItems.appendChild(li);
     });
   }
 }

 function incrementQuantity(index) {
   cart[index].quantity++;
   cartCount++;
   cartCountSpan.innerText = cartCount;
   updateCart();
 }

 function decrementQuantity(index) {
   if (cart[index].quantity > 1) {
     cart[index].quantity--;
     cartCount--;
   } else {
     cartCount -= cart[index].quantity;
     cart.splice(index, 1);
   }
   cartCountSpan.innerText = cartCount;
   updateCart();
 }

 function deleteProduct(index) {
   cartCount -= cart[index].quantity;
   cart.splice(index, 1);
   cartCountSpan.innerText = cartCount;
   updateCart();
 }

 // Toggle Cart Sidebar
 function toggleCartSidebar() {
   cartSidebar.classList.toggle('show');
 }

 function showCartSidebar() {
   cartSidebar.classList.add('show');
 }

 function hideCartSidebar() {
   cartSidebar.classList.remove('show');
 }

 // Show Alert Message
 function showAlert(message) {
   alertMessage.innerText = message;
   alertMessage.classList.add('show');
   alertMessage.style.display = 'block';
   setTimeout(() => {
     alertMessage.classList.remove('show');
     alertMessage.style.display = 'none';
   }, 2000);
 }

 // Close Cart Sidebar When Clicking Outside
 document.addEventListener('click', (event) => {
   // Ensure that the click is outside the sidebar and not on buttons inside the sidebar
   if (
     !cartSidebar.contains(event.target) &&
     !document.getElementById('cartIcon').contains(event.target) &&
     !event.target.closest('.quantity-btn, .btn-danger') // Exclude buttons inside the cart
   ) {
     hideCartSidebar();
   }
 });

 // Clear Cart
 document.getElementById('clearCart').addEventListener('click', (event) => {
   event.stopPropagation(); // Prevent the sidebar from closing
   cart = [];
   cartCount = 0;
   cartCountSpan.innerText = cartCount;
   updateCart();
 });

 // Open Cart Sidebar on Cart Icon Click
 document.getElementById('cartIcon').addEventListener('click', (event) => {
   event.stopPropagation(); // Prevent the sidebar from closing
   if (cart.length === 0) {
     emptyCartMessage.style.display = 'flex';
   }
   toggleCartSidebar();
 });

 // Prevent closing sidebar when interacting inside
 cartSidebar.addEventListener('click', (event) => {
   event.stopPropagation();
 });

 
    document.addEventListener("DOMContentLoaded", function() {
      // Get references to the search icon and the search bar container
      const searchIcon = document.getElementById('searchIcon');
      const searchBarContainer = document.getElementById('searchBarContainer');
      const searchBar = document.getElementById('searchBar');

      // Add click event listener to the search icon
      searchIcon.addEventListener('click', function(event) {
          event.preventDefault(); // Prevent the default anchor click behavior
          
          // Toggle the display of the search bar container
          if (searchBarContainer.style.display === 'none' || searchBarContainer.style.display === '') {
              searchBarContainer.style.display = 'block'; // Show the search bar
              searchBar.focus(); // Focus on the search input field
          } else {
              searchBarContainer.style.display = 'none'; // Hide the search bar
          }
      });
  });

 

// Elements
const wishlistItems = document.getElementById('wishlist-items');
const wishlistCountSpan = document.getElementById('wishlist-count');
const addToWishlistButtons = document.querySelectorAll('.wishlist'); // Updated selector for wishlist button
const wishlistSidebar = document.getElementById('wishlistSidebar');
const emptyWishlistMessage = document.getElementById('empty-wishlist-message');
const wishlistFooter = document.querySelector('.wishlist-footer');

// Add to Wishlist Function
addToWishlistButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default behavior
        const productName = button.getAttribute('data-product');
        const productPrice = button.getAttribute('data-price');
        const productImage = button.getAttribute('data-image');
        addToWishlist(productName, productPrice, productImage);
    });
});

function addToWishlist(productName, productPrice, productImage) {
    const existingProduct = wishlist.find(item => item.name === productName);

    if (existingProduct) {
        showAlert(`"${productName}" is already in your wishlist!`);
    } else {
        const product = { name: productName, price: parseFloat(productPrice), image: productImage };
        wishlist.push(product);
        wishlistCount++;
        wishlistCountSpan.innerText = wishlistCount;
        updateWishlist();
        showAlert(`"${productName}" added to the wishlist!`);
        showWishlistSidebar();
    }
}

// Update Wishlist Display
function updateWishlist() {
    wishlistItems.innerHTML = ''; // Clear the wishlist

    if (wishlist.length === 0) {
        emptyWishlistMessage.style.display = 'flex';
        wishlistFooter.classList.add('hidden');
    } else {
        emptyWishlistMessage.style.display = 'none';
        wishlistFooter.classList.remove('hidden');
        wishlist.forEach((item, index) => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';

            li.innerHTML = `
                <div class="d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" class="img-thumbnail mr-2" style="width: 50px; height: 50px;">
                    <div>
                        <span>${item.name}</span><br>
                        <small>Price: $${item.price.toFixed(2)}</small>
                    </div>
                </div>
                <div class="d-flex align-items-center">
                    <button class="btn btn-sm btn-danger ml-2" onclick="removeFromWishlist(${index})"><i class="fas fa-trash"></i></button>
                    <button class="btn btn-sm btn-primary ml-2" onclick="moveToCart(${index})">Move to Cart</button>
                </div>
            `;
            wishlistItems.appendChild(li);
        });
    }
}

function removeFromWishlist(index) {
    wishlistCount--;
    wishlist.splice(index, 1);
    wishlistCountSpan.innerText = wishlistCount;
    updateWishlist();
}

// Clear Wishlist
document.getElementById('clearWishlist').addEventListener('click', () => {
    clearWishlist();
});

function clearWishlist() {
    wishlist = [];
    wishlistCount = 0;
    wishlistCountSpan.innerText = wishlistCount;
    updateWishlist();
}

// Move Items to Cart Individually or All
function moveToCart(index) {
    const product = wishlist[index];
    addToCart(product.name, product.price, product.image); // Add to cart function to be defined elsewhere
    removeFromWishlist(index); // Remove from wishlist
}

document.getElementById('moveAllToCart').addEventListener('click', () => {
    moveAllToCart();
});

function moveAllToCart() {
    wishlist.forEach(item => {
        addToCart(item.name, item.price, item.image);
    });
    clearWishlist();
}

// Wishlist Sidebar Toggle Functions
function toggleWishlistSidebar() {
    wishlistSidebar.classList.toggle('show');
}

function showWishlistSidebar() {
    wishlistSidebar.classList.add('show');
}

function hideWishlistSidebar() {
    wishlistSidebar.classList.remove('show');
}

// Open Wishlist Sidebar on Wishlist Icon Click
document.getElementById('wishlistIcon').addEventListener('click', (event) => {
    event.stopPropagation();
    toggleWishlistSidebar();
});

// Close Wishlist Sidebar When Clicking Outside
document.addEventListener('click', (event) => {
    if (
        !wishlistSidebar.contains(event.target) &&
        !document.getElementById('wishlistIcon').contains(event.target)
    ) {
        hideWishlistSidebar();
    }
});

wishlistSidebar.addEventListener('click', (event) => {
    event.stopPropagation();
});

document.addEventListener("DOMContentLoaded", function()
{
  // Check if the wishlist is empty when the page loads
  updateWishlist();

 });
