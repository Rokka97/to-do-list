<?php
include 'conexion.php'; // Incluir la conexión a la base de datos

$id_tarea = $_POST['id_tarea'];
$titulo = $_POST['titulo'];
$tarea = $_POST['tarea'];
$fechaVencimiento = $_POST['fechaVencimiento'];

$sql = "UPDATE tareas SET tarea = ?, titulo = ?, fecha_vencimiento = ? WHERE id_tarea = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssi", $tarea, $titulo, $fechaVencimiento, $id_tarea);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false]);
}

$stmt->close();
$conn->close();
?>