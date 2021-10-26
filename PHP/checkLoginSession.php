<?php
session_start();
    if(empty($_SESSION['email']) || empty($_SESSION['password']) || empty($_SESSION['UserID'])){
        echo 0;
    }
    else{
        echo 1;
    }
?>