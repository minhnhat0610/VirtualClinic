<?php
session_start();
$serverName = 'virtualclinic.cf0ojcdk8osb.us-east-2.rds.amazonaws.com';
$username = 'virtualclinic';
$DBpassword = 'nhat06101998';
$dbName = "virtualclinic";

$userID = $_SESSION['UserID'];
$newPass = $_POST['new-pass-1'];

try{
    $conn = new PDO("mysql:host=$serverName;dbname=$dbName", $username, $DBpassword);        // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    try{
       $passChange = $conn -> prepare("UPDATE User
        Set Password = :password
       Where UserID = :userID");

       $passChange -> bindParam(":password", $newPass);
       $passChange -> bindParam(":userID",$userID);

       if($passChange -> execute()){
           $_SESSION['password'] = $newPass;
           echo 'Sucessfully change password!';
       }
    }

    catch(exception $e){
        echo "Fail to update account information: ". $e->getMessage();
    }

}
catch(PDOException $e){
    echo "Connection fail: ". $e->getMessage();
}

?>