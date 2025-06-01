<?php
// Incluir el archivo de conexión
include 'conexion.php';

// Verificar si se recibió el id_tarea por POST
if (isset($_POST['id_tarea'])) {
    $id_tarea = intval($_POST['id_tarea']);

    // Verificar si la tarea tiene recordatorios asociados
    $stmtCheck = $conn->prepare("SELECT COUNT(*) FROM recordatorios WHERE id_tarea = ?");
    $stmtCheck->bind_param("i", $id_tarea);
    $stmtCheck->execute();
    $stmtCheck->bind_result($count);
    $stmtCheck->fetch();
    $stmtCheck->close();

    if ($count > 0) {
        echo json_encode(['success' => false, 'message' => 'La tarea tiene recordatorios pendientes.']);
    } else {
        // Eliminar la tarea si no tiene recordatorios
        $stmt = $conn->prepare("DELETE FROM tareas WHERE id_tarea = ?");
        $stmt->bind_param("i", $id_tarea);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Tarea eliminada correctamente.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al eliminar la tarea.']);
        }
        $stmt->close();
    }
} else {
    echo json_encode(['success' => false, 'message' => 'ID de tarea no proporcionado.']);
}

$conn->close();
?>