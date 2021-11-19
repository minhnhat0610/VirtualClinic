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
$firstname = $_POST['first-name'];
$lastname = $_POST['last-name'];
$email = $_POST['email'];
$dob = $_POST['dob'];
$phone = $_POST['phone-number'];
try{
    $conn = new PDO("mysql:host=$serverName;dbname=$dbName", $username, $DBpassword);        // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    try{
        $updateInfor = $conn -> prepare("UPDATE User
        SET FirstName = :firstname, LastName = :lastname, Email = :email, DOB = :dob, Phone = :phone
        Where UserID = :userID");
        $updateInfor -> bindParam(':firstname', $firstname);
        $updateInfor -> bindParam(':lastname', $lastname);
        $updateInfor -> bindParam(':email', $email);
        $updateInfor -> bindParam(':dob', $dob);
        $updateInfor -> bindParam(':phone', $phone);
        $updateInfor -> bindParam(':userID', $userID);

        if($updateInfor->execute()){
            echo 'Change has been made successfully!';
        };
    }

    catch(exception $e){
        echo "Fail to update account information: ". $e->getMessage();
    }

}
catch(PDOException $e){
    echo "Connection fail: ". $e->getMessage();
}

?>