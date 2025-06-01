<?php
header("Content-Type: application/json");

session_start();
include 'conexion.php'; 

if ($conn->connect_error) {
    die(json_encode(["error" => "Error de conexión: " . $conn->connect_error]));
}

if (!isset($_SESSION['usuario'])) {
    die(json_encode(["error" => "Usuario no autenticado."]));
}

$nombre_usuario = $_SESSION['usuario'];

$stmt = $conn->prepare("SELECT t.id_tarea, u.nombre, t.titulo, t.tarea, t.fecha_creacion, t.fecha_vencimiento
FROM tareas t JOIN usuarios u ON t.id_usuario = u.id_usuario
WHERE u.nombre = ?");

$stmt->bind_param("s", $nombre_usuario);
$stmt->execute();
$resultado = $stmt->get_result();

$tareas = [];
while ($fila = $resultado->fetch_assoc()) {
    $tareas[] = $fila;
}

echo json_encode($tareas);
?>