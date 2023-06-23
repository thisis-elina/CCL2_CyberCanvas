-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 23, 2023 at 04:09 PM
-- Server version: 8.0.33-0ubuntu0.22.04.2
-- PHP Version: 8.1.2-1ubuntu2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ElinasDatabase`
--

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int NOT NULL,
  `title` varchar(80) NOT NULL,
  `description` varchar(1024) NOT NULL,
  `userID` int NOT NULL,
  `views` int DEFAULT '1',
  `upvotes` varchar(255) DEFAULT '',
  `time` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `title`, `description`, `userID`, `views`, `upvotes`, `time`) VALUES
(13, 'Seeking Feedback on \'Code Meets Canvas\'', 'Hey CyberCanvas community! I\'ve created an interactive art installation called \"Code Meets Canvas\" combining technology and creativity. Looking for feedback on the visual experience, interactivity, technical improvements, and interpretation. Share your thoughts!', 46, 1, '', '2023-06-21 19:31:55'),
(14, 'Help Needed with Colour Palette Selection', 'Heyo designers, I\'m struggling to choose the perfect color palette for a creative portfolio app. Seeking advice on effective palettes, balancing vibrancy and subtlety, and recommended tools/resources. Share your insights!', 46, 1, '', '2023-06-21 21:03:59'),
(15, 'Real-Time Image Processing. HELP!!!!!1', 'Calling all tech wizards of CyberCanvas! Help needed in optimizing computationally intensive algorithms for real-time image processing. Share your techniques, tips, and recommended tools to achieve seamless performance without sacrificing visual quality. Let\'s conquer this challenge together!', 50, 1, '', '2023-06-22 19:20:11'),
(16, 'Balancing aesthetics and functionality', 'Hey fellow creatives! I\'ve been working as a UX designer for a while now, and I\'m constantly faced with the challenge of finding the right balance between aesthetics and functionality. I\'d love to hear your thoughts and experiences on how you approach your dilemas.\nupdate: you are not very helpful', 52, 1, '', '2023-06-22 23:02:46'),
(18, 'dfcd', 'dswadss', 54, 1, '', '2023-06-23 09:12:14');

-- --------------------------------------------------------

--
-- Table structure for table `reply`
--

CREATE TABLE `reply` (
  `id` int NOT NULL,
  `postID` int NOT NULL,
  `comment` varchar(5000) NOT NULL,
  `userID` int NOT NULL,
  `time` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `reply`
--

INSERT INTO `reply` (`id`, `postID`, `comment`, `userID`, `time`) VALUES
(14, 13, 'yhgtjnygnjg', 46, '2023-06-21 21:04:25'),
(15, 13, 'fdbvvbfgbgv', 46, '2023-06-21 21:07:29'),
(18, 15, 'noice', 50, '2023-06-22 21:10:44'),
(19, 13, 'kinda very mid if you ask me', 52, '2023-06-22 23:08:45');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userID` int NOT NULL,
  `userName` varchar(32) NOT NULL,
  `userPassword` varchar(128) NOT NULL,
  `userEmail` varchar(256) NOT NULL,
  `userRole` varchar(32) NOT NULL DEFAULT 'user',
  `userBio` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `userName`, `userPassword`, `userEmail`, `userRole`, `userBio`) VALUES
