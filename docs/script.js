
let cart = [];

function addToCart(name, price) {

    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();

    alert(name + " added to cart!");
}

function updateCart() {

    let cartItems = document.getElementById("cartItems");
    let cartCount = document.getElementById("cartCount");
    let totalElement = document.getElementById("total");

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    cart.forEach((item, index) => {

        total += item.price * item.quantity;
        count += item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong>
                    <p>₹${item.price} x ${item.quantity}</p>
                </div>

                <div>
                    <button onclick="changeQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity(${index}, 1)">+</button>
                    <button onclick="removeItem(${index})">❌</button>
                </div>
            </div>
        `;
    });

    cartCount.innerText = count;
    totalElement.innerText = total;
}

function changeQuantity(index, amount) {

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
}

function removeItem(index) {

    cart.splice(index, 1);

    updateCart();
}

function showCart() {

    document.getElementById("cartSection").style.display = "flex";
}

function closeCart() {

    document.getElementById("cartSection").style.display = "none";
}

function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    let customerName = prompt("Enter your name:");

    if (customerName === null || customerName.trim() === "") {
        alert("Please enter your name!");
        return;
    }

    alert(
        "Order Placed Successfully!\n" +
        "Customer: " + customerName +
        "\nTotal Amount: ₹" + total +
        "\nThank you for ordering!"
    );

    cart = [];

    updateCart();
    closeCart();
}

// Food category filter

function filterFood(category) {

    let cards = document.querySelectorAll(".food-card");

    cards.forEach(card => {

        if (category === "All" ||
            card.dataset.category === category) {

            card.style.display = "block";

        } else {

            card.style.display = "none";
        }
    });
}

// Search food

document.getElementById("search").addEventListener("input", function() {

    let searchValue = this.value.toLowerCase();

    let cards = document.querySelectorAll(".food-card");

    cards.forEach(card => {

        let foodName = card.querySelector("h3").innerText.toLowerCase();

        card.style.display =
            foodName.includes(searchValue) ? "block" : "none";
    });
});
