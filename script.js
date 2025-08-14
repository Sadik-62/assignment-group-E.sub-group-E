document.addEventListener('DOMContentLoaded', function() {

    // --- Data Management ---
    const allProducts = {
        deals: [{
            id: 101,
            title: "your summer jacket",
            startingPrice: 45,
            discountPrice: 39,
            image: 'image/deal-1.jpg'
        }, {
            id: 102,
            title: "Handmade Ceramic Vase",
            startingPrice: 55,
            discountPrice: 49,
            image: 'image/deal-2.jpg'
        }, {
            id: 103,
            title: "Organic Coffee Beans",
            startingPrice: 65,
            discountPrice: 59,
            image: 'image/deal-3.jpg'
        }, {
            id: 104,
            title: "Artisanal Scented Candle Set",
            startingPrice: 75,
            discountPrice: 69,
            image: 'image/deal-4.jpg'
        }],
        popular: [{
            id: 201,
            name: 'Wireless Headphones',
            price: 99.99,
            description: 'Experience crystal-clear audio with our top-rated wireless headphones. Perfect for music lovers and gamers alike.',
            image: 'image/product-1.jpg',
            category: 'electronics'
        }, {
            id: 202,
            name: 'Smart Watch',
            price: 149.99,
            description: 'Stay connected and track your fitness goals with this sleek and powerful smart watch. It’s more than just a watch.',
            image: 'image/product-2.jpg',
            category: 'electronics'
        }, {
            id: 203,
            name: "Men's Casual Shirt",
            price: 29.99,
            description: "A comfortable and stylish shirt perfect for any casual outing. Made from 100% breathable cotton.",
            image: 'image/product-3.jpg',
            category: "men's clothing"
        }, {
            id: 204,
            name: 'Gaming Mouse',
            price: 59.99,
            description: 'Gain the competitive edge with this ergonomic gaming mouse, featuring customizable buttons and lightning-fast response times.',
            image: 'image/product-4.jpg',
            category: 'electronics'
        }, {
            id: 205,
            name: 'External Hard Drive',
            price: 89.99,
            description: 'Store all your important files securely with this fast and reliable external hard drive. Massive storage in a compact design.',
            image: 'image/product-5.jpg',
            category: 'electronics'
        }, {
            id: 206,
            name: 'Bluetooth Speaker',
            price: 75.00,
            description: 'Fill any room with rich, immersive sound. This portable speaker offers long battery life and deep bass.',
            image: 'image/product-6.jpg',
            category: 'electronics'
        }, {
            id: 207,
            name: "Women's Summer Dress",
            price: 45.50,
            description: "A light and breezy floral dress, perfect for a sunny day or a special evening out.",
            image: 'image/product-7.jpg',
            category: "women's clothing"
        }, {
            id: 208,
            name: 'Kids\' Toy Car',
            price: 15.00,
            description: "A durable and fun toy car for kids, designed for hours of imaginative play.",
            image: 'image/product-8.jpg',
            category: 'toys'
        }, {
            id: 209,
            name: 'Leather Jacket',
            price: 120.00,
            description: "Classic men's leather jacket. A timeless piece that adds style to any outfit.",
            image: 'image/product-9.jpg',
            category: "men's clothing"
        }, {
            id: 210,
            name: 'Elegant Handbag',
            price: 75.00,
            description: "An elegant and spacious handbag, perfect for work or a night out. High-quality materials.",
            image: 'image/product-10.jpg',
            category: "women's clothing"
        }, {
            id: 211,
            name: 'Digital Camera',
            price: 450.00,
            description: "Capture stunning photos and videos with this professional-grade digital camera.",
            image: 'image/product-11.jpg',
            category: 'electronics'
        }, {
            id: 212,
            name: 'Stylish Sunglasses',
            price: 35.00,
            description: "Protect your eyes with these stylish and polarized sunglasses. A must-have accessory.",
            image: 'image/product-12.jpg',
            category: 'accessories'
        }]
    };

    let cartItems = [];

    // --- Utility Functions ---
    // Generates a random order number
    function generateOrderNumber() {
        return `#${Math.floor(Math.random() * 900000000) + 100000000}`;
    }

    // Formats a number into a currency string
    function formatPrice(price) {
        return `$${price.toFixed(2)}`;
    }

    // Updates the shopping cart and badge
    function updateCart() {
        const cartBadge = document.getElementById('cart-badge');
        const cartTotalElement = document.getElementById('cart-total');
        const cartModalBody = document.getElementById('cart-modal-body');

        // Update badge
        const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
        cartBadge.textContent = totalItems;
        cartBadge.style.display = totalItems > 0 ? 'block' : 'none';

        // Update cart modal body
        if (cartItems.length === 0) {
            cartModalBody.innerHTML = `<p class="text-center text-muted">Your cart is empty.</p>`;
            cartTotalElement.textContent = formatPrice(0);
        } else {
            cartModalBody.innerHTML = '';
            let total = 0;
            cartItems.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                const cartItemHtml = `
                    <div class="d-flex justify-content-between align-items-center mb-2 p-2 border-bottom">
                        <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
                        <div class="flex-grow-1 ms-3">
                            <h6 class="mb-0">${item.name}</h6>
                            <small class="text-muted">${item.quantity} x ${formatPrice(item.price)}</small>
                        </div>
                        <div>
                            <span class="fw-bold">${formatPrice(itemTotal)}</span>
                            <button class="btn btn-sm btn-danger remove-from-cart-btn ms-2" data-product-id="${item.id}">&times;</button>
                        </div>
                    </div>
                `;
                cartModalBody.insertAdjacentHTML('beforeend', cartItemHtml);
            });
            cartTotalElement.textContent = formatPrice(total);
        }

        // Add event listeners for remove buttons in the cart modal
        cartModalBody.querySelectorAll('.remove-from-cart-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.currentTarget.dataset.productId);
                cartItems = cartItems.filter(item => item.id !== productId);
                updateCart();
            });
        });
    }

    // Adds a product to the cart or updates its quantity
    function addToCart(product, quantity) {
        const existingItem = cartItems.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cartItems.push({
                ...product,
                quantity
            });
        }
        updateCart();
    }

    // --- Initialization & Event Listeners ---

    // Navbar Search
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");
    const searchBtn = document.getElementById("searchBtn");
    const navSearchProducts = allProducts.popular.map(p => p.name).concat(allProducts.deals.map(d => d.title));

    function performSearch() {
        const query = searchInput.value.toLowerCase();
        searchResults.innerHTML = "";
        if (query) {
            const filtered = navSearchProducts.filter(p => p.toLowerCase().includes(query));
            filtered.forEach(item => {
                const li = document.createElement("li");
                li.textContent = item;
                li.addEventListener("click", () => {
                    searchInput.value = item;
                    searchResults.innerHTML = "";
                });
                searchResults.appendChild(li);
            });
        }
    }
    searchInput.addEventListener("input", performSearch);
    searchBtn.addEventListener("click", performSearch);
    document.addEventListener("click", (e) => {
        if (!e.target.closest('.input-group')) {
            searchResults.innerHTML = '';
        }
    });

    // Get User Live Location
    function getLocation() {
        const locationElement = document.getElementById("userLocation");
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
                        .then(res => res.json())
                        .then(data => {
                            locationElement.textContent = data.address.city || data.address.town || data.address.village || "Unknown";
                        })
                        .catch(() => locationElement.textContent = "Location unavailable");
                },
                () => {
                    locationElement.textContent = "Location blocked";
                }
            );
        } else {
            locationElement.textContent = "Not supported";
        }
    }
    getLocation();

    // Responsive Carousel Height
    const carouselContainer = document.querySelector('.carousel-container');
    const aspectRatio = 16 / 9;
    const setCarouselHeight = () => {
        const containerWidth = carouselContainer.offsetWidth;
        carouselContainer.style.height = `${containerWidth / aspectRatio}px`;
    };
    setCarouselHeight();
    window.addEventListener('resize', setCarouselHeight);
    const myCarousel = new bootstrap.Carousel(carouselContainer, {
        interval: 3000,
        wrap: true
    });

    // Today's Best Deals
    const dealsContainer = document.getElementById('deals-container');
    allProducts.deals.forEach(deal => {
        const colDiv = document.createElement('div');
        colDiv.className = 'col-12 col-md-6 col-lg-3 mb-4';
        colDiv.innerHTML = `
            <div class="deal-card" style="background-image: url('${deal.image}')">
                <h3 class="h5 text-center">${deal.title}</h3>
                <p class="starting-price">Starting Price: ${formatPrice(deal.startingPrice)}</p>
                <p class="discount-price">Discounted Price: ${formatPrice(deal.discountPrice)}</p>
                <div class="quantity-control">
                    <button class="btn btn-outline-light btn-sm minus-btn">-</button>
                    <input type="number" class="form-control quantity-input" value="1" min="1" readonly>
                    <button class="btn btn-outline-light btn-sm plus-btn">+</button>
                </div>
                <button class="btn btn-warning w-100 mt-2 add-to-cart-btn" data-product-id="${deal.id}">Add to Cart</button>
            </div>
        `;
        dealsContainer.appendChild(colDiv);

        const card = colDiv.querySelector('.deal-card');
        const minusBtn = card.querySelector('.minus-btn');
        const plusBtn = card.querySelector('.plus-btn');
        const quantityInput = card.querySelector('.quantity-input');
        const addToCartBtn = card.querySelector('.add-to-cart-btn');

        minusBtn.addEventListener('click', () => {
            let quantity = parseInt(quantityInput.value);
            if (quantity > 1) {
                quantityInput.value = quantity - 1;
            }
        });
        plusBtn.addEventListener('click', () => {
            let quantity = parseInt(quantityInput.value);
            quantityInput.value = quantity + 1;
        });

        addToCartBtn.addEventListener('click', () => {
            const product = allProducts.deals.find(p => p.id === deal.id);
            const quantity = parseInt(quantityInput.value);
            addToCart({ id: product.id, name: product.title, price: product.discountPrice, image: product.image }, quantity);
            
            const myModal = new bootstrap.Modal(document.getElementById('orderConfirmationModal'));
            document.getElementById('modal-item-title').textContent = product.title;
            document.getElementById('modal-quantity').textContent = quantity;
            document.getElementById('modal-total-price').textContent = formatPrice(product.discountPrice * quantity);
            document.getElementById('order-number').textContent = generateOrderNumber();
            myModal.show();
        });
    });

    // Popular Products Grid
    const productGrid = document.getElementById('product-grid');

    function renderProducts() {
        productGrid.innerHTML = '';
        allProducts.popular.forEach(product => {
            const col = document.createElement('div');
            col.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-3', 'product-card');
            col.setAttribute('data-category', product.category);
            col.innerHTML = `
                <div class="card h-100" data-product-id="${product.id}">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text text-muted">${product.description}</p>
                        <h6 class="card-price">${formatPrice(product.price)}</h6>
                        <div class="d-flex gap-2 mt-3">
                            <button class="btn btn-primary flex-fill view-details-btn" data-product-id="${product.id}">View Details</button>
                            <button class="btn btn-outline-secondary flex-fill add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
                        </div>
                    </div>
                </div>
            `;
            productGrid.appendChild(col);
        });
    }

    renderProducts();

    // Event listeners for product cards
    document.querySelectorAll('.product-card .card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Check if the click was on the "Add to Cart" or "View Details" button
            if (e.target.closest('.add-to-cart-btn') || e.target.closest('.view-details-btn')) {
                return; // Let the specific button's event handler take over
            }
            const productId = parseInt(card.dataset.productId);
            const product = allProducts.popular.find(p => p.id === productId);

            // Populate the modal
            document.getElementById('modal-product-image').src = product.image;
            document.getElementById('modal-product-name').textContent = product.name;
            document.getElementById('modal-product-description').textContent = product.description;
            document.getElementById('modal-product-price').textContent = formatPrice(product.price);
            document.getElementById('modal-quantity-input').value = 1; // Reset quantity

            // Set the product data on the add to cart button
            const modalAddToCartBtn = document.getElementById('modal-add-to-cart-btn');
            modalAddToCartBtn.dataset.productId = product.id;

            const myModal = new bootstrap.Modal(document.getElementById('productDetailModal'));
            myModal.show();
        });
    });

    // Add to cart button listeners
    document.querySelectorAll('.product-section').forEach(section => {
        section.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart-btn')) {
                const productId = parseInt(e.target.dataset.productId);
                const product = allProducts.popular.find(p => p.id === productId);
                if (product) {
                    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image }, 1);
                }
            }
        });
    });


    document.querySelectorAll('.view-details-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent card click event from firing
            const productId = parseInt(e.target.dataset.productId);
            const product = allProducts.popular.find(p => p.id === productId);

            // Populate the modal
            document.getElementById('modal-product-image').src = product.image;
            document.getElementById('modal-product-name').textContent = product.name;
            document.getElementById('modal-product-description').textContent = product.description;
            document.getElementById('modal-product-price').textContent = formatPrice(product.price);
            document.getElementById('modal-quantity-input').value = 1; // Reset quantity

            // Set the product data on the add to cart button
            const modalAddToCartBtn = document.getElementById('modal-add-to-cart-btn');
            modalAddToCartBtn.dataset.productId = product.id;

            const myModal = new bootstrap.Modal(document.getElementById('productDetailModal'));
            myModal.show();
        });
    });

    // Handle add to cart from the detail modal
    document.getElementById('modal-add-to-cart-btn').addEventListener('click', (e) => {
        const productId = parseInt(e.currentTarget.dataset.productId);
        const product = allProducts.popular.find(p => p.id === productId);
        const quantity = parseInt(document.getElementById('modal-quantity-input').value);
        addToCart({ id: product.id, name: product.name, price: product.price, image: product.image }, quantity);

        const myModal = bootstrap.Modal.getInstance(document.getElementById('productDetailModal'));
        if (myModal) {
            myModal.hide();
        }
    });

    // Quantity controls for the product detail modal
    document.getElementById('modal-minus-btn').addEventListener('click', () => {
        const quantityInput = document.getElementById('modal-quantity-input');
        let quantity = parseInt(quantityInput.value);
        if (quantity > 1) {
            quantityInput.value = quantity - 1;
        }
    });

    document.getElementById('modal-plus-btn').addEventListener('click', () => {
        const quantityInput = document.getElementById('modal-quantity-input');
        let quantity = parseInt(quantityInput.value);
        quantityInput.value = quantity + 1;
    });

    // Category Link Logic
    document.querySelectorAll('.category-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.dataset.category;
            
            // Smoothly scrolls to the popular products section.
            const productSection = document.getElementById('popular-products');
            productSection.scrollIntoView({ behavior: 'smooth' });

            // After scrolling, highlights the products that match the selected category.
            // A small delay is used to ensure the scroll has finished.
            setTimeout(() => {
                // First, remove highlights from all products.
                document.querySelectorAll('.product-card').forEach(card => {
                    card.classList.remove('highlighted');
                });
                
                // Then, add the highlight class to the cards with the matching category.
                const productsToHighlight = document.querySelectorAll(`.product-card[data-category="${category}"]`);
                productsToHighlight.forEach(product => {
                    product.classList.add('highlighted');
                });
            }, 500);
        });
    });

    // Checkout button
    document.getElementById('checkout-btn').addEventListener('click', () => {
        alert('Proceeding to checkout...');
        // This is where you would typically perform the checkout process.
    });
});

// contract from 
 
// Add this inside the document.addEventListener('DOMContentLoaded', function() { ... }); block

// Set the current year in the footer
const yearSpan = document.getElementById('current-year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}
