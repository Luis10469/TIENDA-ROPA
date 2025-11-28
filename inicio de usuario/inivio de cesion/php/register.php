<?php
session_start();
require "db.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $email = trim($_POST["email"]);
    $password = $_POST["password"];

    if (empty($email) || empty($password)) {
        header("Location: ../public/login.html?error=campos_vacios");
        exit;
    }

    // Buscar usuario por email
    $stmt = $conn->prepare("SELECT id, nombre, email, password FROM usuarios WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows === 1) {
        $usuario = $resultado->fetch_assoc();

        // Verificar contraseña
        if (password_verify($password, $usuario["password"])) {
            // Credenciales correctas - Iniciar sesión
            $_SESSION["usuario_id"] = $usuario["id"];
            $_SESSION["usuario_nombre"] = $usuario["nombre"];
            $_SESSION["usuario_email"] = $usuario["email"];

            // Redirigir a página de inicio
            header("Location: ../../index.html");
            exit;
        } else {
            // Contraseña incorrecta
            header("Location: ../public/login.html?error=credenciales_incorrectas");
            exit;
        }
    } else {
        // Email no encontrado
        header("Location: ../public/login.html?error=credenciales_incorrectas");
        exit;
    }

    $stmt->close();
    $conn->close();
}
?>
