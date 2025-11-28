<?php
require "db.php"; // Conectar con la base de datos

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Recoger los datos del formulario
    $email = trim($_POST["email"]);
    $password = $_POST["password"];

    // Buscar al usuario en la base de datos por su correo electrónico
    $stmt = $conn->prepare("SELECT id, nombre, password FROM usuarios WHERE email = ?");
    $stmt->bind_param("s", $email);  // Vincula el parámetro (el correo)

    $stmt->execute();
    $stmt->store_result();

    // Si el correo existe
    if ($stmt->num_rows === 1) {

        $stmt->bind_result($id, $nombre, $hash);  // Recuperar los datos
        $stmt->fetch();

        // Verificar si la contraseña es correcta
        if (password_verify($password, $hash)) {
            // Si la contraseña es correcta
            echo "Bienvenido, $nombre";  // Aquí puedes redirigir a otra página después de un login exitoso
        } else {
            // Si la contraseña no es correcta
            echo "Contraseña incorrecta.";
        }

    } else {
        // Si el correo no existe
        echo "El correo no está registrado.";
    }

    // Cerrar la conexión
    $stmt->close();
    $conn->close();
}
?>
