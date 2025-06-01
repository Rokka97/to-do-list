-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-06-2025 a las 19:16:30
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `todo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recordatorios`
--

CREATE TABLE `recordatorios` (
  `id_recordatorio` int(11) NOT NULL,
  `id_tarea` int(11) DEFAULT NULL,
  `fecha_recordatorio` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `recordatorios`
--

INSERT INTO `recordatorios` (`id_recordatorio`, `id_tarea`, `fecha_recordatorio`) VALUES
(33, 14, '2025-06-08 12:19:00'),
(34, 15, '2025-06-15 12:22:00'),
(37, 34, '2025-06-01 12:53:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareas`
--

CREATE TABLE `tareas` (
  `id_tarea` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `titulo` varchar(100) DEFAULT NULL,
  `tarea` text DEFAULT NULL,
  `fecha_creacion` date DEFAULT curdate(),
  `fecha_vencimiento` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tareas`
--

INSERT INTO `tareas` (`id_tarea`, `id_usuario`, `titulo`, `tarea`, `fecha_creacion`, `fecha_vencimiento`) VALUES
(12, 2, 'tarea 1', 'tarea 1', '2025-05-27', '2025-05-31'),
(13, 2, 'tarea 2', 'tarea2', '2025-05-27', '2025-05-01'),
(14, 1, 'Ejemplo Tarea 1', 'Ejemplo de contenido de tarea 1', '2025-05-27', '2025-06-01'),
(15, 1, 'Ejemplo Tarea 2', 'Ejemplo Contenido Tarea 2', '2025-05-27', '2025-06-02'),
(16, 1, 'Ejemplo Tarea 3', 'Ejemplo contenido Tarea 3', '2025-05-27', '2025-06-03'),
(20, 1, 'Test de títulos largos para ver como se comporta la barra tareas', 'Tarea 4', '2025-05-29', '2025-05-29'),
(32, 2, 'Tarea 4', 'Tarea 4', '2025-05-31', '2025-05-31'),
(33, 2, 'Tarea 3', 'Tarea 3', '2025-05-31', '0000-00-00'),
(34, 1, 'Tarea 4', 'Tarea4 ', '2025-06-01', '2025-06-01'),
(36, 1, 'Tarea 5', '', '2025-06-01', '0000-00-00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contraseña` varchar(20) NOT NULL,
  `fecha_registro` date NOT NULL DEFAULT current_timestamp(),
  `tema` varchar(100) NOT NULL DEFAULT 'styles/standarAzul.css'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `email`, `contraseña`, `fecha_registro`, `tema`) VALUES
(1, 'Leandro', 'Leandro@example.com', 'Paralelepipedo', '2025-05-26', 'styles/standarAzul.css'),
(2, 'Antonio', 'Antonio@Example.com', 'Chimichanga', '2025-05-27', 'styles/standarAzul.css');

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vistarecordatorio`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vistarecordatorio` (
`id_tarea` int(11)
,`id_usuario` int(11)
,`titulo` varchar(100)
,`id_recordatorio` int(11)
,`fecha_recordatorio` datetime
);

-- --------------------------------------------------------

--
-- Estructura para la vista `vistarecordatorio`
--
DROP TABLE IF EXISTS `vistarecordatorio`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vistarecordatorio`  AS SELECT `t`.`id_tarea` AS `id_tarea`, `t`.`id_usuario` AS `id_usuario`, `t`.`titulo` AS `titulo`, `r`.`id_recordatorio` AS `id_recordatorio`, `r`.`fecha_recordatorio` AS `fecha_recordatorio` FROM (`tareas` `t` join `recordatorios` `r` on(`t`.`id_tarea` = `r`.`id_tarea`)) ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `recordatorios`
--
ALTER TABLE `recordatorios`
  ADD PRIMARY KEY (`id_recordatorio`),
  ADD KEY `id_tarea` (`id_tarea`);

--
-- Indices de la tabla `tareas`
--
ALTER TABLE `tareas`
  ADD PRIMARY KEY (`id_tarea`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `recordatorios`
--
ALTER TABLE `recordatorios`
  MODIFY `id_recordatorio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `tareas`
--
ALTER TABLE `tareas`
  MODIFY `id_tarea` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `recordatorios`
--
ALTER TABLE `recordatorios`
  ADD CONSTRAINT `recordatorios_ibfk_1` FOREIGN KEY (`id_tarea`) REFERENCES `tareas` (`id_tarea`);

--
-- Filtros para la tabla `tareas`
--
ALTER TABLE `tareas`
  ADD CONSTRAINT `tareas_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
