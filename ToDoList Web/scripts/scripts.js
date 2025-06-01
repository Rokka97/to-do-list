// Cargar los contenidos de las tareas al cargar la página
document.addEventListener("DOMContentLoaded", function () {
    // función para cargar las tareas
    cargarTareas();
    // función para cargar los recordatorios
    cargarRecordatorios();
    // iniciar alarma de recordatorios
    iniciarAlarmaRecordatorios();
    // cargar fecha y hora actual en tiempo real
    cargarFechaHoraActual();
    // cargar tema preferido
    cargarTemaPreferido();
});

// función para cargar las tareas
function cargarTareas() {
    fetch("backend/cargarTareas.php")
        .then(response => response.json())
        .then(data => {
            let listaTareas = document.getElementById("tareasList");
            let tituloTareaInput = document.getElementById("tituloTarea");
            let parrafoTareaInput = document.getElementById("parrafoTarea");
            let fechaCreacion = document.getElementById("fechaCreacion");
            let fechaVencimiento = document.getElementById("fechaVencimiento");

            listaTareas.innerHTML = ""; // Limpiar lista antes de agregar nuevas tareas

            data.forEach(tarea => {
                let item = document.createElement("li");
                item.textContent = tarea.titulo;
                item.style.cursor = "pointer";
                item.setAttribute("data-id", tarea.id_tarea);

                // Evento para mostrar detalles y permitir edición
                item.addEventListener("click", function () {
                    
                    document.querySelectorAll("#tareasList li").forEach(li => li.classList.remove("tarea-seleccionada"));
                    item.classList.add("tarea-seleccionada");

                    let idTarea = this.getAttribute("data-id");
                    tituloTareaInput.value = tarea.titulo;
                    parrafoTareaInput.value = tarea.tarea;
                    fechaCreacion.value = tarea.fecha_creacion;
                    fechaVencimiento.value = tarea.fecha_vencimiento;
                    parrafoTareaInput.setAttribute("data-id", idTarea);
                });

                listaTareas.appendChild(item);
            });
        })
        .catch(error => console.error("Error al cargar las tareas:", error));
}
// Evento para boton nuevaTareaBtn
document.getElementById("nuevaTareaBtn").addEventListener("click", function () {
    document.getElementById("tituloTarea").value = "";
    document.getElementById("parrafoTarea").value = "";
    document.getElementById("fechaCreacion").value = "";
    document.getElementById("fechaVencimiento").value = "";
    document.getElementById("parrafoTarea").removeAttribute("data-id");
    // Quitar selección de todas las tareas
    document.querySelectorAll("#tareasList li").forEach(li => li.classList.remove("tarea-seleccionada"));
});

// Evento para el boton de guardar tarea
document.getElementById("guardarTareaBtn").addEventListener("click", function () {
    let parrafoTareaInput = document.getElementById("parrafoTarea");
    let idTarea = parrafoTareaInput.getAttribute("data-id");
    let nuevaDescripcion = parrafoTareaInput.value;
    let tituloTarea = document.getElementById("tituloTarea").value;
    let fechaCreacion = document.getElementById("fechaCreacion").value;
    let fechaVencimiento = document.getElementById("fechaVencimiento").value;

    // Validar título vacío, nulo o solo espacios
    if (!tituloTarea || tituloTarea.trim() === "") {
        Swal.fire({
            icon: 'warning',
            title: 'El título de la tarea es obligatorio',
            text: 'Por favor, ingresa un título antes de guardar la tarea.',
            showConfirmButton: true
        });
        return;
    }

    if (idTarea === null || idTarea === "") {
        fetch("backend/nuevaTarea.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `tarea=${encodeURIComponent(nuevaDescripcion)}&titulo=${encodeURIComponent(tituloTarea)}&fechaVencimiento=${encodeURIComponent(fechaVencimiento)}`
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Nueva Tarea guardada correctamente!',
                        timer: 3000,
                        showConfirmButton: true
                    });
                    parrafoTareaInput.setAttribute("data-id", data.id_tarea);

                    setTimeout(() => {
                        let nuevoLi = document.querySelector(`#tareasList li[data-id='${data.id_tarea}']`);
                        if (nuevoLi) nuevoLi.classList.add("tarea-seleccionada");
                    }, 300);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al guardar la tarea.',
                        timer: 3000,
                        showConfirmButton: true
                    });
                }
            })
            .catch(error => console.error("Error:", error));
    } else {
        fetch("backend/guardarTarea.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `id_tarea=${idTarea}&tarea=${encodeURIComponent(nuevaDescripcion)}&titulo=${encodeURIComponent(tituloTarea)}&fechaCreacion=${encodeURIComponent(fechaCreacion)}&fechaVencimiento=${encodeURIComponent(fechaVencimiento)}`
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Tarea guardada correctamente.',
                        timer: 3000,
                        showConfirmButton: true
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al guardar la tarea.',
                        timer: 3000,
                        showConfirmButton: true
                    });
                }
            })
            .catch(error => console.error("Error:", error));
    }
    // actualizar la barra de recordatorios
    cargarRecordatorios();
    cargarTareas();
});

