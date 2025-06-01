<!DOCTYPE html>
<html lang="en">
<head>
    <?php
    include 'backend/verificacionUsuario.php';
    ?>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles/standarAzul.css">
    <title>To-Do List</title>
</head>
<body>

    <div class="barraSuperior">                                     <!-- Barra superior con botones de ajustes y usuario -->
        <div class="botonesOpciones">
            <button id="ajustesBtn">Menu</button>
            <div id=menuAjustes class="menuAjustes">
                <p>Usuario: <?php echo $_SESSION['usuario']?></p>   <!-- Mostrar el usuario logueado -->
                <button id="cerrarSesionBtn">Cerrar Sesión</button>
                <button id="temaBtn">Temas</button>
            </div>     
        </div>        
        <h1>To-Do List</h1>        
        <p id="fechaHora"></p>
    </div>
    <div class="contenido">

        <div class="barraTareas">                                   <!-- Barra lateral con lista de tareas -->
            <h2>Tareas</h2>
            <div class="contenedorListaTareas">
                <ul id="tareasList">
                <!-- Tareas se agregarán aquí -->
                </ul>
            </div>

            <div class="botonesBarraTarea">                
            <button id="nuevaTareaBtn"> Nueva</button>
            <button id="eliminarTareaBtn">Eliminar</button>
            </div>
            
        </div>

        <div class="tareas">                                        <!-- Contenedor para mostrar y editar tareas -->
            <div class="tituloTarea">
                <input id="tituloTarea" name="tituloTarea" contenteditable="true" placeholder="ingrese nueva Tarea">
            </div>
            <div class="textoTarea"> 
                <textarea type="text" id="parrafoTarea" name="parrafoTarea" placeholder="ingrese nueva tarea"></textarea>
            </div>
            <div class="contenedorFechaTarea">
                <div class="fechaTarea">
                    <label for="fechaCreacion">Fecha de Creación:</label>
                    <input type="date" id="fechaCreacion" name="fechaCreacion" readonly>
                </div>
                <div class="fechaTarea">
                    <label for="fechaVencimiento">Fecha de Vencimiento:</label>
                    <input type="date" id="fechaVencimiento" name="fechaVencimiento">
                </div>
            </div>
            <div class="botonesTarea">
                <button id="guardarTareaBtn">Guardar</button>
                <button id="crearRecordatorioBtn">Crear Recordatorio</button>
            </div>
        </div>

        <div class="barraRecordatorios">                            <!-- Barra lateral con lista de recordatorios -->
            <h2>Recordatorios</h2>
            <div class="contenedorRecordatorios">
                <ul id="recordatoriosList">
                    <!-- recordatorios se agregarán aquí -->
                </ul>
            </div>
        </div>
    
    </div>    
    <script src="scripts/scripts.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</body>
</html>
