<?php
session_start();
require_once('../vendor/autoload.php');

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . "/..", "dbKeys.env");
$dotenv->load();

$serverName = $_ENV['SEVERNAME'];
$username = $_ENV['USERNAME'];;
$DBpassword = $_ENV['DB_SECRET_KEY'];;
$dbName = $_ENV['DB_NAME'];

$userID = $_SESSION['UserID'];

$sys = $_POST['sys'];
$dia = $_POST['dia'];
$pulse = $_POST['pulse'];
$result = $_POST['result'];
$date = $_POST['date'];

function getUserTable($userID){
     return "User" . $userID . "BP_Record";
 }
 try{
    $conn = new PDO("mysql:host=$serverName;dbname=$dbName", $username, $DBpassword);        // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    try{
        $tableName = getUserTable($userID);
        $sql = "INSERT INTO $tableName(Sys,Dia,Pulse,Result,Date,UserID) 
        Values($sys, $dia, $pulse, \"$result\", \"$date\", $userID)";

        $writeRecord = $conn -> prepare($sql);
       
        if($writeRecord -> execute()){
            echo 1;
        }

        else{
            echo 0;
        }

    }

    catch(exception $e){
        echo "Fail to create new record: ". $e->getMessage();
    }
}

catch(PDOException $e){
    echo "Connection fail: ". $e->getMessage();
}

?>