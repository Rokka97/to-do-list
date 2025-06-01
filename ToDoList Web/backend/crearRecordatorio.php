<?php
// conexion con la base de datos
include 'conexion.php';

$id_tarea = isset($_POST['id_tarea']) ? (int)$_POST['id_tarea'] : null;
$fecha_recordatorio = isset($_POST['fecha_recordatorio']) ? $_POST['fecha_recordatorio'] : null;

header("Content-Type: application/json"); 
if ($id_tarea !== null && $fecha_recordatorio !== null) {
    $stmt = $conn->prepare("INSERT INTO recordatorios (id_tarea, fecha_recordatorio) VALUES (?, ?)");
    $stmt->bind_param("is", $id_tarea, $fecha_recordatorio);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Recordatorio creado exitosamente."]);
    } else {
        echo json_encode(["success" => false, "message" => "Error al crear el recordatorio: " . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Faltan datos requeridos."]);
}

$conn->close();
?>
