-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:8889
-- Tiempo de generación: 23-05-2023 a las 07:55:32
-- Versión del servidor: 5.7.39
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `central-padel`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Device`
--

CREATE TABLE `Device` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `Device`
--

INSERT INTO `Device` (`name`) VALUES
('Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'),
('Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36'),
('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36'),
('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Matchs`
--

CREATE TABLE `Matchs` (
  `id` int(11) NOT NULL,
  `date` varchar(255) NOT NULL,
  `hour` varchar(255) NOT NULL,
  `id_court` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `Matchs`
--

INSERT INTO `Matchs` (`id`, `date`, `hour`, `id_court`) VALUES
(5, '24/04/2023', '9:00', 2),
(8, '24/04/2023', '20:00', 3),
(9, '24/04/2023', '17:00', 3),
(15, '24/04/2023', '14:00', 2),
(18, '27/04/2023', '9:00', 2),
(19, '24/04/2023', '9:00', 3),
(29, '04/05/2023', '19:00', 2),
(30, '04/05/2023', '11:00', 1),
(31, '04/05/2023', '14:00', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Product`
--

CREATE TABLE `Product` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `category` varchar(50) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `User`
--

CREATE TABLE `User` (
  `admin` tinyint(1) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` int(9) NOT NULL,
  `email` varchar(255) NOT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `age` varchar(10) DEFAULT NULL,
  `position` varchar(20) DEFAULT NULL,
  `category` varchar(1) DEFAULT NULL,
  `dni` varchar(9) DEFAULT NULL,
  `creation_date` date DEFAULT NULL,
  `years_played` varchar(10) DEFAULT NULL,
  `experience` varchar(255) DEFAULT NULL,
  `club` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `salt` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `User`
--

INSERT INTO `User` (`admin`, `name`, `phone`, `email`, `user_name`, `age`, `position`, `category`, `dni`, `creation_date`, `years_played`, `experience`, `club`, `password`, `salt`) VALUES
(1, 'Álvaro Fernández Domingo', 666638298, 'alvaro@gmail.com', 'alvarito', '20', 'derecha', '3', '72431736G', '2023-04-19', '5', '', 'central padel', 'e996e49a44f4fde78be2be5a2e3c4607871559210e048087f151b0eda0d2d5e18fc8190ef71180104ed18e4bc9168f4165c351d1b9618775d47165a60ea40508', '0877cf68fa6e986d445c6bfd99fbdf74'),
(0, NULL, 847309573, 'jose@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '4480ed90ba512e03192351dc141ed5ddb132daae98c46e458e912d366822e1f1f93c1583b80a7a1109a5bc179edf5668c9960e2694ed75508c84f8f8e6a541f5', 'af975d3e5486ff1fbf6210320848ea07'),
(0, NULL, 674489367, 'pepe@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '10ade93c01a4d92b9eefcb4739c97711b5017f60e397cb829b76c308bf428cbdc00fbee3010e857bea106b035fdbb7582ddd2c79e1dc4f702317fbf0d9a3cf94', 'd9f78af858cf84f8c0e15cda3dc71ca1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `UserDevice`
--

CREATE TABLE `UserDevice` (
  `email_user` varchar(255) NOT NULL,
  `name_device` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `UserDevice`
--

INSERT INTO `UserDevice` (`email_user`, `name_device`) VALUES
('alvaro@gmail.com', 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'),
('alvaro@gmail.com', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36'),
('alvaro@gmail.com', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36'),
('alvaro@gmail.com', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `UserMatch`
--

CREATE TABLE `UserMatch` (
  `id` int(11) NOT NULL,
  `email_user` varchar(255) NOT NULL,
  `id_match` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `UserMatch`
--

INSERT INTO `UserMatch` (`id`, `email_user`, `id_match`) VALUES
(1, '', 18),
(3, 'alvaro@gmail.com', 18),
(6, 'pepe@gmail.com', 18),
(7, 'jose@gmail.com', 22),
(8, 'alvaro@gmail.com', 22),
(9, '', 22),
(10, '', 22),
(15, 'alvaro@gmail.com', 21),
(16, 'alvaro@gmail.com', 23),
(37, 'alvaro@gmail.com', 29),
(38, '', 29),
(39, '', 29),
(40, '', 29);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Device`
--
ALTER TABLE `Device`
  ADD PRIMARY KEY (`name`);

--
-- Indices de la tabla `Matchs`
--
ALTER TABLE `Matchs`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Product`
--
ALTER TABLE `Product`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`email`);

--
-- Indices de la tabla `UserDevice`
--
ALTER TABLE `UserDevice`
  ADD PRIMARY KEY (`email_user`,`name_device`),
  ADD KEY `name_device` (`name_device`);

--
-- Indices de la tabla `UserMatch`
--
ALTER TABLE `UserMatch`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Matchs`
--
ALTER TABLE `Matchs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `Product`
--
ALTER TABLE `Product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `UserMatch`
--
ALTER TABLE `UserMatch`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `UserDevice`
--
ALTER TABLE `UserDevice`
  ADD CONSTRAINT `userdevice_ibfk_1` FOREIGN KEY (`email_user`) REFERENCES `User` (`email`),
  ADD CONSTRAINT `userdevice_ibfk_2` FOREIGN KEY (`name_device`) REFERENCES `Device` (`name`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
