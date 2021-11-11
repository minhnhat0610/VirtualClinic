<?php 
session_start();
$serverName = 'virtualclinic.cf0ojcdk8osb.us-east-2.rds.amazonaws.com';
$username = 'virtualclinic';
$DBpassword = 'nhat06101998';
$dbName = "virtualclinic";

$userID = $_SESSION['UserID'];

try{
    $conn = new PDO("mysql:host=$serverName;dbname=$dbName", $username, $DBpassword);        // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    try{
        $getAccInfor = $conn -> prepare("SELECT FirstName, LastName, Email, DATE_FORMAT(DOB, \"%m/%d/%Y\") as DOB, Phone
        From User
        Where UserID = :UserID");
        $getAccInfor -> bindParam(':UserID', $userID);
        $getAccInfor -> execute();
        $result = $getAccInfor -> fetchAll();

        echo json_encode($result);
    }

    catch(exception $e){
        echo "Fail to fetch account information: ". $e->getMessage();
    }

}
catch(PDOException $e){
    echo "Connection fail: ". $e->getMessage();
}

?>