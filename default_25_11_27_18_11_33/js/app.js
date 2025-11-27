const productGrid = document.getElementById("productGrid");
const featuredSection = document.getElementById("featuredProducts");
const cartCount = document.getElementById("cart-count");
const cartModal = document.getElementById("cartModal");
const favoriteModal = document.getElementById("favoriteModal");
const favoriteItems = document.getElementById("favoriteItems");
const cartItemsContainer = document.getElementById("cartItems");
const cartSummary = document.getElementById("cartSummary");
const checkoutForm = document.getElementById("checkoutForm");
const searchInput = document.getElementById("searchInput");
const sizeFilter = document.getElementById("sizeFilter");
const colorFilter = document.getElementById("colorFilter");
const priceFilter = document.getElementById("priceFilter");
const sortSelect = document.getElementById("sortSelect");
const clearFilters = document.getElementById("clearFilters");
const cartToggle = document.getElementById("cartToggle");
const closeCart = document.getElementById("closeCart");
const showFavoritesBtn = document.getElementById("showFavorites");
const closeFavorites = document.getElementById("closeFavorites");
const favoriteToggleButtons = [];
const detailModal = document.getElementById("productDetailModal");
const detailTitle = document.getElementById("detailTitle");
const detailImage = document.getElementById("detailImage");
const detailDescription = document.getElementById("detailDescription");
const detailAttributes = document.getElementById("detailAttributes");
const detailPrice = document.getElementById("detailPrice");
const detailBadge = document.getElementById("detailBadge");
const detailSize = document.getElementById("detailSize");
const detailAddToCart = document.getElementById("detailAddToCart");
const closeDetail = document.getElementById("closeDetail");
const relatedProductsContainer = document.getElementById("relatedProducts");
const toast = document.getElementById("toast");
const contactForm = document.getElementById("contactForm");
let products = [];
let cart = [];
let favorites = new Set();
const state = {
  filters: {
    size: "all",
    color: "all",
    price: "all"
  },
  sort: "featured",
  search: ""
};

const cartKey = "urban-store-cart";
const favoritesKey = "urban-store-favorites";

const initStorage = () => {
  const savedCart = localStorage.getItem(cartKey);
  const savedFavorites = localStorage.getItem(favoritesKey);
  if (savedCart) {
    try {
      cart = JSON.parse(savedCart);
    } catch (error) {
      cart = [];
      console.error("Error parsing cart data:", error);
    }
  }
  if (savedFavorites) {
    try {
      favorites = new Set(JSON.parse(savedFavorites));
    } catch (error) {
      favorites = new Set();
      console.error("Error parsing favorites data:", error);
    }
  }
};

const persistCart = () => {
  localStorage.setItem(cartKey, JSON.stringify(cart));
};

const persistFavorites = () => {
  localStorage.setItem(favoritesKey, JSON.stringify([...favorites]));
};

const fetchProducts = async () => {
  try {
    const response = await fetch("data/products.json");
    if (!response.ok) {
      throw new Error("No se pudo cargar la lista de productos.");
    }
    products = await response.json();
    renderFilters();
    applyFiltersAndRender();
    renderFeatured();
  } catch (error) {
    console.error(error);
    showToast("No pudimos cargar los productos. Recarga la página más tarde.");
  }
};

const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
};

const renderCard = (product) => {
  const template = document.getElementById("productCardTemplate");
  const clone = template.content.cloneNode(true);
  const card = clone.querySelector(".product-card");
  const img = clone.querySelector(".product-card__image");
  const title = clone.querySelector(".product-card__title");
  const desc = clone.querySelector(".product-card__description");
  const price = clone.querySelector(".product-card__price");
  const badge = clone.querySelector(".badge");
  const favoriteBtn = clone.querySelector(".favorite-btn");
  const addToCartBtn = clone.querySelector(".add-to-cart");
  const viewDetailsBtn = clone.querySelector(".view-details");

  img.src = product.imageUrl;
  img.alt = `${product.name} - Imagen del producto`;
  title.textContent = product.name;
  desc.textContent = product.description;
  price.textContent = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP"
  }).format(product.price);
  badge.textContent = product.badge || "Urbano";
  badge.style.opacity = product.badge ? "1" : "0.8";

  favoriteBtn.setAttribute("aria-pressed", favorites.has(product.id));
  favoriteBtn.addEventListener("click", () => {
    toggleFavorite(product.id, favoriteBtn);
  });

  addToCartBtn.addEventListener("click", () => handleAddToCart(product.id));
  viewDetailsBtn.addEventListener("click", () => openDetailModal(product));

  return clone;
};

