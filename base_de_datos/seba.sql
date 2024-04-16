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
  `idalumno` int NOT NULL AUTO_INCREMENT,
  `dni` varchar(15) NOT NULL,
  `email` varchar(200) DEFAULT NULL,
  `celular` varchar(15) DEFAULT NULL,
  `apellido` varchar(100) DEFAULT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `legajo` varchar(45) DEFAULT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `fk_idcurso_alumno` int DEFAULT NULL,
  `fk_idtutor_alumno` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idalumno`),
  UNIQUE KEY `dni_UNIQUE` (`dni`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `celular_UNIQUE` (`celular`),
  UNIQUE KEY `legajo_UNIQUE` (`legajo`),
  KEY `fk_idcurso_idx` (`fk_idcurso_alumno`),
  KEY `fk_idtutor_alumno_idx` (`fk_idtutor_alumno`),
  CONSTRAINT `fk_idcurso_alumno` FOREIGN KEY (`fk_idcurso_alumno`) REFERENCES `cursos` (`idcurso`),
  CONSTRAINT `fk_idtutor_alumno` FOREIGN KEY (`fk_idtutor_alumno`) REFERENCES `tutores` (`idtutor`)
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
-- Table structure for table `alumnos_materias`
--

DROP TABLE IF EXISTS `alumnos_materias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alumnos_materias` (
  `idalumno_materia` int NOT NULL AUTO_INCREMENT,
  `fk_idalumno_alumnomateria` int DEFAULT NULL,
  `fk_idmateria_alumnomateria` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idalumno_materia`),
  KEY `fk_idalumno_alumnomateria_idx` (`fk_idalumno_alumnomateria`),
  KEY `fk_idmateria_alumnomateria_idx` (`fk_idmateria_alumnomateria`),
  CONSTRAINT `fk_idalumno_alumnomateria` FOREIGN KEY (`fk_idalumno_alumnomateria`) REFERENCES `alumnos` (`idalumno`),
  CONSTRAINT `fk_idmateria_alumnomateria` FOREIGN KEY (`fk_idmateria_alumnomateria`) REFERENCES `materias` (`idmateria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumnos_materias`
--

LOCK TABLES `alumnos_materias` WRITE;
/*!40000 ALTER TABLE `alumnos_materias` DISABLE KEYS */;
/*!40000 ALTER TABLE `alumnos_materias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cargos`
--

DROP TABLE IF EXISTS `cargos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cargos` (
  `idcargo` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`idcargo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cargos`
--

LOCK TABLES `cargos` WRITE;
/*!40000 ALTER TABLE `cargos` DISABLE KEYS */;
/*!40000 ALTER TABLE `cargos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cursos`
--

DROP TABLE IF EXISTS `cursos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cursos` (
  `idcurso` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`idcurso`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cursos`
--

LOCK TABLES `cursos` WRITE;
/*!40000 ALTER TABLE `cursos` DISABLE KEYS */;
INSERT INTO `cursos` VALUES (1,'Curso de Matemáticas'),(2,'Curso de Historia del Arte'),(3,'Curso de Programación en Python'),(4,'Curso de Marketing Digital'),(5,'Curso de Inglés Avanzado');
/*!40000 ALTER TABLE `cursos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materias`
--

DROP TABLE IF EXISTS `materias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materias` (
  `idmateria` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `fk_idcurso_materia` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idmateria`),
  KEY `fk_idcurso_idx` (`fk_idcurso_materia`),
  CONSTRAINT `fk_idcurso_materia` FOREIGN KEY (`fk_idcurso_materia`) REFERENCES `cursos` (`idcurso`)
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
  `idnota` int NOT NULL AUTO_INCREMENT,
  `nota1` decimal(10,2) DEFAULT NULL,
  `nota2` decimal(10,2) DEFAULT NULL,
  `fk_idmateria_nota` int DEFAULT NULL,
  `fk_idalumno_nota` int DEFAULT NULL,
  `fk_idprofesor_nota` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idnota`),
  KEY `fk_idmateria_nota_idx` (`fk_idmateria_nota`),
  KEY `fk_idalumno_nota_idx` (`fk_idalumno_nota`),
  KEY `fk_idprofesor_nota_idx` (`fk_idprofesor_nota`),
  CONSTRAINT `fk_idalumno_nota` FOREIGN KEY (`fk_idalumno_nota`) REFERENCES `alumnos` (`idalumno`),
  CONSTRAINT `fk_idmateria_nota` FOREIGN KEY (`fk_idmateria_nota`) REFERENCES `materias` (`idmateria`),
  CONSTRAINT `fk_idprofesor_nota` FOREIGN KEY (`fk_idprofesor_nota`) REFERENCES `profesores` (`idprofesor`)
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
-- Table structure for table `profesores`
--

DROP TABLE IF EXISTS `profesores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profesores` (
  `idprofesor` int NOT NULL AUTO_INCREMENT,
  `dni` varchar(15) NOT NULL,
  `email` varchar(200) NOT NULL,
  `celular` varchar(15) DEFAULT NULL,
  `apellido` varchar(100) DEFAULT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `legajo` varchar(45) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `fk_idcargo_profesor` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idprofesor`),
  UNIQUE KEY `dni_UNIQUE` (`dni`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `celular_UNIQUE` (`celular`),
  UNIQUE KEY `legajo_UNIQUE` (`legajo`),
  KEY `fk_idcargo_idx` (`fk_idcargo_profesor`),
  CONSTRAINT `fk_idcargo_profesor` FOREIGN KEY (`fk_idcargo_profesor`) REFERENCES `cargos` (`idcargo`)
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
  `idprofesor_alumno` int NOT NULL AUTO_INCREMENT,
  `fk_idprofesor_profesoralumno` int DEFAULT NULL,
  `fk_idalumno_profesoralumno` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idprofesor_alumno`),
  KEY `fk_idprofesor_profesoralumno_idx` (`fk_idprofesor_profesoralumno`),
  KEY `fk_idalumno_profesoralumno_idx` (`fk_idalumno_profesoralumno`),
  CONSTRAINT `fk_idalumno_profesoralumno` FOREIGN KEY (`fk_idalumno_profesoralumno`) REFERENCES `alumnos` (`idalumno`),
  CONSTRAINT `fk_idprofesor_profesoralumno` FOREIGN KEY (`fk_idprofesor_profesoralumno`) REFERENCES `profesores` (`idprofesor`)
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
-- Table structure for table `profesores_cursos`
--

DROP TABLE IF EXISTS `profesores_cursos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profesores_cursos` (
  `idprofesor_curso` int NOT NULL AUTO_INCREMENT,
  `fk_idprofesor_profesorcurso` int DEFAULT NULL,
  `fk_idcurso_profesorcurso` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idprofesor_curso`),
  KEY `fk_profesor_profesorcurso_idx` (`fk_idprofesor_profesorcurso`),
  KEY `fk_curso_profesorcurso_idx` (`fk_idcurso_profesorcurso`),
  CONSTRAINT `fk_curso_profesorcurso` FOREIGN KEY (`fk_idcurso_profesorcurso`) REFERENCES `cursos` (`idcurso`),
  CONSTRAINT `fk_profesor_profesorcurso` FOREIGN KEY (`fk_idprofesor_profesorcurso`) REFERENCES `profesores` (`idprofesor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesores_cursos`
--

LOCK TABLES `profesores_cursos` WRITE;
/*!40000 ALTER TABLE `profesores_cursos` DISABLE KEYS */;
/*!40000 ALTER TABLE `profesores_cursos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profesores_materias`
--

DROP TABLE IF EXISTS `profesores_materias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profesores_materias` (
  `idprofesor_materia` int NOT NULL AUTO_INCREMENT,
  `fk_idmateria_profesormateria` int DEFAULT NULL,
  `fk_idprofesor_profesormateria` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idprofesor_materia`),
  KEY `fk_idmateria_profesormateria_idx` (`fk_idmateria_profesormateria`),
  KEY `fk_idprofesor_profesormateria_idx` (`fk_idprofesor_profesormateria`),
  CONSTRAINT `fk_idmateria_profesormateria` FOREIGN KEY (`fk_idmateria_profesormateria`) REFERENCES `materias` (`idmateria`),
  CONSTRAINT `fk_idprofesor_profesormateria` FOREIGN KEY (`fk_idprofesor_profesormateria`) REFERENCES `profesores` (`idprofesor`)
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
  `idtutor` int NOT NULL AUTO_INCREMENT,
  `dni` varchar(15) NOT NULL,
  `email` varchar(200) DEFAULT NULL,
  `celular` varchar(15) DEFAULT NULL,
  `apellido` varchar(100) DEFAULT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idtutor`),
  UNIQUE KEY `dni_UNIQUE` (`dni`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `celular_UNIQUE` (`celular`)
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

-- Dump completed on 2024-04-16  0:49:23
