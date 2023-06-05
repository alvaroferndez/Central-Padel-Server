-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-06-2023 a las 18:00:40
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
  `size` varchar(5) NOT NULL,
  `book_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `bookproduct`
--

INSERT INTO `bookproduct` (`id`, `user_email`, `id_product`, `size`, `book_at`) VALUES
(3, 'alvaro@gmail.com', 24, 'l', '2023-05-29 10:29:00'),
(4, 'pepe@gmail.com', 24, 'l', '2023-06-05 13:53:31');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `device`
--

CREATE TABLE `device` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `device`
--

INSERT INTO `device` (`name`) VALUES
('Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'),
('Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36'),
('Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Mobile Safari/537.36'),
('Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36'),
('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36'),
('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36'),
('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36'),
('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');

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

--
-- Volcado de datos para la tabla `matchs`
--

INSERT INTO `matchs` (`id`, `date`, `hour`, `id_court`) VALUES
(41, '29/05/2023', '15:00', 3),
(48, '29/05/2023', '11:00', 2),
(56, '29/05/2023', '10:00', 3),
(57, '29/05/2023', '9:00', 3),
(58, '29/05/2023', '12:00', 3),
(59, '30/05/2023', '12:00', 1),
(60, '30/05/2023', '10:00', 2),
(61, '30/05/2023', '12:00', 2),
(62, '30/05/2023', '13:00', 3),
(63, '30/05/2023', '18:00', 2),
(64, '30/05/2023', '18:00', 3),
(65, '05/06/2023', '12:00', 1),
(66, '05/06/2023', '11:00', 2),
(67, '05/06/2023', '14:00', 2),
(68, '05/06/2023', '13:00', 2),
(69, '05/06/2023', '12:00', 2),
(70, '05/06/2023', '13:00', 1),
(71, '05/06/2023', '14:00', 1),
(72, '05/06/2023', '15:00', 1),
(73, '05/06/2023', '15:00', 2),
(74, '05/06/2023', '15:00', 3),
(75, '05/06/2023', '10:00', 2);

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

--
-- Volcado de datos para la tabla `product`
--

INSERT INTO `product` (`id`, `name`, `path`, `price`, `category`, `description`) VALUES
(24, 'prueba reserva', 'uploads/peepodinero-1685356084422-155766535.jpeg', 32, 'women', 'dasdasd'),
(25, 'a', 'uploads/pepposad-1685363478848-116568253.jpeg', 6, 'women', '¡Descubre nuestra increíble camiseta de pádel para mujer! Diseñada pensando en tu comodidad y estilo, esta camiseta es perfecta para tus sesiones de juego y entrenamientos. Confeccionada con materiales de alta calidad, te proporcionará una sensación suave y transpirable, manteniéndote fresca y seca durante todo el partido.  Su ajuste perfecto resalta tu figura y te brinda total libertad de movimiento en la pista. El diseño elegante y moderno, combinado con detalles femeninos, te hará lucir espectacular mientras dominas el juego. Además, su amplia gama de tallas garantiza que encuentres la opción ideal para ti.  No solo es una camiseta de pádel, sino una prenda versátil que puedes combinar con diferentes outfits deportivos y casuales. Ya sea que estés en la cancha o fuera de ella, esta camiseta te brinda estilo y funcionalidad sin compromisos.'),
(26, 'b', 'uploads/images-1685363556926-555043913.jpeg', 3, 'women', '¡Descubre nuestra increíble camiseta de pádel para mujer! Diseñada pensando en tu comodidad y estilo, esta camiseta es perfecta para tus sesiones de juego y entrenamientos. Confeccionada con materiales de alta calidad, te proporcionará una sensación suave y transpirable, manteniéndote fresca y seca durante todo el partido.  Su ajuste perfecto resalta tu figura y te brinda total libertad de movimiento en la pista. El diseño elegante y moderno, combinado con detalles femeninos, te hará lucir espectacular mientras dominas el juego. Además, su amplia gama de tallas garantiza que encuentres la opción ideal para ti.  No solo es una camiseta de pádel, sino una prenda versátil que puedes combinar con diferentes outfits deportivos y casuales. Ya sea que estés en la cancha o fuera de ella, esta camiseta te brinda estilo y funcionalidad sin compromisos.'),
(27, 'g', 'uploads/pantalon-corto-siux-diablo-series-gris-1685363588928-915704307.jpeg', 54, 'women', '¡Descubre nuestra increíble camiseta de pádel para mujer! Diseñada pensando en tu comodidad y estilo, esta camiseta es perfecta para tus sesiones de juego y entrenamientos. Confeccionada con materiales de alta calidad, te proporcionará una sensación suave y transpirable, manteniéndote fresca y seca durante todo el partido.  Su ajuste perfecto resalta tu figura y te brinda total libertad de movimiento en la pista. El diseño elegante y moderno, combinado con detalles femeninos, te hará lucir espectacular mientras dominas el juego. Además, su amplia gama de tallas garantiza que encuentres la opción ideal para ti.  No solo es una camiseta de pádel, sino una prenda versátil que puedes combinar con diferentes outfits deportivos y casuales. Ya sea que estés en la cancha o fuera de ella, esta camiseta te brinda estilo y funcionalidad sin compromisos.'),
(28, 'fsa', 'uploads/nintendo-1685363608188-870467869.jpeg', 2, 'women', '¡Descubre nuestra increíble camiseta de pádel para mujer! Diseñada pensando en tu comodidad y estilo, esta camiseta es perfecta para tus sesiones de juego y entrenamientos. Confeccionada con materiales de alta calidad, te proporcionará una sensación suave y transpirable, manteniéndote fresca y seca durante todo el partido.  Su ajuste perfecto resalta tu figura y te brinda total libertad de movimiento en la pista. El diseño elegante y moderno, combinado con detalles femeninos, te hará lucir espectacular mientras dominas el juego. Además, su amplia gama de tallas garantiza que encuentres la opción ideal para ti.  No solo es una camiseta de pádel, sino una prenda versátil que puedes combinar con diferentes outfits deportivos y casuales. Ya sea que estés en la cancha o fuera de ella, esta camiseta te brinda estilo y funcionalidad sin compromisos.'),
(29, 'hgf', 'uploads/61QgLQcQ8qL-1685363632895-679793788.png', 33, 'women', '¡Descubre nuestra increíble camiseta de pádel para mujer! Diseñada pensando en tu comodidad y estilo, esta camiseta es perfecta para tus sesiones de juego y entrenamientos. Confeccionada con materiales de alta calidad, te proporcionará una sensación suave y transpirable, manteniéndote fresca y seca durante todo el partido.  Su ajuste perfecto resalta tu figura y te brinda total libertad de movimiento en la pista. El diseño elegante y moderno, combinado con detalles femeninos, te hará lucir espectacular mientras dominas el juego. Además, su amplia gama de tallas garantiza que encuentres la opción ideal para ti.  No solo es una camiseta de pádel, sino una prenda versátil que puedes combinar con diferentes outfits deportivos y casuales. Ya sea que estés en la cancha o fuera de ella, esta camiseta te brinda estilo y funcionalidad sin compromisos.'),
(30, 'fasa', 'uploads/logo-1685366081390-88709760.png', 32, 'women', 'asdasdasddsssssssssssssssssssssssssssssssss');

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

--
-- Volcado de datos para la tabla `productsize`
--

INSERT INTO `productsize` (`id`, `id_product`, `xs`, `s`, `m`, `l`, `xl`, `2xl`) VALUES
(3, 24, '-1', '0', '-1', '27', '-1', '-1'),
(4, 25, '-1', '21', '34', '33', '-1', '-1'),
(5, 26, '22', '4', '-1', '43', '-1', '-1'),
(6, 27, '-1', '232', '-1', '-1', '-1', '32'),
(7, 28, '-1', '44', '-1', '-1', '-1', '-1'),
(8, 29, '-1', '-1', '32', '-1', '-1', '-1'),
(9, 30, '-1', '-1', '-1', '43', '-1', '-1');

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
  `salt` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`admin`, `name`, `phone`, `email`, `user_name`, `age`, `position`, `category`, `dni`, `creation_date`, `years_played`, `experience`, `club`, `password`, `salt`) VALUES
(1, 'Álvaro Fernández Domingo', 666638298, 'alvaro@gmail.com', 'alvarito', '20', 'derecha', '3', '72431736G', '2023-04-19', '5', '', 'central padel', 'e996e49a44f4fde78be2be5a2e3c4607871559210e048087f151b0eda0d2d5e18fc8190ef71180104ed18e4bc9168f4165c351d1b9618775d47165a60ea40508', '0877cf68fa6e986d445c6bfd99fbdf74'),
(0, NULL, 847309573, 'jose@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '4480ed90ba512e03192351dc141ed5ddb132daae98c46e458e912d366822e1f1f93c1583b80a7a1109a5bc179edf5668c9960e2694ed75508c84f8f8e6a541f5', 'af975d3e5486ff1fbf6210320848ea07'),
(0, NULL, 674489367, 'pepe@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '10ade93c01a4d92b9eefcb4739c97711b5017f60e397cb829b76c308bf428cbdc00fbee3010e857bea106b035fdbb7582ddd2c79e1dc4f702317fbf0d9a3cf94', 'd9f78af858cf84f8c0e15cda3dc71ca1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `userdevice`
--

CREATE TABLE `userdevice` (
  `email_user` varchar(255) NOT NULL,
  `name_device` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `userdevice`
--

INSERT INTO `userdevice` (`email_user`, `name_device`) VALUES
('alvaro@gmail.com', 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'),
('alvaro@gmail.com', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36'),
('alvaro@gmail.com', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Mobile Safari/537.36'),
('alvaro@gmail.com', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36'),
('alvaro@gmail.com', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36'),
('alvaro@gmail.com', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36'),
('alvaro@gmail.com', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36'),
('alvaro@gmail.com', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');

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
-- Volcado de datos para la tabla `usermatch`
--

INSERT INTO `usermatch` (`id`, `email_user`, `id_match`) VALUES
(45, 'jose@gmail.com', 41),
(46, 'alvaro@gmail.com', 41),
(47, '', 41),
(48, '', 41),
(77, 'jose@gmail.com', 48),
(78, 'alvaro@gmail.com', 48),
(79, '', 48),
(80, '', 48),
(81, 'alvaro@gmail.com', 56),
(82, '', 56),
(83, '', 56),
(84, '', 56),
(85, 'alvaro@gmail.com', 57),
(86, '', 57),
(87, '', 57),
(88, '', 57),
(89, 'alvaro@gmail.com', 58),
(90, '', 58),
(91, '', 58),
(92, '', 58),
(93, 'alvaro@gmail.com', 59),
(94, '', 59),
(95, '', 59),
(96, '', 59),
(97, 'alvaro@gmail.com', 60),
(98, '', 60),
(99, '', 60),
(100, '', 60),
(101, 'alvaro@gmail.com', 61),
(102, '', 61),
(103, '', 61),
(104, '', 61),
(105, '', 62),
(106, '', 62),
(107, '', 62),
(108, '', 62),
(109, 'alvaro@gmail.com', 63),
(110, '', 63),
(111, '', 63),
(112, '', 63),
(113, '', 64),
(114, '', 64),
(115, '', 64),
(116, '', 64),
(117, 'alvaro@gmail.com', 65),
(118, 'pepe@gmail.com', 65),
(119, '', 65),
(120, '', 65),
(121, 'alvaro@gmail.com', 66),
(122, 'pepe@gmail.com', 66),
(123, '', 66),
(124, '', 66),
(125, 'alvaro@gmail.com', 67),
(126, 'pepe@gmail.com', 67),
(127, '', 67),
(128, '', 67),
(129, 'alvaro@gmail.com', 68),
(130, 'pepe@gmail.com', 68),
(131, '', 68),
(132, '', 68),
(133, 'alvaro@gmail.com', 69),
(134, 'pepe@gmail.com', 69),
(135, '', 69),
(136, '', 69),
(137, 'alvaro@gmail.com', 70),
(138, 'pepe@gmail.com', 70),
(139, '', 70),
(140, '', 70),
(141, '', 71),
(142, '', 71),
(143, '', 71),
(144, '', 71),
(145, '', 72),
(146, '', 72),
(147, '', 72),
(148, '', 72),
(149, '', 73),
(150, '', 73),
(151, '', 73),
(152, '', 73),
(153, '', 74),
(154, '', 74),
(155, '', 74),
(156, '', 74),
(157, '', 75),
(158, '', 75),
(159, '', 75),
(160, '', 75);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `matchs`
--
ALTER TABLE `matchs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT de la tabla `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `productsize`
--
ALTER TABLE `productsize`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `usermatch`
--
ALTER TABLE `usermatch`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=161;

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
