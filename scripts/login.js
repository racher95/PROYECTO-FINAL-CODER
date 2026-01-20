// Página de Login/Registro - Dulce Estrellita

function initLogin() {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  // Si ya está logueado, redirigir
  if (isLoggedIn()) {
    window.location.href = "catalogo.html";
    return;
  }

  // Toggle mostrar/ocultar contraseña
  document.querySelectorAll(".js-toggle-password").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.target;
      const input = document.getElementById(targetId);
      const iconEye = btn.querySelector(".icon-eye");
      const iconEyeOff = btn.querySelector(".icon-eye-off");

      if (input) {
        const isPassword = input.type === "password";
        input.type = isPassword ? "text" : "password";

        // Toggle iconos
        if (iconEye && iconEyeOff) {
          iconEye.classList.toggle("d-none", isPassword);
          iconEyeOff.classList.toggle("d-none", !isPassword);
        }

        btn.setAttribute(
          "aria-label",
          isPassword ? "Ocultar contraseña" : "Mostrar contraseña"
        );
      }
    });
  });

  // Login
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    if (!email || !password) {
      Swal.fire({
        title: "Campos requeridos",
        text: "Por favor completa todos los campos.",
        icon: "warning",
        confirmButtonColor: "#6e39b7",
      });
      return;
    }

    const result = await loginUser(email, password);

    if (result.success) {
      Swal.fire({
        title: "¡Bienvenido/a!",
        text: `Hola ${result.user.nombre}`,
        icon: "success",
        confirmButtonColor: "#6e39b7",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        window.location.href = "catalogo.html";
      });
    } else {
      Swal.fire({
        title: "Error",
        text: result.message,
        icon: "error",
        confirmButtonColor: "#6e39b7",
      });
    }
  });

  // Registro
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("registerNombre").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const password2 = document.getElementById("registerPassword2").value;

    if (!nombre || !email || !password || !password2) {
      Swal.fire({
        title: "Campos requeridos",
        text: "Por favor completa todos los campos.",
        icon: "warning",
        confirmButtonColor: "#6e39b7",
      });
      return;
    }

    if (password.length < 6) {
      Swal.fire({
        title: "Contraseña muy corta",
        text: "La contraseña debe tener al menos 6 caracteres.",
        icon: "warning",
        confirmButtonColor: "#6e39b7",
      });
      return;
    }

    if (password !== password2) {
      Swal.fire({
        title: "Contraseñas no coinciden",
        text: "Por favor verifica que ambas contraseñas sean iguales.",
        icon: "warning",
        confirmButtonColor: "#6e39b7",
      });
      return;
    }

    const result = await registerUser(nombre, email, password);

    if (result.success) {
      // Auto-login después de registrar
      await loginUser(email, password);

      Swal.fire({
        title: "¡Cuenta creada!",
        text: `Bienvenido/a ${nombre}`,
        icon: "success",
        confirmButtonColor: "#6e39b7",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        window.location.href = "catalogo.html";
      });
    } else {
      Swal.fire({
        title: "Error",
        text: result.message,
        icon: "error",
        confirmButtonColor: "#6e39b7",
      });
    }
  });
}

document.addEventListener("DOMContentLoaded", initLogin);
