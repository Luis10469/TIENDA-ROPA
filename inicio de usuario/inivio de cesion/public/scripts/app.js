import { apiPost } from "./utils/api.js";

const form = document.getElementById("loginForm");
const statusMessage = document.getElementById("statusMessage");
const submitButton = document.getElementById("submitButton");
const registerCta = document.getElementById("registerCta");

const showMessage = (text, variant = "error") => {
  statusMessage.textContent = text;
  statusMessage.className = `message ${variant}`;
};

const toggleButtonState = (isPending) => {
  submitButton.disabled = isPending;
  submitButton.innerText = isPending ? "Validando..." : "Iniciar sesión";
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  showMessage("Conectando...", "success");
  toggleButtonState(true);
  const payload = {
    email: form.email.value.trim(),
    password: form.password.value
  };
  if (!payload.email || !payload.password) {
    showMessage("Complete los campos antes de continuar.");
    toggleButtonState(false);
    return;
  }

  try {
    const response = await apiPost("/api/auth/login", payload);
    showMessage("Bienvenido, redirigiendo...", "success");
    await new Promise((resolve) => setTimeout(resolve, 750));
    window.location.href = `https://urban-pulse-dashboard.com/app?token=${encodeURIComponent(
      response.token
    )}`;
  } catch (error) {
    const message =
      error?.error ||
      error?.errors?.[0]?.msg ||
      "Usuario no encontrado. ¿Deseas registrarte?";
    showMessage(message, "error");
  } finally {
    toggleButtonState(false);
  }
});

registerCta.addEventListener("click", () => {
  anime({
    targets: "#registerCta",
    scale: [1, 1.1, 1],
    duration: 600,
    easing: "easeOutQuart"
  });
  window.location.href = "register.html";
});

document.addEventListener("DOMContentLoaded", () => {
  anime({
    targets: ".hero-card",
    opacity: [0, 1],
    translateY: [60, 0],
    duration: 1200,
    easing: "easeOutExpo"
  });
});
