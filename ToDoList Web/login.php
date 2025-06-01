<!DOCTYPE html>
<html lang="es">
<?php
    session_start();
    if (isset($_SESSION) && !empty($_SESSION)) {
        session_destroy();
    }
?>
<head>
    <meta charset="UTF-8">
    <title>Login de Usuario</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles/login.css">
</head>
<body>
    <div class="contenedorLogin">
        <h2>Iniciar Sesión</h2>
        <form method="post" action="backend/loginBackend.php">
            <label for="usuario">Nombre de usuario</label>
            <input type="text" id="usuario" name="usuario" required>

            <label for="contraseña">Contraseña</label>
            <input type="password" id="contraseña" name="contraseña" required>

            <button type="submit">Ingresar</button>
        </form>
    </div>
</body>
</html>