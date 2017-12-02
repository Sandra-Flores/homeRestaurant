<?php

function getDatabaseConnection()
{
    //Connect to the database
    $host = process.env.DB_HOST;
    $user = process.env.DB_USER;                      //Your Cloud 9 username
    $pass = process.env.DB_PASS;                                  //Remember, there is NO password by default!
    $db = "HomeRestaurant";                       //Your database name you want to connect to
    $port = 3306;                                //The port #. It is always 3306
    
    $connection = mysqli_connect($host, $user, $pass, $db, $port)or die(mysql_error());
    //$dbConn = new PDO("mysql:host=$host;dbname=$db;port=$port", $user, $pass);
    //$dbConn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    //return $dbConn;
    return $connection;
}

function getDataBySQL($sql)
{
    global $conn;
    $statement = $conn->prepare($sql);
    $record = $statement->fetch_all(PDO::FETCH_ASSOC);
    return $record;
}


?>