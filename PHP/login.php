<?php
require_once('../vendor/autoload.php');

session_start();
$_SESSION['email'] = "";
$_SESSION['password'] = "";

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . "/..", "dbKeys.env");
$dotenv->load();

$serverName = $_ENV['SEVERNAME'];
$username = $_ENV['USERNAME'];;
$DBpassword = $_ENV['DB_SECRET_KEY'];;
$dbName = $_ENV['DB_NAME'];;

$email = $_POST['email'];
$password = $_POST['current-password'];

try{
    $conn = new PDO("mysql:host=$serverName;dbname=$dbName", $username, $DBpassword);        // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    try{
        $checkLogin = $conn->prepare("SELECT Email, Password, UserID From User
        Where Email = :email AND password = :password");

        $checkLogin -> bindParam(':email',$email);
        $checkLogin -> bindParam(':password',$password);

        $checkLogin -> execute();
        $result = $checkLogin->fetch(PDO::FETCH_ASSOC);
        if(empty($result)){
            echo 0;
        }
        else{
            $_SESSION['email'] = $email;
            $_SESSION['password'] = $password;
            $_SESSION['UserID'] = $result['UserID'];
            echo 1;
        }
    }
    catch(exception $e){
        echo "Fail to login: ". $e->getMessage();
    }
}

catch(PDOException $e){
    echo "Connection fail: ". $e->getMessage();
}
?>