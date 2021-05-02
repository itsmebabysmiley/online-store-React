-- MySQL dump 10.13  Distrib 5.7.32, for Win64 (x86_64)
--
-- Host: localhost    Database: shop_db
-- ------------------------------------------------------
-- Server version	5.7.32-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP DATABASE IF EXISTS `shop_db`;
CREATE DATABASE `shop_db`;
USE `shop_db`;

--
-- Table structure for table `log`
--

DROP TABLE IF EXISTS `log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `log` (
  `username` varchar(255) NOT NULL,
  `logId` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  PRIMARY KEY (`logId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log`
--

LOCK TABLES `log` WRITE;
/*!40000 ALTER TABLE `log` DISABLE KEYS */;
/*!40000 ALTER TABLE `log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product` (
  `pName` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `detail` longtext,
  `Image` varchar(255) DEFAULT NULL,
  `pId` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(45) NOT NULL,
  PRIMARY KEY (`pId`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES ('Kodak Color Plus 200',115.00,'ISO 200','https://github.com/itsmebabysmiley/Online-shopping/blob/main/image/products/%23P2Film/kodakcolorplas200.PNG?raw=true',1,'film'),('Kodak Gold 200',190.00,'ISO 200','https://github.com/itsmebabysmiley/Online-shopping/blob/main/image/products/%23P2Film/KodakGold200.PNG?raw=true',2,'film'),('Kodak Portra 160',350.00,'ISO 160','https://github.com/itsmebabysmiley/Online-shopping/blob/main/image/products/%23P2Film/KodakPortra160.PNG?raw=true',3,'film'),('Kodak Ultramax 400',190.00,'ISO 400','https://github.com/itsmebabysmiley/Online-shopping/blob/main/image/products/%23P2Film/KodakUltramax400.PNG?raw=true',4,'film'),('Fujifilm Fujicolor C200',180.00,'ISO 200','https://github.com/itsmebabysmiley/Online-shopping/blob/main/image/products/%23P2Film/Fuji200.PNG?raw=true',5,'film'),('Fujifilm Fujicolor 100',175.00,'ISO 100','https://github.com/itsmebabysmiley/Online-shopping/blob/main/image/products/%23P2Film/Fuji100.PNG?raw=true',6,'film'),('tomorrow never knows',180.00,'Artist: Mr.Children','https://github.com/itsmebabysmiley/Online-shopping/blob/main/image/products/%23P2CassetteTape/tmrneverknow.PNG?raw=true',7,'cassette'),('Love Story wa totsuzen ni',190.00,'Artist: Kazumasa Oda','https://github.com/itsmebabysmiley/Online-shopping/blob/main/image/products/%23P2CassetteTape/lovestory.PNG?raw=true',8,'cassette'),('Season Change',190.00,'Artist: Boyd Kosiyabong','https://github.com/itsmebabysmiley/Online-shopping/blob/main/image/products/%23P2CassetteTape/seasonchange.PNG?raw=true',9,'cassette'),('Crying Over You',240.00,'Artist: HONNE, BEKA','https://github.com/itsmebabysmiley/Online-shopping/blob/main/image/products/%23P2CassetteTape/cryingoveryou.PNG?raw=true',10,'cassette'),('Im so tired',180.00,'Artist: Lauv & Troye','https://github.com/itsmebabysmiley/Online-shopping/blob/main/image/products/%23P2CassetteTape/imsotired.PNG?raw=true',11,'cassette'),('Reforget',180.00,'Artist: Lauv','https://github.com/itsmebabysmiley/Online-shopping/blob/main/image/products/%23P2CassetteTape/reforget.PNG?raw=true',12,'cassette'),('I like me better',180.00,'Artist: Lauv','https://github.com/itsmebabysmiley/Online-shopping/blob/main/image/products/%23P2CassetteTape/ilikemebetter.png?raw=true',13,'cassette'),('Never Be Alone',190.00,'Artist: Shawn Mendes','https://github.com/itsmebabysmiley/Online-shopping/blob/main/image/products/%23P2CassetteTape/neverbalone.PNG?raw=true',14,'cassette'),('EASE',200.00,'Artist: Troye Sivan','https://github.com/itsmebabysmiley/Online-shopping/blob/main/image/products/%23P2CassetteTape/ease.PNG?raw=true',15,'cassette'),('willow',240.00,'Artist: Taylor Swift','https://github.com/itsmebabysmiley/Online-shopping/blob/main/image/products/%23P2CassetteTape/willow.PNG?raw=true',16,'cassette'),('more',230.00,'Artist: keshi','https://github.com/itsmebabysmiley/Online-shopping/blob/main/image/products/%23P2CassetteTape/more.PNG?raw=true',17,'cassette'),('Hello, Anxiety',220.00,'Artist: Phum Viphurit','https://github.com/itsmebabysmiley/Online-shopping/blob/main/image/products/%23P2CassetteTape/helloanxiety.PNG?raw=true',18,'cassette'),('more than words',270.00,'Artist: Extreme','https://github.com/itsmebabysmiley/Online-shopping/blob/main/image/products/%23P2Vinyl/morethanword.PNG?raw=true',19,'vinyl'),('Ohayo Tokyo',270.00,'Artist: pra1.film','https://github.com/itsmebabysmiley/Online-shopping/blob/main/image/products/%23P2Vinyl/helloTokyo.PNG?raw=true',20,'vinyl'),('Hikari',290.00,'Artist: RADWIMPS','https://github.com/itsmebabysmiley/Online-shopping/blob/main/image/products/%23P2Vinyl/hikari.PNG?raw=true',21,'vinyl'),('Lemon',240.00,'Artist: Kenshi Yonezu','https://github.com/itsmebabysmiley/Online-shopping/blob/main/image/products/%23P2Vinyl/lemon.PNG?raw=true',22,'vinyl'),('September san',330.00,'Artist: Aimer','https://github.com/itsmebabysmiley/Online-shopping/blob/main/image/products/%23P2Vinyl/septembersan.PNG?raw=true',23,'vinyl'),('Will',280.00,'Artist: TRUE','https://github.com/itsmebabysmiley/Online-shopping/blob/main/image/products/%23P2Vinyl/will.PNG?raw=true',24,'vinyl'),('Dry flower',240.00,'Artist: Yuuri ','https://github.com/itsmebabysmiley/Online-shopping/blob/main/image/products/%23P2Vinyl/dryflower.PNG?raw=true',25,'vinyl'),('Folktale',290.00,'Artist: Mrs.GREEN APPLE','https://github.com/itsmebabysmiley/Online-shopping/blob/main/image/products/%23P2Vinyl/folktale.PNG?raw=true',26,'vinyl'),('On a Cherry Blossom Night',300.00,'Artist: Aimyon','https://github.com/itsmebabysmiley/Online-shopping/blob/main/image/products/%23P2Vinyl/OnaCherryBlossomNight.PNG?raw=true',27,'vinyl'),('After Rain',280.00,'Artist: Aimer','https://github.com/itsmebabysmiley/Online-shopping/blob/main/image/products/%23P2Vinyl/AfterRain.PNG?raw=true',28,'vinyl'),('Tipsy',240.00,'Artist: wanuka','https://github.com/itsmebabysmiley/Online-shopping/blob/main/image/products/%23P2Vinyl/tipsy.PNG?raw=true',29,'vinyl'),('Kimitonara',240.00,'Artist: Kana Adachi & wacci','https://github.com/itsmebabysmiley/Online-shopping/blob/main/image/products/%23P2Vinyl/kinitonara.PNG?raw=true',30,'vinyl'),('Leave the Door Open',450.00,'The official music video for Bruno Mars, Anderson .Paak, Silk Sonic\'s new single \'Leave the Door Open\'','https://github.com/itsmebabysmiley/Online-shopping/blob/main/image/products/Vinyl2.png?raw=true',31,'vinyl');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `ufname` varchar(255) NOT NULL,
  `ulname` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT 'none',
  `age` int(11) DEFAULT '0',
  `address` longtext,
  `role` varchar(45) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('nopparat','pengsuk','aaaaa','$2b$12$z88G8y/rKMqyt3llvb8Eqehrk1iHMqKTAzsD.62AIAnWyEnXWNyrO','a@gmail.com',19,'a','user'),('baby','baby','baby','$2b$12$E2z8AO0mZ5LC1z2ZrwukwuydFDNHCjMkRS/VcaOyYeBEDAbp1YG3G','a@gmail.com',12,'none','user'),('baby','baby','god','$2b$12$0MBgxcMwVz/rL4sOEhf3Te6Xer8Ary/zTNs6x1GeLHBrmFqUV7WSm',NULL,NULL,NULL,'admin'),('John','Smith','john','$2b$12$hKVpRq5/kER6HbAjkq6OROHHTmXxDcDBu7gqg/E5wJjl.8jjxNMhO','john1234@ismyemail.com',33,'none','admin'),('Payut','Chaochr','payut','$2b$12$J92UBPN2I30VXJafQiIzk.0HBzx/RSh6EWOn.Ks3VEOESLpQZAa9e','payut@mail.com',63,'none','admin'),('Nopparat','Pengsuk','salimbaby','$2b$12$wrY5AeQQ0y/xURgAQm0b4.XyljJifJ9PmhkZuMVRrT6JP/IY3YIf.','baby@gmail.com',19,'none','user'),('nopparat','pengsuk','zzz','$2b$12$AsSdXd1mI.YRzS7sqQaegu9qD106V3AvNML4pzOPZ5c2sqRhGGUu2','a@gmail.com',19,'a','user');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-17 11:53:11
