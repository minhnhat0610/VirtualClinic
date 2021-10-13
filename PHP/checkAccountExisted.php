<?php
$serverName = 'virtualclinic.cf0ojcdk8osb.us-east-2.rds.amazonaws.com';
$username = 'virtualclinic';
$DBpassword = 'nhat06101998';
$dbName = "virtualclinic";

$email = $_POST['register-email'];

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