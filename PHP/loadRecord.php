<?php
session_start();
$serverName = 'virtualclinic.cf0ojcdk8osb.us-east-2.rds.amazonaws.com';
$username = 'virtualclinic';
$DBpassword = 'nhat06101998';
$dbName = "virtualclinic";

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