const renderCatalog = (filteredProducts) => {
  productGrid.innerHTML = "";
  if (!filteredProducts.length) {
    productGrid.innerHTML = `<p class="empty-state">No encontramos productos para el criterio seleccionado.</p>`;
    return;
  }
  filteredProducts.forEach((product) => {
    const cardNode = renderCard(product);
    productGrid.appendChild(cardNode);
  });
};

const renderFeatured = () => {
  const featured = products.filter((product) => product.featured);
  featuredSection.innerHTML = "";
  featured.forEach((product) => {
    const cardNode = renderCard(product);
    featuredSection.appendChild(cardNode);
  });
};

const applyFiltersAndRender = () => {
  let filtered = [...products];
  const { size, color, price } = state.filters;
  if (size !== "all") {
    filtered = filtered.filter((product) => product.sizes.includes(size));
  }
  if (color !== "all") {
    filtered = filtered.filter((product) => product.colors.includes(color));
  }
  if (price !== "all") {
    const [min, max] = price.split("-").map(Number);
    filtered = filtered.filter((product) => product.price >= min && product.price <= max);
  }
  if (state.search.trim()) {
    const query = state.search.toLowerCase();
    filtered = filtered.filter((product) => {
      return (
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    });
  }

  if (state.sort === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  }
  if (state.sort === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  }
  if (state.sort === "name-asc") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }
  if (state.sort === "name-desc") {
    filtered.sort((a, b) => b.name.localeCompare(a.name));
  }
  if (state.sort === "featured") {
    filtered.sort((a, b) => {
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }

  renderCatalog(filtered);
};

const renderFilters = () => {
  const sizes = new Set();
  const colors = new Set();
  products.forEach((product) => {
    product.sizes.forEach((size) => sizes.add(size));
    product.colors.forEach((color) => colors.add(color));
  });
  sizeFilter.innerHTML = `<option value="all">Mostrar todas</option>`;
  colorFilter.innerHTML = `<option value="all">Mostrar todos</option>`;
  [...sizes]
    .sort()
    .forEach((size) => {
      const option = document.createElement("option");
      option.value = size;
      option.textContent = size;
      sizeFilter.appendChild(option);
    });
  [...colors]
    .sort()
    .forEach((color) => {
      const option = document.createElement("option");
      option.value = color;
      option.textContent = color;
      colorFilter.appendChild(option);
    });
};

const updateCartCount = () => {
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalQuantity;
};

const getProductById = (id) => products.find((product) => product.id === id);

const handleAddToCart = (productId, selectedSize = null) => {
  const product = getProductById(productId);
  if (!product) {
    showToast("Producto no encontrado.");
    return;
  }
  const size = selectedSize || product.sizes[0];
  const existing = cart.find((item) => item.id === productId && item.size === size);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: productId,
      name: product.name,
      price: product.price,
      size,
      quantity: 1,
      imageUrl: product.imageUrl
    });
  }
  persistCart();
  updateCartCount();
  showToast("Producto agregado al carrito");
  renderCart();
};

const renderCart = () => {
  cartItemsContainer.innerHTML = "";
  if (!cart.length) {
    cartItemsContainer.innerHTML = `<p class="empty-state">Tu carrito está vacío.</p>`;
    cartSummary.innerHTML = "";
    return;
  }
  cart.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.className = "cart-item";
    const info = document.createElement("div");
    info.className = "cart-item__info";
    const title = document.createElement("h4");
    title.textContent = `${item.name} (${item.size})`;
    const quantity = document.createElement("p");
    quantity.textContent = `Cantidad: ${item.quantity}`;
    info.append(title, quantity);

    const controls = document.createElement("div");
    controls.className = "cart-item__controls";
    controls.style.display = "flex";
    controls.style.gap = "0.5rem";
    const increase = document.createElement("button");
    increase.textContent = "+";
    increase.className = "btn ghost";
    increase.type = "button";
    increase.addEventListener("click", () => adjustCartItem(item.id, item.size, 1));
    const decrease = document.createElement("button");
    decrease.textContent = "-";
    decrease.className = "btn ghost";
    decrease.type = "button";
    decrease.addEventListener("click", () => adjustCartItem(item.id, item.size, -1));
    const remove = document.createElement("button");
    remove.textContent = "Eliminar";
    remove.className = "btn secondary";
    remove.type = "button";
    remove.addEventListener("click", () => removeCartItem(item.id, item.size));
    controls.append(increase, decrease, remove);

    const price = document.createElement("p");
    price.textContent = new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP"
    }).format(item.price * item.quantity);
    price.style.fontWeight = "600";

    itemElement.append(info, controls, price);
    cartItemsContainer.appendChild(itemElement);
  });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 120000 ? 0 : 12000;
  const tax = Math.round(subtotal * 0.19);
  const total = subtotal + shipping + tax;

  cartSummary.innerHTML = `
        <div>
            <p>Subtotal: <strong>${new Intl.NumberFormat("es-CO", {
              style: "currency",
              currency: "COP"
            }).format(subtotal)}</strong></p>
            <p>Envío: <strong>${new Intl.NumberFormat("es-CO", {
              style: "currency",
              currency: "COP"
            }).format(shipping)}</strong></p>
            <p>IVA 19%: <strong>${new Intl.NumberFormat("es-CO", {
              style: "currency",
              currency: "COP"
            }).format(tax)}</strong></p>
        </div>
        <p class="cart-summary__total">Total: <strong>${new Intl.NumberFormat("es-CO", {
          style: "currency",
          currency: "COP"
        }).format(total)}</strong></p>
    `;
};

