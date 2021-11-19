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

function getUserTable($userID){
    return "User" . $userID . "BP_Record";
}

try{
    $conn = new PDO("mysql:host=$serverName;dbname=$dbName", $username, $DBpassword);        // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    try{
        $tableName = getUserTable($userID);
        $sql = "SELECT Sys, Dia, Pulse, Result, DATE_FORMAT(date, \"%m/%d/%Y\") as Date 
         From $tableName 
         order by RecordID";

        $loadRecord = $conn -> prepare($sql);
        $loadRecord -> execute();
        $result = $loadRecord ->fetchAll();

        echo json_encode($result);
    }

    catch(exception $e){
        echo "Fail to create new record: ". $e->getMessage();
    }
}

catch(PDOException $e){
    echo "Connection fail: ". $e->getMessage();
}
?>