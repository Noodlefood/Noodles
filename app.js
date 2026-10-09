/**
 * Noodles® - Fast Spaghetti & More
 * Aplicación Web Comercial e Interactiva
 */

const MENU_DATA = [
  {
    id: "bolognesa-star",
    name: "Bowl Bolognesa Tradicional",
    category: "especiales",
    tag: "PRODUCTO ESTRELLA",
    badgeColor: "bg-red",
    desc: "100g de spaguettis al dente hervidos al instante, salteados y coronados con un generoso cucharón de salsa bolognesa casera de cocción lenta y lluvia de queso parmesano.",
    price: 4950,
    time: "10 min",
    image: "assets/images/bolognese_ladle.jpg"
  },
  {
    id: "pomodoro-basilico",
    name: "Bowl Pomodoro & Basilico",
    category: "especiales",
    tag: "CLÁSICO ITALIANO",
    badgeColor: "bg-green",
    desc: "100g de spaguettis salteados con pulpa de tomates dulces madurados al sol, ajo confitado, aceite de oliva virgen extra y hojas tiernas de albahaca fresca.",
    price: 4200,
    time: "10 min",
    image: "assets/images/menu_variety.jpg"
  },
  {
    id: "cuatro-quesos",
    name: "Bowl 4 Quesos Cremoso",
    category: "especiales",
    tag: "FULL SABOR",
    badgeColor: "bg-gold",
    desc: "100g de spaguettis salteados en una emulsión fundida de queso parmesano, mozzarella hilada, provolone curado y un toque suave de gorgonzola.",
    price: 5200,
    time: "10 min",
    image: "assets/images/menu_variety.jpg"
  },
  {
    id: "pesto-genoves",
    name: "Bowl Pesto Genovés & Cherry",
    category: "especiales",
    tag: "VEGGIE FRESH",
    badgeColor: "bg-green",
    desc: "100g de spaguettis con pesto artesanal de albahaca verde brillante, piñones tostados, queso curado y tomatitos cherry dulces salteados al wok.",
    price: 4850,
    time: "10 min",
    image: "assets/images/menu_variety.jpg"
  },
  {
    id: "alfredo-crispy",
    name: "Bowl Alfredo con Pollo Crispy",
    category: "especiales",
    tag: "SUPER CARGADO",
    badgeColor: "bg-blue",
    desc: "100g de spaguettis bañados en clásica salsa blanca mantecosa al parmesano y pimienta negra, acompañada de pechuga de pollo crocante en tiras.",
    price: 5500,
    time: "10 min",
    image: "assets/images/sauteing_pan.jpg"
  },
  {
    id: "menu-ejecutivo-almuerzo",
    name: "Menú Ejecutivo Almuerzo Express",
    category: "almuerzos",
    tag: "IDEAL ALMUERZO",
    badgeColor: "bg-red",
    desc: "Bowl 100g Spaguetti Bolognesa Tradicional + Bebida helada 500ml + 2 panes de ajo crocantes recién horneados. La recarga de energía ideal para tu mediodía.",
    price: 5900,
    time: "10 min",
    image: "assets/images/bolognese_ladle.jpg"
  },
  {
    id: "combo-noche-amigos",
    name: "Combo Noche Noodles x2",
    category: "cenas",
    tag: "FAVORITO CENA",
    badgeColor: "bg-gold",
    desc: "2 Bowls 100g a elección (Bolognesa, 4 Quesos o Pomodoro) + 2 Bebidas frías + 2 porciones de Tiramisú Express. Para disfrutar en el local o en casa.",
    price: 11500,
    time: "10 min",
    image: "assets/images/dining_invitation.jpg"
  },
  {
    id: "pack-familiar-4",
    name: "Fast Pack Familiar x4",
    category: "cenas",
    tag: "SUPER PACK",
    badgeColor: "bg-blue",
    desc: "4 Bowls 100g a elección con salsas surtidas + 4 Bebidas 500ml + 4 porciones de pan de ajo calentito. Ideal para una cena rápida y deliciosa.",
    price: 19800,
    time: "10 min",
    image: "assets/images/menu_variety.jpg"
  },
  {
    id: "pan-de-ajo",
    name: "Pan de Ajo Rústico al Horno (2 u)",
    category: "bebidas",
    tag: "ACOMPAÑAMIENTO",
    badgeColor: "bg-gold",
    desc: "Baguette rústica dorada al horno con manteca de ajo casera, perejil fresco y queso fundido.",
    price: 1600,
    time: "10 min",
    image: "assets/images/dining_invitation.jpg"
  },
  {
    id: "tiramisu-express",
    name: "Tiramisú Express Noodles",
    category: "bebidas",
    tag: "POSTRE",
    badgeColor: "bg-red",
    desc: "Crema de mascarpone artesanal, bizcochos embebidos en café expreso recién tirado y cacao amargo puro en vaso transparente.",
    price: 2100,
    time: "10 min",
    image: "assets/images/dessert_tiramisu.jpg"
  },
  {
    id: "bebida-500ml",
    name: "Bebida Helada 500ml",
    category: "bebidas",
    tag: "BEBIDA",
    badgeColor: "bg-blue",
    desc: "Gaseosa línea clásica, agua mineral natural o limonada casera con menta y jengibre servida en botella helada.",
    price: 1400,
    time: "10 min",
    image: "assets/images/drinks_bottles.svg"
  }
];

