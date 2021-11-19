<?php
require_once('../vendor/autoload.php');

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . "/..", "dbKeys.env");
$dotenv->load();

$serverName = $_ENV['SEVERNAME'];
$username = $_ENV['USERNAME'];;
$DBpassword = $_ENV['DB_SECRET_KEY'];;
$dbName = $_ENV['DB_NAME'];

try{
    $conn = new PDO("mysql:host=$serverName;dbname=$dbName", $username, $DBpassword);        // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    try{
        $checkAcc = $conn -> prepare("SELECT UserID from User
         where Email = :email");
        
        $checkAcc -> bindParam(':email',$email);
        $checkAcc -> execute();

        $result = $checkAcc -> fetch(PDO::FETCH_ASSOC);
        if($result!=false){
            echo 'exsited';
        }
        else{
            echo 'available';
        }
    }

    catch(exception $e){
        echo "Fail to find user: ". $e->getMessage();
    }


}

catch(PDOException $e){
    echo "Connection fail: ". $e->getMessage();
}

?>