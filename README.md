# Angular2,NodeJs and Sql Dashboard

Dashboard :

![Alt text](image/dashboard.PNG?raw=true "dashboard")

Create Contact Details :

![Alt text](image/create_page.PNG?raw=true "Optional Title")

Basic Dashboard feature list:

 * Angular Material Design
 * Bootstrap3
 * D3 Visualization
 * Font Awesome
 * Teradata UI Platform

 ## Usage

  * ### Step 1
  ```
   CREATE DATABASE <DB Name>;

  Example:   CREATE DATABASE personDB;

  USE <DB Name>

  Example: USE personDB

  CREATE TABLE `personslist` (
    `PersonID` int(11) NOT NULL AUTO_INCREMENT,
    `LastName` varchar(255) NOT NULL,
    `FirstName` varchar(255) NOT NULL,
    `Address` varchar(255) NOT NULL,
    `City` varchar(255) NOT NULL,
    PRIMARY KEY (`PersonID`)
  ) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=utf8;
  ```
