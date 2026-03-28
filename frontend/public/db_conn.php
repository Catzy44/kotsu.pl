<?php
$servername = "localhost";
$username = "kotsu";
$password = "Dp]FgkQm883tfSxd";
$dbname = "kotsu";

global $conn;
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

