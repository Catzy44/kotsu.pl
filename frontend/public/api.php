<?php

include 'db_conn.php';

global $conn;

if($_GET['a'] == "client_messages") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $content = $_POST['content'];

    $conn->query("INSERT INTO client_messages (name,email,content) VALUES ('$name','$email','$content')");
}

$conn->close();

?>