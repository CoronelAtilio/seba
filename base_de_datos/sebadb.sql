CREATE DATABASE  IF NOT EXISTS `seba` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `seba`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: seba
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alumnos`
--

DROP TABLE IF EXISTS `alumnos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alumnos` (
  `idalumno` int unsigned NOT NULL AUTO_INCREMENT,
  `dni` varchar(15) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `celular` varchar(50) DEFAULT NULL,
  `apellido` varchar(50) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `legajo` varchar(50) NOT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `fk_idcurso` int unsigned DEFAULT NULL,
  PRIMARY KEY (`idalumno`),
  UNIQUE KEY `dni_UNIQUE` (`dni`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `celular_UNIQUE` (`celular`),
  KEY `fk_idcurso_idx` (`fk_idcurso`),
  CONSTRAINT `fk_idcurso_alumnos` FOREIGN KEY (`fk_idcurso`) REFERENCES `cursos` (`idcurso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumnos`
--

LOCK TABLES `alumnos` WRITE;
/*!40000 ALTER TABLE `alumnos` DISABLE KEYS */;
/*!40000 ALTER TABLE `alumnos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cursos`
--

DROP TABLE IF EXISTS `cursos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cursos` (
  `idcurso` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `fk_idpreceptor` int unsigned DEFAULT NULL,
  PRIMARY KEY (`idcurso`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`),
  KEY `fk_idpreceptor` (`fk_idpreceptor`),
  CONSTRAINT `fk_idpreceptor` FOREIGN KEY (`fk_idpreceptor`) REFERENCES `preceptores` (`idpreceptor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cursos`
--

LOCK TABLES `cursos` WRITE;
/*!40000 ALTER TABLE `cursos` DISABLE KEYS */;
/*!40000 ALTER TABLE `cursos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materias`
--

DROP TABLE IF EXISTS `materias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materias` (
  `idmateria` int unsigned NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `fk_idcurso` int unsigned DEFAULT NULL,
  PRIMARY KEY (`idmateria`),
  KEY `fk_idcurso_idx` (`fk_idcurso`),
  CONSTRAINT `fk_idcurso` FOREIGN KEY (`fk_idcurso`) REFERENCES `cursos` (`idcurso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materias`
--

LOCK TABLES `materias` WRITE;
/*!40000 ALTER TABLE `materias` DISABLE KEYS */;
/*!40000 ALTER TABLE `materias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notas`
--

DROP TABLE IF EXISTS `notas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notas` (
  `idnota` int unsigned NOT NULL AUTO_INCREMENT,
  `nota` varchar(45) NOT NULL,
  `fk_idmateria` int unsigned DEFAULT NULL,
  `fk_idalumno` int unsigned DEFAULT NULL,
  `fk_idprofesor` int unsigned DEFAULT NULL,
  PRIMARY KEY (`idnota`),
  KEY `fk_idmateria_idx` (`fk_idmateria`),
  KEY `fk_idalumno_idx` (`fk_idalumno`),
  KEY `fk_idprofesor_idx` (`fk_idprofesor`),
  CONSTRAINT `fk_idalumno_notas` FOREIGN KEY (`fk_idalumno`) REFERENCES `alumnos` (`idalumno`),
  CONSTRAINT `fk_idmateria_notas` FOREIGN KEY (`fk_idmateria`) REFERENCES `materias` (`idmateria`),
  CONSTRAINT `fk_idprofesor_notas` FOREIGN KEY (`fk_idprofesor`) REFERENCES `profesores` (`idprofesor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notas`
--

LOCK TABLES `notas` WRITE;
/*!40000 ALTER TABLE `notas` DISABLE KEYS */;
/*!40000 ALTER TABLE `notas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `preceptores`
--

DROP TABLE IF EXISTS `preceptores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `preceptores` (
  `idpreceptor` int unsigned NOT NULL AUTO_INCREMENT,
  `dni` varchar(15) NOT NULL,
  `email` varchar(50) NOT NULL,
  `celular` varchar(50) DEFAULT NULL,
  `apellido` varchar(50) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `legajo` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `especialidad` varchar(50) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idpreceptor`),
  UNIQUE KEY `idpreceptor_UNIQUE` (`idpreceptor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `preceptores`
--

LOCK TABLES `preceptores` WRITE;
/*!40000 ALTER TABLE `preceptores` DISABLE KEYS */;
/*!40000 ALTER TABLE `preceptores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profesores`
--

DROP TABLE IF EXISTS `profesores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profesores` (
  `idprofesor` int unsigned NOT NULL AUTO_INCREMENT,
  `dni` varchar(15) NOT NULL,
  `email` varchar(50) NOT NULL,
  `celular` varchar(50) DEFAULT NULL,
  `apellido` varchar(50) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `legajo` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `especialidad` varchar(50) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idprofesor`),
  UNIQUE KEY `dni_UNIQUE` (`dni`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `celular_UNIQUE` (`celular`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesores`
--

LOCK TABLES `profesores` WRITE;
/*!40000 ALTER TABLE `profesores` DISABLE KEYS */;
/*!40000 ALTER TABLE `profesores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profesores_alumnos`
--

DROP TABLE IF EXISTS `profesores_alumnos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profesores_alumnos` (
  `idprofesores_alumnos` int unsigned NOT NULL AUTO_INCREMENT,
  `fk_idprofesor` int unsigned DEFAULT NULL,
  `fk_idalumno` int unsigned DEFAULT NULL,
  PRIMARY KEY (`idprofesores_alumnos`),
  UNIQUE KEY `idprofesores_alumnos_UNIQUE` (`idprofesores_alumnos`),
  KEY `fk_idprofesor_idx` (`fk_idprofesor`),
  KEY `fk_idalumno_idx` (`fk_idalumno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesores_alumnos`
--

LOCK TABLES `profesores_alumnos` WRITE;
/*!40000 ALTER TABLE `profesores_alumnos` DISABLE KEYS */;
/*!40000 ALTER TABLE `profesores_alumnos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profesores_materias`
--

DROP TABLE IF EXISTS `profesores_materias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profesores_materias` (
  `idprofesor_materia` int unsigned NOT NULL AUTO_INCREMENT,
  `fk_idmateria` int unsigned DEFAULT NULL,
  `fk_idprofesor` int unsigned DEFAULT NULL,
  PRIMARY KEY (`idprofesor_materia`),
  UNIQUE KEY `idprofesor_materia_UNIQUE` (`idprofesor_materia`),
  KEY `fk_idmateria_idx` (`fk_idmateria`),
  KEY `fk_idprofesor_idx` (`fk_idprofesor`),
  CONSTRAINT `fk_idmateria` FOREIGN KEY (`fk_idmateria`) REFERENCES `materias` (`idmateria`),
  CONSTRAINT `fk_idprofesor` FOREIGN KEY (`fk_idprofesor`) REFERENCES `profesores` (`idprofesor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesores_materias`
--

LOCK TABLES `profesores_materias` WRITE;
/*!40000 ALTER TABLE `profesores_materias` DISABLE KEYS */;
/*!40000 ALTER TABLE `profesores_materias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tutores`
--

DROP TABLE IF EXISTS `tutores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tutores` (
  `fk_idalumno` int unsigned NOT NULL,
  `dni` varchar(15) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `celular` varchar(50) DEFAULT NULL,
  `apellido` varchar(50) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`fk_idalumno`),
  UNIQUE KEY `dni_UNIQUE` (`dni`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `celular_UNIQUE` (`celular`),
  CONSTRAINT `fk_idalumno_tutores` FOREIGN KEY (`fk_idalumno`) REFERENCES `alumnos` (`idalumno`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tutores`
--

LOCK TABLES `tutores` WRITE;
/*!40000 ALTER TABLE `tutores` DISABLE KEYS */;
/*!40000 ALTER TABLE `tutores` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-07 23:52:37