// Evento para el botón de eliminar tarea
document.getElementById("eliminarTareaBtn").addEventListener("click", function () {
    let idTarea = document.getElementById("parrafoTarea").getAttribute("data-id");

    fetch("backend/eliminarTarea.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `id_tarea=${idTarea}`
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Tarea eliminada correctamente.',
                    timer: 3000,
                    showConfirmButton: true
                });
                cargarTareas();
            } else if (data.message === 'La tarea tiene recordatorios pendientes.') {
                Swal.fire({
                    icon: 'warning',
                    title: 'No se puede eliminar la tarea',
                    text: 'La tarea tiene recordatorios pendientes. Elimina primero los recordatorios.',
                    showConfirmButton: true
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al eliminar la tarea.',
                    timer: 3000,
                    showConfirmButton: true
                });
            }
        })
        .catch(error => console.error("Error:", error));

    document.getElementById("tituloTarea").value = "";
    document.getElementById("parrafoTarea").value = "";
    document.getElementById("fechaCreacion").value = "";
    document.getElementById("fechaVencimiento").value = "";
    document.getElementById("parrafoTarea").removeAttribute("data-id"); // Limpiar ID
});


// Evento para el boton crearRecordatorioBtn
document.getElementById("crearRecordatorioBtn").addEventListener("click", async function () {
    let idTarea = document.getElementById("parrafoTarea").getAttribute("data-id");
    if (!idTarea) {
        Swal.fire({
            icon: 'warning',
            title: 'Selecciona una tarea',
            text: 'Debes seleccionar una tarea antes de crear un recordatorio.'
        });
        return;
    }

    const { value: fecha } = await Swal.fire({
        title: 'Selecciona fecha y hora del recordatorio',
        html: '<input id="swal-input-fecha" type="datetime-local" class="swal2-input">',
        focusConfirm: false,
        preConfirm: () => {
            return document.getElementById('swal-input-fecha').value;
        }
    });
    if (fecha) {
        if (!idTarea || !fecha) {
            Swal.fire({
                icon: 'error',
                title: 'Datos inválidos',
                text: 'Por favor, asegúrate de seleccionar una tarea y una fecha válida antes de continuar.'
            });
            return;
        }
        fetch("backend/crearRecordatorio.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `id_tarea=${encodeURIComponent(idTarea)}&fecha_recordatorio=${encodeURIComponent(fecha)}`
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    Swal.fire('¡Recordatorio creado!', '', 'success');
                } else {
                    Swal.fire('Error', 'No se pudo crear el recordatorio.', 'error');
                }
            })
            .catch(error => {
                console.error("Error:", error);
                Swal.fire('Error', 'Ocurrió un error al crear el recordatorio.', 'error');
            });
    }
    // Recargar recordatorios después de crear uno nuevo
    cargarRecordatorios();
});

