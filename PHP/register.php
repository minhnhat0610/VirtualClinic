<?php
    $serverName = 'virtualclinic.cf0ojcdk8osb.us-east-2.rds.amazonaws.com';
    $username = 'virtualclinic';
    $DBpassword = 'nhat06101998';
    $dbName = "virtualclinic";

    $email = $_POST['register-email'];
    $password = $_POST['register-password'];
    $firstname = $_POST['register-first-name'];
    $lastname = $_POST['register-last-name'];
    $DOB = $_POST['date-of-birth'];
    $phone = $_POST['register-phone'];
    try{
        $conn = new PDO("mysql:host=$serverName;dbname=$dbName", $username, $DBpassword);        // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        echo "Connected successfully";

       

        
        try{
            // Check if user has already existed

            // Create new user record
            $insertNewUser = $conn -> prepare("INSERT INTO User(Email,Password,FirstName,LastName,DOB,Phone)
            values(:email,:password,:firstname,:lastname,:DOB,:phone)");

            $insertNewUser->bindParam(':email',$email);
            $insertNewUser->bindParam(':password',$password);
            $insertNewUser->bindParam(':firstname',$firstname);
            $insertNewUser->bindParam(':lastname',$lastname);
            $insertNewUser->bindParam(':DOB',$DOB);
            $insertNewUser->bindParam(':phone',$phone);

            $insertNewUser->execute();
            echo "Successfully create new user";


            // Creat new Blood Pressure Record table for new user

        }

        catch(exception $e){
            echo "Fail to create new user: ". $e->getMessage();
        }

    }
    catch(PDOException $e){
        echo "Connection fail: ". $e->getMessage();
    }
?>