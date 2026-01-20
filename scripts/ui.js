// UI helpers - Dulce Estrellita
// Funciones reutilizables para feedback visual

function showToast(mensaje, tipo = "success") {
  const toastId = "appToast";
  let toast = document.getElementById(toastId);

  // Crear toast si no existe
  if (!toast) {
    toast = document.createElement("div");
    toast.id = toastId;
    toast.className = "app-toast";
    document.body.appendChild(toast);
  }

  // Mapeo de tipos a clases Bootstrap
  const alertClass = {
    success: "alert-success",
    error: "alert-danger",
    warning: "alert-warning",
    info: "alert-info"
  };

  toast.innerHTML = `
    <div class="alert ${alertClass[tipo] || alertClass.success} alert-dismissible fade show" role="alert">
      ${mensaje}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
    </div>
  `;

  // Auto-cerrar después de 3 segundos
  setTimeout(() => {
    const alertEl = toast.querySelector(".alert");
    if (alertEl) {
      alertEl.classList.remove("show");
      setTimeout(() => { toast.innerHTML = ""; }, 150);
    }
  }, 3000);
}