// funcion para cargar recordatorios 
function cargarRecordatorios() {
    fetch("backend/cargarRecordatorios.php")
        .then(response => response.json())
        .then(data => {
            let recordatoriosList = document.getElementById("recordatoriosList");
            recordatoriosList.innerHTML = ""; // Limpiar lista antes de agregar nuevos recordatorios

            // Ordenar por fecha (más cercana primero)
            data.sort((a, b) => new Date(a.fecha_recordatorio) - new Date(b.fecha_recordatorio));

            data.forEach(recordatorio => {
                let contenedor = document.createElement("div");
                contenedor.className = "divRecordatorio";
                contenedor.setAttribute("data-id", recordatorio.id_recordatorio);

                // Título
                let titulo = document.createElement("h3");
                titulo.textContent = recordatorio.titulo;
                titulo.className = "recordatorioTitulo";

                // Fecha
                let fecha = document.createElement("p");
                fecha.textContent = " Recordatorio Dia: " + recordatorio.fecha_recordatorio;
                fecha.className = "recordatorioFecha";

                // Cambiar fondo si la fecha ya pasó
                let fechaRecordatorio = new Date(recordatorio.fecha_recordatorio);
                let ahora = new Date();
                if (fechaRecordatorio < ahora) {
                    contenedor.classList.add("recordatorio-expirado");
                }

                // Botón eliminar
                let btnEliminar = document.createElement("button");
                btnEliminar.textContent = "Eliminar";
                btnEliminar.className = "eliminar-recordatorio-btn";
                btnEliminar.addEventListener("click", function (e) {
                    e.stopPropagation();
                    let idRecordatorio = contenedor.getAttribute("data-id");
                    fetch("backend/eliminarRecordatorio.php", {
                        method: "POST",
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        body: `id_recordatorio=${idRecordatorio}`
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.success) {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Recordatorio eliminado correctamente.',
                                    timer: 3000,
                                    showConfirmButton: true
                                });
                                contenedor.remove();
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Error al eliminar el recordatorio.',
                                    timer: 3000,
                                    showConfirmButton: true
                                });
                            }
                        })
                        .catch(error => console.error("Error:", error));
                });

                contenedor.appendChild(titulo);
                contenedor.appendChild(fecha);
                contenedor.appendChild(btnEliminar);

                recordatoriosList.appendChild(contenedor);
            });
        })
        .catch(error => {
            console.error("Error al cargar los recordatorios desde 'backend/cargarRecordatorios.php':", error);
            console.error("Detalles adicionales: URL='backend/cargarRecordatorios.php'");
        });
}

// Función para iniciar alarmas de recordatorios
function revisarAlarmasRecordatorios() {
    // Obtén todos los recordatorios del DOM
    document.querySelectorAll(".divRecordatorio").forEach(div => {
        let fechaTexto = div.querySelector(".recordatorioFecha").textContent.replace(" Recordatorio Dia: ", "").trim();
        let fechaRecordatorio = new Date(fechaTexto);
        let ahora = new Date();

        // Compara año, mes, día, hora y minuto
        if (
            fechaRecordatorio.getFullYear() === ahora.getFullYear() &&
            fechaRecordatorio.getMonth() === ahora.getMonth() &&
            fechaRecordatorio.getDate() === ahora.getDate() &&
            fechaRecordatorio.getHours() === ahora.getHours() &&
            fechaRecordatorio.getMinutes() === ahora.getMinutes() &&
            !div.classList.contains("recordatorio-notificado")
        ) {
            // Reproducir sonido de notificación
            const audio = new Audio("src/sonidoNotificacion.mp3");
            audio.loop = false; // No repetir el sonido
            audio.play().catch(() => {}); // Ignorar errores de autoplay

            Swal.fire({
                icon: 'info',
                title: '¡Recordatorio!',
                text: div.querySelector(".recordatorioTitulo").textContent,
                showConfirmButton: true
            });
            div.classList.add("recordatorio-notificado");
        }
        cargarRecordatorios(); // Recargar recordatorios después de revisar alarmas
    });
}

