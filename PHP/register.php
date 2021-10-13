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
        echo "\n";

       

        
        try{
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
            echo "\n";

            // Get UserID
            $getUserID = $conn -> prepare("SELECT UserID from User
             where Email = :email");
            $getUserID ->bindParam(':email',$email);
            $getUserID->execute();
            $UserID = $getUserID->fetch(PDO::FETCH_ASSOC);

            // Create new Blood Pressure Record table for new user
            $tableName = "User". $UserID['UserID'] . 'BP_Record';

            echo $tableName;
            $preparedSql = "CREATE TABLE $tableName(
                RecordID int primary key auto_increment,
                Sys smallint,
                Dia smallint,
                Pulse smallint, 
                Result tinytext,
                Date datetime,
                UserID int,
                foreign key (UserID) references User(UserID)
                )";

            $createRecordTable = $conn -> prepare($preparedSql);

            $createRecordTable->execute();
            echo "Successfully create new record table";
        }

        catch(exception $e){
            echo "Fail to create new user: ". $e->getMessage();
        }

    }
    catch(PDOException $e){
        echo "Connection fail: ". $e->getMessage();
    }
?>