<?php 
session_start(); //start or resume an existing session 


include 'connection.php'; 

$connection = getDatabaseConnection(); 

if (isset($_POST['loginForm'])) { //checks whether user submitted the form 
     
    $username = $_POST['username']; 
    // $password = sha1($_POST['password']);  //hash("sha1", $_POST['password']) 
    $password = $_POST['password'];
    //echo "password:" . $password;
     
    $sql = "SELECT *  
            FROM user 
            WHERE username = '$username' 
            AND password = '$password'";  //Not preventing SQL Injection 
             

    /*$sql = "SELECT *  
            FROM admin 
            WHERE username = :username 
            AND password = :password";  //Preventing SQL Injection */
             
    $namedParameters = array(); 
    $namedParameters[':username'] = $username;                 
    $namedParameters[':password'] = $password;          
     
     
    // var_dump($connection);
    //$statement = $connection->prepare($sql);  
    //$statement->execute($namedParameters); 
    //$record = $statement->fetch(PDO::FETCH_ASSOC); 
    $record = mysqli_query($connection, $sql);
     
   /* if (empty($record)) { //wrong username or password 
         
        echo "Wrong username or password!"; 
         
    } else { 
         
        //$_SESSION['username'] = $record['username']; 
        //$_SESSION['adminName'] = $record['firstName'] . " " . $record['lastName']; 
        //echo "hello world";
        header("Location: teams.php"); 
                 
    } */
    
    if(!$row = mysqli_fetch_assoc($record))
    {
        echo "Wrong username or password!"; 
    }
    else
    {
        //$_SESSION['username'] = $record['username']; 
        //$_SESSION['adminName'] = $record['firstName'] . " " . $record['lastName']; 
        //echo "hello world";
        header("Location: https://home-restaurant-miguelfletes.c9users.io/"); exit;
    }
     

     
} 




?>