(31, 'ello', '$2b$10$5OPx4Yy3i/ramGs5h2tUxOJ33bRWdlOtz8LXCdwi883J4BmmuoLfi', 'ello', 'user', NULL),
(32, 'dave', '$2b$10$FOm9WTKRYUo3wMnVh5Zcz.S0GViZHnuOwr3jyAWs.PSU4FKH5q.TG', 'dave', 'user', NULL),
(33, 'dave1', '$2b$10$RgjkBMfRTZiY9CjmHlTKcuoZoeoOjhrS/rhtGPw6sgcQ/.L106bPG', 'dave1', 'user', NULL),
(34, 'dave12', '$2b$10$S69YlewLNKb6U7KbDMTkiONbJLNSaQY7/2QAVvdLEBi5TpiEgAOvW', 'dave12', 'user', NULL),
(36, 'dave123', '$2b$10$deQ4YSwFeLz0228KaCtAn.Vhf/6.ltFm.1GhzEOW7yG4KeXqwiuKe', 'dave123', 'user', NULL),
(37, 'dave1234', '$2b$10$WzriGwSC2fPiSMh8Yd6Mveo2wavFLT0gA5Bkg6zAkkKFMe65jL5fO', 'dave1234', 'user', NULL),
(38, 'dave12345', '$2b$10$MgrnGZfRzrgbxdO8.RGqmerB2f/ENpYBzzdi9a.uI4UaHidKsa4BO', 'dave12345', 'user', NULL),
(39, 'fuyo', '$2b$10$l/9igAeFxE/dGH7UHxq0TuGd.JLauq.DlHtlNPx0yihbqBoK2hO2K', 'fuyo', 'user', NULL),
(40, '420', '$2b$10$ow5mgfoPDkTDAxeH96Su9e29dGFV5IdMsRDgZNfBV3ZiL6e6lljRy', '420', 'user', NULL),
(41, 'tyu', '$2b$10$9d8gRRQ9Qh0.hLVcIJCUoeGvZ.b4iXIB1bCy0iUhKHyUPtZgO3Kaq', 'ytu', 'user', NULL),
(46, 'Pr0gramm3dArt', '$2b$10$v9CnAq1.PNRyePylHDNMiuQ0xNwxauLpUtE3H9IAp3ZX8JGWBuUL2', 'test', 'user', 'nicw'),
(47, 'test2', '$2b$10$j38kOdiiV.k5z3zrhXUy2.QGOdN0Mn9afzTEUGWVVwZ0YYYB8NOXq', 'test2', 'user', NULL),
(50, 'T3chn0Cr34t1v3', '$2b$10$uZb1sd36KmG8bfS6zr4tNOd8g3.7IArB0wyHkpUCXIy/0ezv9V9xu', 'T3chn0Cr34t1v3', 'user', 'T3chn0Cr34t1v3'),
(51, 'N30Cyb3r5cr1b3', '$2b$10$lseciJvA4OHs.1yV/0DYhenIgss4TqvIcA4UuP0iSTPglzP9gU5a2', 'neocyberscribe21@gmail.com', 'user', NULL),
(52, 'D3signM4trix', '$2b$10$Q843/zml46LZfGF47njb4uTUk69opN3r7r8daZtXE1ouFXFp1Kite', '1', 'user', 'embrace the m4trix'),
(54, 'weep', '$2b$10$ZwTvJnUdLZKTY.jW/OYM7eaABt5PG.Pg1NV9zbTBZmDkqI.L3DIbu', 'weep', 'user', NULL),
(55, 'crai', '$2b$10$Jyy6bRpcF7E9/4ss9BazN.BPNmy7rR.9YTIpMMn/oV3hoj8xi6bLS', 'crai', 'user', ' big bobby anime goth gf'),
(57, 'test', '$2b$10$akaJY6NJPZB.7kmVJzLucuUQLwyzh/EEkR5meNn/9xXXNhT8bu996', 'average', 'user', NULL),
(58, 'elena', '$2b$10$E7dEnza1F8rC.YcePBn2ROfHcQkq3eNORCDEc.ukKZASr5uCOswgK', 'elena', 'user', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `author_post_foreign_key` (`userID`);

--
-- Indexes for table `reply`
--
ALTER TABLE `reply`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reply_post_author` (`userID`),
  ADD KEY `reply_post` (`postID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`),
  ADD UNIQUE KEY `userName` (`userName`),
  ADD UNIQUE KEY `userEmail` (`userEmail`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `reply`
--
ALTER TABLE `reply`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `author_post_foreign_key` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `reply`
--
ALTER TABLE `reply`
  ADD CONSTRAINT `reply_post` FOREIGN KEY (`postID`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reply_post_author` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
