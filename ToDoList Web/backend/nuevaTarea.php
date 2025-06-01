<?php
include 'conexion.php'; // Incluir la conexión a la base de datos

session_start();
$idUsuario = $_SESSION['id_usuario'];
$titulo = $_POST['titulo'];
$tarea = $_POST['tarea'];
$fechaVencimiento = $_POST['fechaVencimiento'];

$sql = "INSERT INTO tareas (id_usuario, titulo, tarea, fecha_vencimiento) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("isss", $idUsuario, $titulo, $tarea, $fechaVencimiento);

if ($stmt->execute()) {
    $idTarea = $conn->insert_id; // Recuperar el id autoincremental
    echo json_encode(["success" => true, "id_tarea" => $idTarea]);
} else {
    echo json_encode(["success" => false]);
}

$stmt->close();
$conn->close();
?>