const adjustCartItem = (productId, size, delta) => {
  const target = cart.find((item) => item.id === productId && item.size === size);
  if (!target) return;
  target.quantity += delta;
  if (target.quantity <= 0) {
    cart = cart.filter((item) => !(item.id === productId && item.size === size));
  }
  persistCart();
  updateCartCount();
  renderCart();
};

const removeCartItem = (productId, size) => {
  cart = cart.filter((item) => !(item.id === productId && item.size === size));
  persistCart();
  updateCartCount();
  renderCart();
};

const toggleFavorite = (productId, button) => {
  if (favorites.has(productId)) {
    favorites.delete(productId);
    button.setAttribute("aria-pressed", "false");
  } else {
    favorites.add(productId);
    button.setAttribute("aria-pressed", "true");
  }
  persistFavorites();
  renderFavorites();
};

const renderFavorites = () => {
  favoriteItems.innerHTML = "";
  if (!favorites.size) {
    favoriteItems.innerHTML = "<p class='empty-state'>Sin favoritos por ahora.</p>";
    return;
  }
  favorites.forEach((id) => {
    const product = getProductById(id);
    if (!product) return;
    const item = document.createElement("div");
    item.className = "cart-item";
    const info = document.createElement("div");
    const title = document.createElement("h4");
    title.textContent = product.name;
    const price = document.createElement("p");
    price.textContent = new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP"
    }).format(product.price);
    info.append(title, price);
    const actions = document.createElement("div");
    actions.style.display = "flex";
    actions.style.gap = "0.4rem";
    const addBtn = document.createElement("button");
    addBtn.textContent = "Agregar al carrito";
    addBtn.className = "btn primary";
    addBtn.type = "button";
    addBtn.addEventListener("click", () => {
      handleAddToCart(product.id);
      favoriteModal.classList.remove("active");
      favoriteModal.setAttribute("aria-hidden", "true");
    });
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Eliminar";
    removeBtn.className = "btn secondary";
    removeBtn.type = "button";
    removeBtn.addEventListener("click", () => {
      favorites.delete(product.id);
      persistFavorites();
      renderFavorites();
    });
    actions.append(addBtn, removeBtn);
    item.append(info, actions);
    favoriteItems.appendChild(item);
  });
};

const openCart = () => {
  cartModal.classList.add("active");
  cartModal.setAttribute("aria-hidden", "false");
  renderCart();
};

const closeCartModal = () => {
  cartModal.classList.remove("active");
  cartModal.setAttribute("aria-hidden", "true");
};

const openFavorites = () => {
  favoriteModal.classList.add("active");
  favoriteModal.setAttribute("aria-hidden", "false");
  renderFavorites();
};

const closeFavoritesModal = () => {
  favoriteModal.classList.remove("active");
  favoriteModal.setAttribute("aria-hidden", "true");
};

const openDetailModal = (product) => {
  detailTitle.textContent = product.name;
  detailImage.src = product.imageUrl;
  detailImage.alt = product.name;
  detailDescription.textContent = product.description;
  detailBadge.textContent = product.badge || "";
  detailPrice.textContent = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP"
  }).format(product.price);
  detailAttributes.innerHTML = "";
  const attributes = [
    `Inventario: ${product.inventory}`,
    `Colores: ${product.colors.join(", ")}`,
    `Tallas: ${product.sizes.join(", ")}`,
    `Categoría: ${product.category}`
  ];
  attributes.forEach((attr) => {
    const li = document.createElement("li");
    li.textContent = attr;
    detailAttributes.appendChild(li);
  });
  detailSize.innerHTML = "";
  product.sizes.forEach((size) => {
    const option = document.createElement("option");
    option.value = size;
    option.textContent = size;
    detailSize.appendChild(option);
  });
  detailAddToCart.onclick = () => handleAddToCart(product.id, detailSize.value);
  renderRelatedProducts(product);
  detailModal.classList.add("active");
  detailModal.setAttribute("aria-hidden", "false");
};

