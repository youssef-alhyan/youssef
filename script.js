// ===============================
// مكتبة أيوب
// JavaScript
// ===============================

let cart = [];


// ===============================
// إضافة منتج للسلة
// ===============================

function addToCart(name, price) {

    const existingProduct = cart.find(item => item.name === name);

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    updateCart();

    openCart();
}


// ===============================
// تحديث السلة
// ===============================

function updateCart() {

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    let totalItems = 0;
    let totalPrice = 0;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                السلة فارغة 🛒
            </p>
        `;

    } else {

        cartItems.innerHTML = "";

        cart.forEach((item, index) => {

            totalItems += item.quantity;

            totalPrice += item.price * item.quantity;


            const itemElement = document.createElement("div");

            itemElement.className = "cart-item";

            itemElement.innerHTML = `

                <div>

                    <h4>${item.name}</h4>

                    <p>
                        ${item.price.toFixed(2)} DH × ${item.quantity}
                    </p>

                </div>

                <button
                    class="remove-item"
                    onclick="removeFromCart(${index})"
                >
                    ✕
                </button>

            `;

            cartItems.appendChild(itemElement);

        });

    }


    cartCount.textContent = totalItems;

    cartTotal.textContent = totalPrice.toFixed(2);
}


// ===============================
// حذف منتج
// ===============================

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();
}


// ===============================
// فتح السلة
// ===============================

function openCart() {

    document.getElementById("cart").classList.add("active");

    document
        .getElementById("cartOverlay")
        .classList.add("active");
}


// ===============================
// إغلاق السلة
// ===============================

function closeCart() {

    document
        .getElementById("cart")
        .classList.remove("active");

    document
        .getElementById("cartOverlay")
        .classList.remove("active");
}


// ===============================
// البحث عن المنتجات
// ===============================

function searchProducts() {

    const search =
        document
        .getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();


    const products =
        document.querySelectorAll(".product");


    products.forEach(product => {

        const name =
            product
            .getAttribute("data-name")
            .toLowerCase();


        if (name.includes(search)) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });

}


// ===============================
// فلترة المنتجات
// ===============================

function filterProducts(category) {

    const products =
        document.querySelectorAll(".product");


    products.forEach(product => {

        const productCategory =
            product.getAttribute("data-category");


        if (
            category === "all" ||
            productCategory === category
        ) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });


    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ===============================
// تأكيد الطلب
// ===============================

function checkout() {

    if (cart.length === 0) {

        alert("السلة فارغة! أضف بعض المنتجات أولاً.");

        return;
    }


    let message = "مرحبا، أريد طلب:%0A%0A";


    cart.forEach(item => {

        message +=
            `• ${item.name} × ${item.quantity} = ${(item.price * item.quantity).toFixed(2)} DH%0A`;

    });


    const total =
        cart.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        );


    message +=
        `%0Aالمجموع: ${total.toFixed(2)} DH`;


    /*
       بدّل الرقم الموجود هنا
       برقم WhatsApp ديال المكتبة
    */

    const phone = "2127723794";


    const whatsappURL =
        `https://wa.me/${phone}?text=${message}`;


    window.open(
        whatsappURL,
        "_blank"
    );

}


// ===============================
// Mobile Menu
// ===============================

function toggleMenu() {

    const menu =
        document.querySelector(".menu");


    if (menu.style.display === "flex") {

        menu.style.display = "none";

    } else {

        menu.style.display = "flex";

        menu.style.position = "absolute";
        menu.style.top = "68px";
        menu.style.right = "4%";
        menu.style.left = "4%";
        menu.style.background = "white";
        menu.style.padding = "20px";
        menu.style.borderRadius = "15px";
        menu.style.flexDirection = "column";
        menu.style.boxShadow = "0 15px 30px rgba(0,0,0,.1)";

    }

}