class NoodlesApp {
  constructor() {
    this.cart = [];
    this.orderType = "takeaway"; // dinein, takeaway, delivery
    this.activeCategory = "todos";

    // Bowl customizer state
    this.builderState = {
      base: { name: "Spaguettis Al Dente (100g)", price: 3500 },
      sauce: { name: "Salsa Bolognesa Tradicional", price: 1450, color: "#dc2626" },
      toppings: [],
      side: null
    };

    this.init();
  }

  init() {
    this.renderMenu();
    this.setupCategoryFilters();
    this.setupBowlBuilder();
    this.setupCart();
    this.setupModals();
    this.setupMobileNav();
  }

  // Renderizar catálogo de productos
  renderMenu(filteredCategory = "todos") {
    const container = document.getElementById("menuGrid");
    if (!container) return;

    const filtered = filteredCategory === "todos" 
      ? MENU_DATA 
      : MENU_DATA.filter(item => item.category === filteredCategory);

    container.innerHTML = filtered.map(item => `
      <article class="menu-card" data-category="${item.category}">
        <div class="menu-card-img-wrap">
          <img src="${item.image}" alt="${item.name}" loading="lazy" class="menu-card-img">
          <span class="menu-card-badge ${item.badgeColor}">${item.tag}</span>
          <span class="menu-card-time">⚡ ${item.time}</span>
        </div>
        <div class="menu-card-content">
          <h3 class="menu-card-title">${item.name}</h3>
          <p class="menu-card-desc">${item.desc}</p>
          <div class="menu-card-footer">
            <span class="menu-card-price">$${item.price.toLocaleString("es-AR")}</span>
            <button class="btn btn-primary btn-sm add-to-cart-btn" data-id="${item.id}">
              <span>+ Agregar</span>
            </button>
          </div>
        </div>
      </article>
    `).join("");

    // Attach add to cart buttons
    container.querySelectorAll(".add-to-cart-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.dataset.id;
        this.addToCartById(id);
      });
    });
  }

  setupCategoryFilters() {
    const buttons = document.querySelectorAll(".menu-cat-btn");
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.activeCategory = btn.dataset.category;
        this.renderMenu(this.activeCategory);
      });
    });
  }

  // Configurador interactivo "Arma tu Bowl"
  setupBowlBuilder() {
    const sauceRadios = document.querySelectorAll('input[name="builder-sauce"]');
    const toppingChecks = document.querySelectorAll('input[name="builder-topping"]');
    const sideRadios = document.querySelectorAll('input[name="builder-side"]');
    const addCustomBtn = document.getElementById("addCustomBowlBtn");

    sauceRadios.forEach(radio => {
      radio.addEventListener("change", () => {
        const name = radio.dataset.name;
        const price = parseInt(radio.dataset.price, 10);
        const color = radio.dataset.color || "#dc2626";
        this.builderState.sauce = { name, price, color };
        this.updateBuilderUI();
      });
    });

    toppingChecks.forEach(check => {
      check.addEventListener("change", () => {
        this.builderState.toppings = [];
        toppingChecks.forEach(c => {
          if (c.checked) {
            this.builderState.toppings.push({
              name: c.dataset.name,
              price: parseInt(c.dataset.price, 10)
            });
          }
        });
        this.updateBuilderUI();
      });
    });

    sideRadios.forEach(radio => {
      radio.addEventListener("change", () => {
        if (radio.value === "none") {
          this.builderState.side = null;
        } else {
          this.builderState.side = {
            name: radio.dataset.name,
            price: parseInt(radio.dataset.price, 10)
          };
        }
        this.updateBuilderUI();
      });
    });

    if (addCustomBtn) {
      addCustomBtn.addEventListener("click", () => {
        this.addCustomBowlToCart();
      });
    }

    this.updateBuilderUI();
  }

  updateBuilderUI() {
    // Calculate total price
    let total = this.builderState.base.price + this.builderState.sauce.price;
    this.builderState.toppings.forEach(top => { total += top.price; });
    if (this.builderState.side) { total += this.builderState.side.price; }

    // Update Price Display
    const priceDisplay = document.getElementById("builderTotalPrice");
    if (priceDisplay) {
      priceDisplay.textContent = `$${total.toLocaleString("es-AR")}`;
    }

    // Update Live Bowl Preview
    const previewSauce = document.getElementById("previewSauceLayer");
    const previewToppings = document.getElementById("previewToppingsLayer");
    const previewLabel = document.getElementById("previewBowlSummary");

    if (previewSauce) {
      previewSauce.style.backgroundColor = this.builderState.sauce.color;
      previewSauce.style.opacity = "0.85";
    }

    if (previewToppings) {
      previewToppings.innerHTML = this.builderState.toppings.map(t => `
        <span class="preview-topping-badge">${t.name}</span>
      `).join("");
    }

    if (previewLabel) {
      const topsText = this.builderState.toppings.length > 0 
        ? ` + ${this.builderState.toppings.map(t => t.name).join(", ")}` 
        : "";
      const sideText = this.builderState.side ? ` + ${this.builderState.side.name}` : "";
      previewLabel.textContent = `Bowl 100g (${this.builderState.sauce.name}${topsText}${sideText})`;
    }
  }

  addCustomBowlToCart() {
    let total = this.builderState.base.price + this.builderState.sauce.price;
    this.builderState.toppings.forEach(top => { total += top.price; });
    if (this.builderState.side) { total += this.builderState.side.price; }

    const toppingsList = this.builderState.toppings.map(t => t.name).join(", ");
    const title = `Bowl 100g Personalizado: ${this.builderState.sauce.name}`;
    const desc = `${this.builderState.base.name}, ${this.builderState.sauce.name}${toppingsList ? " con " + toppingsList : ""}${this.builderState.side ? " + " + this.builderState.side.name : ""}`;

    const customItem = {
      id: "custom-" + Date.now(),
      name: title,
      desc: desc,
      price: total,
      quantity: 1,
      image: "assets/images/bolognese_ladle.jpg"
    };

    this.cart.push(customItem);
    this.updateCartUI();
    this.openCart();
    this.showToast("¡Bowl personalizado agregado al carrito!");
  }

  addToCartById(id) {
    const product = MENU_DATA.find(p => p.id === id);
    if (!product) return;

    const existing = this.cart.find(item => item.id === id);
    if (existing) {
      existing.quantity++;
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        desc: product.desc,
        price: product.price,
        quantity: 1,
        image: product.image
      });
    }

    this.updateCartUI();
    this.openCart();
    this.showToast(`Agregaste "${product.name}" al pedido`);
  }

  setupCart() {
    const cartToggleBtns = document.querySelectorAll(".cart-toggle-btn");
    const cartCloseBtn = document.getElementById("cartCloseBtn");
    const cartOverlay = document.getElementById("cartOverlay");
    const checkoutBtn = document.getElementById("cartCheckoutBtn");
    const orderTypeRadios = document.querySelectorAll('input[name="orderType"]');

    cartToggleBtns.forEach(b => {
      b.addEventListener("click", () => this.toggleCart());
    });

    if (cartCloseBtn) {
      cartCloseBtn.addEventListener("click", () => this.closeCart());
    }

    if (cartOverlay) {
      cartOverlay.addEventListener("click", () => this.closeCart());
    }

    orderTypeRadios.forEach(radio => {
      radio.addEventListener("change", () => {
        this.orderType = radio.value;
        this.updateCartUI();
      });
    });

    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => {
        if (this.cart.length === 0) {
          alert("Tu carrito está vacío. ¡Elige un delicioso bowl de spaguettis para comenzar!");
          return;
        }
        this.openCheckoutModal();
      });
    }
  }

  toggleCart() {
    const drawer = document.getElementById("cartDrawer");
    const overlay = document.getElementById("cartOverlay");
    if (drawer && overlay) {
      const isOpen = drawer.classList.contains("active");
      if (isOpen) {
        this.closeCart();
      } else {
        this.openCart();
      }
    }
  }

  openCart() {
    const drawer = document.getElementById("cartDrawer");
    const overlay = document.getElementById("cartOverlay");
    if (drawer && overlay) {
      drawer.classList.add("active");
      overlay.classList.add("active");
    }
  }

  closeCart() {
    const drawer = document.getElementById("cartDrawer");
    const overlay = document.getElementById("cartOverlay");
    if (drawer && overlay) {
      drawer.classList.remove("active");
      overlay.classList.remove("active");
    }
  }

  updateCartUI() {
    const countBadges = document.querySelectorAll(".cart-count-badge");
    const itemsContainer = document.getElementById("cartItemsList");
    const subtotalEl = document.getElementById("cartSubtotal");
    const deliveryFeeEl = document.getElementById("cartDeliveryFee");
    const totalEl = document.getElementById("cartTotal");

    const totalCount = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    countBadges.forEach(b => {
      b.textContent = totalCount;
      b.style.display = totalCount > 0 ? "inline-flex" : "none";
    });

    if (!itemsContainer) return;

    if (this.cart.length === 0) {
      itemsContainer.innerHTML = `
        <div class="cart-empty">
          <div class="empty-icon">🍝</div>
          <p>Tu carrito está vacío</p>
          <span class="sub">Elegí tu bowl favorito o armalo a tu gusto. ¡Sale en 10 minutos!</span>
        </div>
      `;
    } else {
      itemsContainer.innerHTML = this.cart.map(item => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img">
          <div class="cart-item-info">
            <h4 class="cart-item-title">${item.name}</h4>
            <span class="cart-item-price">$${(item.price * item.quantity).toLocaleString("es-AR")}</span>
            <div class="cart-item-qty-controls">
              <button class="btn-qty" data-action="decrease" data-id="${item.id}">-</button>
              <span class="qty-num">${item.quantity}</span>
              <button class="btn-qty" data-action="increase" data-id="${item.id}">+</button>
              <button class="btn-del" data-action="delete" data-id="${item.id}" title="Eliminar">🗑️</button>
            </div>
          </div>
        </div>
      `).join("");

      // Events for quantity controls
      itemsContainer.querySelectorAll(".btn-qty").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const action = e.currentTarget.dataset.action;
          const id = e.currentTarget.dataset.id;
          const item = this.cart.find(i => i.id === id);
          if (!item) return;

          if (action === "increase") {
            item.quantity++;
          } else if (action === "decrease") {
            item.quantity--;
            if (item.quantity <= 0) {
              this.cart = this.cart.filter(i => i.id !== id);
            }
          }
          this.updateCartUI();
        });
      });

      itemsContainer.querySelectorAll(".btn-del").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const id = e.currentTarget.dataset.id;
          this.cart = this.cart.filter(i => i.id !== id);
          this.updateCartUI();
        });
      });
    }

    const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = this.orderType === "delivery" && subtotal > 0 ? 1200 : 0;
    const total = subtotal + deliveryFee;

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toLocaleString("es-AR")}`;
    if (deliveryFeeEl) deliveryFeeEl.textContent = deliveryFee > 0 ? `$${deliveryFee.toLocaleString("es-AR")}` : "¡Gratis!";
    if (totalEl) totalEl.textContent = `$${total.toLocaleString("es-AR")}`;
  }

  openCheckoutModal() {
    this.closeCart();
    const modal = document.getElementById("checkoutModal");
    if (modal) {
      modal.classList.add("active");
      const orderSummaryEl = document.getElementById("checkoutOrderSummary");
      if (orderSummaryEl) {
        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const deliveryFee = this.orderType === "delivery" ? 1200 : 0;
        const total = subtotal + deliveryFee;

        orderSummaryEl.innerHTML = `
          <div class="checkout-summary-box">
            <p><strong>Modalidad:</strong> ${this.orderType === "dinein" ? "Comer en Salón Noodles®" : this.orderType === "takeaway" ? "Retiro Take-Away Express" : "Envío Delivery"}</p>
            <ul class="checkout-items-mini">
              ${this.cart.map(i => `<li>${i.quantity}x ${i.name} ($${(i.price * i.quantity).toLocaleString("es-AR")})</li>`).join("")}
            </ul>
            <div class="checkout-total-row">
              <span>Total a pagar:</span>
              <strong class="total-big">$${total.toLocaleString("es-AR")}</strong>
            </div>
          </div>
        `;
      }
    }
  }

  setupModals() {
    // Checkout form submit
    const checkoutForm = document.getElementById("checkoutForm");
    const checkoutModal = document.getElementById("checkoutModal");
    const checkoutClose = document.getElementById("checkoutCloseBtn");

    if (checkoutClose && checkoutModal) {
      checkoutClose.addEventListener("click", () => {
        checkoutModal.classList.remove("active");
      });
    }

    if (checkoutForm) {
      checkoutForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const clientName = document.getElementById("clientName").value;
        const orderNum = "NDL-" + Math.floor(100000 + Math.random() * 900000);

        // Show Success View
        checkoutModal.querySelector(".modal-body").innerHTML = `
          <div class="order-success-screen">
            <div class="success-icon">🎉🍝</div>
            <h3>¡Pedido Confirmado, ${clientName}!</h3>
            <p class="order-id">Orden Nº: <strong>${orderNum}</strong></p>
            <p class="order-time-alert">⏱️ Tus spaguettis están entrando a la hervidora industrial y se saltearán al momento. Tiempo estimado: <strong>10 minutos</strong>.</p>
            <div class="order-instructions">
              <p>📍 Te esperamos en el mostrador express de Noodles® con tu número de orden o aguarda en tu mesa.</p>
            </div>
            <button class="btn btn-primary" id="successDoneBtn">Aceptar y Cerrar</button>
          </div>
        `;

        document.getElementById("successDoneBtn")?.addEventListener("click", () => {
          this.cart = [];
          this.updateCartUI();
          checkoutModal.classList.remove("active");
          window.location.reload();
        });
      });
    }

    // Storyboard / Video Script Modal
    const scriptModalBtn = document.getElementById("openScriptModalBtn");
    const scriptModal = document.getElementById("scriptModal");
    const scriptCloseBtn = document.getElementById("scriptCloseBtn");
    const copyScriptBtn = document.getElementById("copyScriptBtn");

    if (scriptModalBtn && scriptModal) {
      scriptModalBtn.addEventListener("click", () => {
        scriptModal.classList.add("active");
      });
    }

    if (scriptCloseBtn && scriptModal) {
      scriptCloseBtn.addEventListener("click", () => {
        scriptModal.classList.remove("active");
      });
    }

    if (copyScriptBtn) {
      copyScriptBtn.addEventListener("click", () => {
        const textToCopy = document.getElementById("scriptTextContent").innerText;
        navigator.clipboard.writeText(textToCopy).then(() => {
          copyScriptBtn.textContent = "✅ ¡Guión Copiado!";
          setTimeout(() => {
            copyScriptBtn.textContent = "📋 Copiar Guión Completo";
          }, 2500);
        });
      });
    }
  }

  setupMobileNav() {
    const navToggle = document.getElementById("mobileNavToggle");
    const navMenu = document.getElementById("navMenu");

    if (navToggle && navMenu) {
      navToggle.addEventListener("click", () => {
        navMenu.classList.toggle("nav-active");
        navToggle.classList.toggle("is-open");
      });

      // Close menu on link click
      navMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
          navMenu.classList.remove("nav-active");
          navToggle.classList.remove("is-open");
        });
      });
    }
  }

  showToast(message) {
    let toast = document.getElementById("noodlesToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "noodlesToast";
      toast.className = "noodles-toast";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3200);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.noodlesApp = new NoodlesApp();
});