const closeDetail = () => {
  detailModal.classList.remove("active");
  detailModal.setAttribute("aria-hidden", "true");
};

const renderRelatedProducts = (product) => {
  relatedProductsContainer.innerHTML = "";
  const related = product.relatedIds
    .map((id) => getProductById(id))
    .filter(Boolean);
  related.forEach((item) => {
    const card = document.createElement("div");
    card.className = "related-card";
    card.addEventListener("click", () => openDetailModal(item));
    card.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}" />
            <p>${item.name}</p>
            <small>${new Intl.NumberFormat("es-CO", {
              style: "currency",
              currency: "COP"
            }).format(item.price)}</small>
        `;
    relatedProductsContainer.appendChild(card);
  });
};

const handleCheckoutSubmission = (event) => {
  event.preventDefault();
  if (!cart.length) {
    showToast("Agrega productos al carrito antes de continuar.");
    return;
  }
  const name = document.getElementById("clientName").value.trim();
  const email = document.getElementById("clientEmail").value.trim();
  const address = document.getElementById("clientAddress").value.trim();
  if (!name || !email || !address) {
    showToast("Por favor completa todos los campos del checkout.");
    return;
  }
  simulatePurchase({ name, email });
};

const simulatePurchase = ({ name, email }) => {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 120000 ? 0 : 12000;
  const tax = Math.round(subtotal * 0.19);
  const total = subtotal + shipping + tax;
  cart = [];
  persistCart();
  updateCartCount();
  renderCart();
  closeCartModal();
  showToast(`¡Gracias ${name}! Tu compra simulada por ${new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP"
  }).format(total)} fue procesada. Te contactaremos a ${email}.`);
  checkoutForm.reset();
};

const handleContactSubmit = (event) => {
  event.preventDefault();
  const name = document.getElementById("contactName").value.trim();
  const message = document.getElementById("contactMessage").value.trim();
  const email = document.getElementById("contactEmail").value.trim();
  if (!name || !message || !email) {
    showToast("Completa todos los campos del formulario de contacto.");
    return;
  }
  showToast("Gracias por escribirnos. Te responderemos pronto.");
  contactForm.reset();
};

const clearAllFilters = () => {
  state.filters.size = "all";
  state.filters.color = "all";
  state.filters.price = "all";
  state.sort = "featured";
  searchInput.value = "";
  sizeFilter.value = "all";
  colorFilter.value = "all";
  priceFilter.value = "all";
  sortSelect.value = "featured";
  state.search = "";
  applyFiltersAndRender();
};

const initEventListeners = () => {
  searchInput.addEventListener("input", (event) => {
    state.search = event.target.value;
    applyFiltersAndRender();
  });

  sizeFilter.addEventListener("change", (event) => {
    state.filters.size = event.target.value;
    applyFiltersAndRender();
  });

  colorFilter.addEventListener("change", (event) => {
    state.filters.color = event.target.value;
    applyFiltersAndRender();
  });

  priceFilter.addEventListener("change", (event) => {
    state.filters.price = event.target.value;
    applyFiltersAndRender();
  });

  sortSelect.addEventListener("change", (event) => {
    state.sort = event.target.value;
    applyFiltersAndRender();
  });

  clearFilters.addEventListener("click", clearAllFilters);

  cartToggle.addEventListener("click", openCart);
  closeCart.addEventListener("click", closeCartModal);
  showFavoritesBtn.addEventListener("click", openFavorites);
  closeFavorites.addEventListener("click", closeFavoritesModal);

  checkoutForm.addEventListener("submit", handleCheckoutSubmission);
  contactForm.addEventListener("submit", handleContactSubmit);

  detailModal.querySelector("#closeDetail").addEventListener("click", closeDetail);
  closeDetail.addEventListener("click", closeDetail);
  detailModal.addEventListener("click", (event) => {
    if (event.target === detailModal) closeDetail();
  });

  cartModal.addEventListener("click", (event) => {
    if (event.target === cartModal) closeCartModal();
  });

  favoriteModal.addEventListener("click", (event) => {
    if (event.target === favoriteModal) closeFavoritesModal();
  });

  document.querySelectorAll(".main-nav a").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = link.getAttribute("href");
      if (targetId && targetId.startsWith("#")) {
        const section = document.querySelector(targetId);
        section?.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
};

const initialize = () => {
  initStorage();
  initEventListeners();
  fetchProducts();
  updateCartCount();
  renderFavorites();
};

