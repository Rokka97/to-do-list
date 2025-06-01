<?php
session_start();
include 'conexion.php'; // Archivo para la conexión a la base de datos

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $tema = $data['tema'] ?? null;
    $id_usuario = $_SESSION['id_usuario'] ?? null;

    if ($tema && $id_usuario) {
        $stmt = $conn->prepare("UPDATE usuarios SET tema = ? WHERE id_usuario = ?");
        $stmt->bind_param("si", $tema, $id_usuario);

        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al guardar el tema']);
        }
        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Datos incompletos']);
    }
}
?>