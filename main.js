// ---  (Login/Account) ---
function openLogin() {
    const loginModal = document.getElementById("loginModal");
    if (loginModal) {
        loginModal.classList.replace("hidden", "flex");
    }
}

function closeLogin() {
    const loginModal = document.getElementById("loginModal");
    if (loginModal) {
        loginModal.classList.replace("flex", "hidden");
    }
}

// --- Cart Logic ---
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const container = document.getElementById("cartItems");

function updateCount() {
    const cartCountElement = document.getElementById("cartCount");
    if (cartCountElement) {
        cartCountElement.innerText = cart.reduce((acc, item) => acc + item.qty, 0);
    }
}

function addToCart(name, price, img) {
    let existing = cart.find(item => item.name === name);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ name, price, img, qty: 1 });
    }
    saveAndRefresh();
}

function changeQty(index, delta) {
    if (cart[index].qty + delta > 0) {
        cart[index].qty += delta;
    } else {
        cart.splice(index, 1);
    }
    saveAndRefresh();
}

function removeItem(index) {
    cart.splice(index, 1);
    saveAndRefresh();
}

function saveAndRefresh() {
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
    updateCount();
}

function displayCart() {
    if (!container) return; 

    container.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = "<p class='text-gray-400 text-center py-10'>Your cart is empty.</p>";
        document.getElementById("total").innerText = "0.00";
        return;
    }

    cart.forEach((item, i) => {
        container.innerHTML += `
        <div class="flex gap-4 items-center border-b pb-4">
            <img src="${item.img}" class="w-16 h-16 rounded-lg object-cover shadow-sm">
            <div class="flex-1">
                <div class="flex justify-between items-start">
                    <p class="font-bold text-[#543310] text-sm">${item.name}</p>
                    <button onclick="removeItem(${i})" class="text-red-300 hover:text-red-500 transition">
                        <i class="fas fa-trash-can text-xs"></i>
                    </button>
                </div>
                <p class="text-gray-400 text-xs mb-2">$${item.price.toFixed(2)}</p>
                <div class="flex items-center gap-3">
                    <div class="flex items-center bg-gray-100 rounded-lg px-2 py-1">
                        <button onclick="changeQty(${i}, -1)" class="text-gray-500 hover:text-black">-</button>
                        <span class="mx-3 text-xs font-bold">${item.qty}</span>
                        <button onclick="changeQty(${i}, 1)" class="text-gray-500 hover:text-black">+</button>
                    </div>
                    <span class="text-xs font-bold text-[#543310] ml-auto">$${(item.price * item.qty).toFixed(2)}</span>
                </div>
            </div>
        </div>`;
        total += item.price * item.qty;
    });

    const totalElement = document.getElementById("total");
    if (totalElement) {
        totalElement.innerText = total.toFixed(2);
    }
}

function toggleCart() {
    const cartSidebar = document.getElementById("cartSidebar");
    if (cartSidebar) {
        cartSidebar.classList.toggle("translate-x-full");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    displayCart();
    updateCount();
});

    function toggleMobileMenu() {
        const menu = document.getElementById('mobileMenu');
        const icon = document.getElementById('menuIcon');
        
        menu.classList.toggle('hidden');
        
        if (menu.classList.contains('hidden')) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    }

    document.querySelectorAll('#mobileMenu a').forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('mobileMenu').classList.add('hidden');
            document.getElementById('menuIcon').classList.replace('fa-times', 'fa-bars');
        });
    });
