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