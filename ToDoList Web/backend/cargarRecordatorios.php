<?php

session_start();
include 'conexion.php';

// Verificar si el usuario está autenticado
if (isset($_SESSION['id_usuario'])) {
    $id_usuario = $_SESSION['id_usuario'];

    // Consulta para obtener los datos de la vista vistarecordatorio solo del usuario conectado
    $sql = "SELECT id_tarea, id_usuario, titulo, id_recordatorio, fecha_recordatorio 
            FROM vistarecordatorio 
            WHERE id_usuario = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id_usuario);
    $stmt->execute();
    $result = $stmt->get_result();

    $recordatorios = [];

    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $recordatorios[] = $row;
        }
    }

    // Devolver los datos en formato JSON
    header('Content-Type: application/json');
    echo json_encode($recordatorios);

    // Cerrar la conexión
    $stmt->close();
    $conn->close();
} else {
    // Si no hay sesión iniciada, devolver un error
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Usuario no autenticado']);
}
?>