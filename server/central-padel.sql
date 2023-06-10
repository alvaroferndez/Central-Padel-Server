-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-06-2023 a las 12:27:18
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

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
-- Estructura de tabla para la tabla `bookproduct`
--

CREATE TABLE `bookproduct` (
  `id` int(11) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `id_product` int(11) NOT NULL,
  `size` varchar(5) DEFAULT NULL,
  `book_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `device`
--

CREATE TABLE `device` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `matchs`
--

CREATE TABLE `matchs` (
  `id` int(11) NOT NULL,
  `date` varchar(255) NOT NULL,
  `hour` varchar(255) NOT NULL,
  `id_court` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `category` varchar(50) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productsize`
--

CREATE TABLE `productsize` (
  `id` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `xs` varchar(5) NOT NULL,
  `s` varchar(5) NOT NULL,
  `m` varchar(5) NOT NULL,
  `l` varchar(5) NOT NULL,
  `xl` varchar(5) NOT NULL,
  `2xl` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
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
  `path` varchar(255) DEFAULT NULL,
  `salt` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`admin`, `name`, `phone`, `email`, `user_name`, `age`, `position`, `category`, `dni`, `creation_date`, `years_played`, `experience`, `club`, `password`, `path`, `salt`) VALUES
(1, 'Álvaro Fernández Domingo', 666638298, 'alvaro@gmail.com', 'alvarito', '21', 'derecha', '3', '72431736J', '2023-04-19', '5', '', 'central padel', 'e996e49a44f4fde78be2be5a2e3c4607871559210e048087f151b0eda0d2d5e18fc8190ef71180104ed18e4bc9168f4165c351d1b9618775d47165a60ea40508', 'uploads/logo (2)-1686392651530-974091542.png', '0877cf68fa6e986d445c6bfd99fbdf74'),
(0, 'jose', 847309573, 'jose@gmail.com', 'joselit', '', 'derecha', '', '77023847J', NULL, '', '', '', '4480ed90ba512e03192351dc141ed5ddb132daae98c46e458e912d366822e1f1f93c1583b80a7a1109a5bc179edf5668c9960e2694ed75508c84f8f8e6a541f5', '', 'af975d3e5486ff1fbf6210320848ea07'),
(0, 'pepe', 674489367, 'pepe@gmail.com', 'pepillos', '23', 'derecha', '', '', NULL, '', '', 'central', '10ade93c01a4d92b9eefcb4739c97711b5017f60e397cb829b76c308bf428cbdc00fbee3010e857bea106b035fdbb7582ddd2c79e1dc4f702317fbf0d9a3cf94', '', 'd9f78af858cf84f8c0e15cda3dc71ca1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `userdevice`
--

CREATE TABLE `userdevice` (
  `email_user` varchar(255) NOT NULL,
  `name_device` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usermatch`
--

CREATE TABLE `usermatch` (
  `id` int(11) NOT NULL,
  `email_user` varchar(255) DEFAULT NULL,
  `id_match` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bookproduct`
--
ALTER TABLE `bookproduct`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `device`
--
ALTER TABLE `device`
  ADD PRIMARY KEY (`name`);

--
-- Indices de la tabla `matchs`
--
ALTER TABLE `matchs`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productsize`
--
ALTER TABLE `productsize`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`email`);

--
-- Indices de la tabla `userdevice`
--
ALTER TABLE `userdevice`
  ADD PRIMARY KEY (`email_user`,`name_device`),
  ADD KEY `name_device` (`name_device`);

--
-- Indices de la tabla `usermatch`
--
ALTER TABLE `usermatch`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `bookproduct`
--
ALTER TABLE `bookproduct`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `matchs`
--
ALTER TABLE `matchs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=115;

--
-- AUTO_INCREMENT de la tabla `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de la tabla `productsize`
--
ALTER TABLE `productsize`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `usermatch`
--
ALTER TABLE `usermatch`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=329;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `userdevice`
--
ALTER TABLE `userdevice`
  ADD CONSTRAINT `userdevice_ibfk_1` FOREIGN KEY (`email_user`) REFERENCES `user` (`email`),
  ADD CONSTRAINT `userdevice_ibfk_2` FOREIGN KEY (`name_device`) REFERENCES `device` (`name`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
