<?php
$host = "localhost";
$user = "root";   // cámbialo si usas otro usuario
$pass = "";       // agrega tu contraseña si MySQL la tiene
$dbname = "tienda_hacker";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}
?>
