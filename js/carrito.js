(() => {
    const CART_KEY = "modern_cart_items";
    const cartItemsContainer = document.getElementById("cart-items");
    const emptyState = document.getElementById("empty-state");
    const subtotalElement = document.getElementById("subtotal");
    const taxElement = document.getElementById("tax");
    const discountElement = document.getElementById("discount");
    const totalElement = document.getElementById("total");
    const checkoutButton = document.getElementById("checkout-btn");
    const resetButton = document.getElementById("reset-sample");
    const cartTemplate = document.getElementById("cart-item-template");

    const sampleProducts = [
        { id: "prod-1", name: "Auriculares inalámbricos Pro Pulse", unitPrice: 299.99, quantity: 1 },
        { id: "prod-2", name: "Smartwatch Indigo Series", unitPrice: 189.5, quantity: 2 },
        { id: "prod-3", name: "Set de viaje minimalista", unitPrice: 79.9, quantity: 3 }
    ];

    let cartItems = loadCart();

    function loadCart() {
        const data = localStorage.getItem(CART_KEY);
        if (!data) {
            persistCart(sampleProducts);
            return sampleProducts.slice();
        }
        try {
            const parsed = JSON.parse(data);
            if (!Array.isArray(parsed)) throw new Error();
            return parsed.map(i => ({ id: String(i.id), name: String(i.name), unitPrice: Number(i.unitPrice), quantity: Math.max(1, Number(i.quantity) || 1) }));
        } catch {
            persistCart(sampleProducts);
            return sampleProducts.slice();
        }
    }

    function persistCart(data) { localStorage.setItem(CART_KEY, JSON.stringify(data)); }

    function formatCurrency(value) {
        return new Intl.NumberFormat("es-CR", { style: "currency", currency: "CRC", maximumFractionDigits: 2 }).format(value);
    }

    function calculateTotal() {
        const subtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
        const tax = subtotal * 0.12;
        const discount = subtotal >= 500 ? subtotal * 0.08 : 0;
        const total = subtotal + tax - discount;
        subtotalElement.textContent = formatCurrency(subtotal);
        taxElement.textContent = formatCurrency(tax);
        discountElement.textContent = formatCurrency(discount);
        totalElement.textContent = formatCurrency(total);
    }

    function updateEmptyStateVisibility() { emptyState.hidden = cartItems.length !== 0; }

    function createCartItemElement(item) {
        const clone = cartTemplate.content.cloneNode(true);
        const article = clone.querySelector(".cart-item");
        const nameEl = clone.querySelector(".cart-item-name");
        const priceEl = clone.querySelector(".cart-item-price");
        const quantityValue = clone.querySelector(".quantity-value");
        const incrementBtn = clone.querySelector(".increment");
        const decrementBtn = clone.querySelector(".decrement");
        const deleteBtn = clone.querySelector(".delete-btn");

        nameEl.textContent = item.name;
        priceEl.textContent = formatCurrency(item.unitPrice);
        quantityValue.textContent = item.quantity;
        decrementBtn.disabled = item.quantity <= 1;

        incrementBtn.addEventListener("click", () => {
            item.quantity += 1;
            quantityValue.textContent = item.quantity;
            decrementBtn.disabled = item.quantity <= 1;
            persistCart(cartItems);
            calculateTotal();
        });

        decrementBtn.addEventListener("click", () => {
            if (item.quantity <= 1) return;
            item.quantity -= 1;
            quantityValue.textContent = item.quantity;
            decrementBtn.disabled = item.quantity <= 1;
            persistCart(cartItems);
            calculateTotal();
        });

        deleteBtn.addEventListener("click", () => {
            cartItems = cartItems.filter(i => i.id !== item.id);
            persistCart(cartItems);
            renderCart();
        });

        return article;
    }

    function renderCart() {
        cartItemsContainer.innerHTML = "";
        if (cartItems.length === 0) {
            updateEmptyStateVisibility();
            calculateTotal();
            return;
        }
        updateEmptyStateVisibility();
        cartItems.forEach(item => cartItemsContainer.appendChild(createCartItemElement(item)));
        calculateTotal();
    }

    checkoutButton.addEventListener("click", () => {
        if (cartItems.length === 0) alert("Agrega productos antes de procesar el pago.");
        else alert(`Total a pagar: ${totalElement.textContent}`);
    });

    resetButton.addEventListener("click", () => {
        cartItems = sampleProducts.map(p => ({ ...p }));
        persistCart(cartItems);
        renderCart();
    });

    renderCart();
})();
