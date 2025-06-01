<?php
// inluye 'conexion.php';
include 'conexion.php';

// Verifica si se ha enviado el ID del recordatorio a eliminar
if (isset($_POST['id_recordatorio'])) {
    $id = intval($_POST['id_recordatorio']);

    $stmt = $conn->prepare("DELETE FROM recordatorios WHERE id_recordatorio = ?");
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Recordatorio eliminado correctamente.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al eliminar el recordatorio.']);
    }

    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'ID de recordatorio no proporcionado.']);
}

$conn->close();
?>