function iniciarAlarmaRecordatorios() {
    revisarAlarmasRecordatorios(); // Ejecutar al cargar la página
    setInterval(revisarAlarmasRecordatorios, 60000); // Luego cada minuto
}

// cargar fecha y hora actual en tiempo real (sin segundos)
function mostrarFechaHoraActual() {
    let fechaHora = new Date();
    let fechaHoraFormateada = fechaHora.toLocaleString(undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    document.getElementById("fechaHora").textContent = fechaHoraFormateada;
}

function cargarFechaHoraActual() {
    mostrarFechaHoraActual(); // Ejecutar al cargar la página
    setInterval(mostrarFechaHoraActual, 60000); // Luego cada minuto
}

// Este script maneja la funcionalidad del menú de ajustes y el cambio de tema
document.getElementById("ajustesBtn").addEventListener("click", function () {
    document.getElementById("menuAjustes").classList.toggle("mostrar");
});

// Cierra el menú de ajustes al hacer clic fuera de él
document.addEventListener("click", function (event) {
    const menuAjustes = document.getElementById("menuAjustes");
    const ajustesBtn = document.getElementById("ajustesBtn");

    // Verifica si el clic ocurrió fuera del menú y del botón de ajustes
    if (!menuAjustes.contains(event.target) && !ajustesBtn.contains(event.target)) {
        menuAjustes.classList.remove("mostrar");
    }
});

// Cierra la sesión al hacer clic en el botón de cerrar sesión
document.getElementById("cerrarSesionBtn").addEventListener("click", function () {
    localStorage.clear(); // Elimina la sesión
    document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Elimina la cookie de sesión
    window.location.href = "login.php"; // Redirige al login
});

// Cambia el tema al hacer clic en el botón de cambiar tema
document.getElementById("temaBtn").addEventListener("click", function() {
    Swal.fire({
        title: 'Selecciona un tema',
        input: 'select',
        inputOptions: {
            'Temas Estándar': {
                'styles/standarAzul.css': 'Estándar Azul',
                'styles/standarRojo.css': 'Estándar Rojo',
                'styles/StandarVerde.css': 'Estándar Verde'
                
            },
            'Temas Rectos': {
                'styles/rectoAzul.css': 'Recto Azul',
                'styles/rectoRojo.css': 'Recto Rojo',
                'styles/rectoBlanco.css': 'Recto Blanco'
                
            },
            'Modos Especiales': {                
                'styles/modoAltoContraste.css': 'Alto Contraste',
                'styles/rectoOscuro.css': 'Recto Oscuro',
                'styles/modoOsuro.css': 'Modo Oscuro'
            }
        },
        inputPlaceholder: 'Selecciona un tema',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
            if (!value) {
                return 'Necesitas seleccionar un tema';
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const temaSeleccionado = result.value;

            // Cambiar el href del link de estilos
            document.querySelector('link[rel="stylesheet"]').href = temaSeleccionado;

            // Guardar preferencia en la base de datos
            fetch('backend/guardarTema.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tema: temaSeleccionado })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Tema cambiado correctamente',
                        timer: 1500,
                        showConfirmButton: false
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al guardar el tema',
                        text: data.message || 'Intenta nuevamente',
                        showConfirmButton: true
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error al guardar el tema',
                    text: 'Intenta nuevamente',
                    showConfirmButton: true
                });
            });
        }
    });
});
// Función para cargar el tema preferido al iniciar la página
function cargarTemaPreferido() {
    fetch('backend/cargarTema.php', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then((data) => {
        if (data.success && data.tema) {
            document.querySelector('link[rel="stylesheet"]').href = data.tema;
        }
    })
    .catch(error => {
        console.error('Error al cargar el tema:', error);
    });
}

