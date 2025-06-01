<?php
session_start();
include 'conexion.php'; // Archivo para la conexión a la base de datos

$id_usuario = $_SESSION['id_usuario'] ?? null;

if ($id_usuario) {
    $stmt = $conn->prepare("SELECT tema FROM usuarios WHERE id_usuario = ?");
    $stmt->bind_param("i", $id_usuario);

    if ($stmt->execute()) {
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();

        echo json_encode(['success' => true, 'tema' => $row['tema']]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al cargar el tema']);
    }
    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Usuario no autenticado']);
}
?>