<?php

include 'conexion.php';
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $usuario = $_POST['usuario'];
    $contraseña = $_POST['contraseña'];

    // Preparar y ejecutar la consulta
    $stmt = $conn->prepare("SELECT id_usuario, nombre FROM usuarios WHERE nombre = ? AND contraseña = ?");
    $stmt->bind_param("ss", $usuario, $contraseña);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows > 0) {
        // Usuario encontrado, iniciar sesión
        $row = $resultado->fetch_assoc();
        $_SESSION['usuario'] = $row['nombre'];
        $_SESSION['id_usuario'] = $row['id_usuario'];
        header('Location: ../index.php'); // Redirigir al index
        exit();
    } else {
        // Usuario no encontrado, redirigir al login con error
        header('Location: ../login.php?error=1');
        exit();
    }
}

?>