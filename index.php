<?php
    session_start();
    include 'header.php';
    
    if (!isset($_SESSION['username'])) {  //checks whether user has logged in
        
       // header("Location: login.php");
        
    }
    
    include 'connection.php';
    $conn = getDatabaseConnection();
    
    if (isset($_GET['addForm'])) {  //admin submitted form to add product
    
  
    $sql = "INSERT INTO user ( username, password, name, email) 
            VALUES ( :username, :password, :name, :email)";
            
    $namedParameters = array();
    $namedParameters[':username'] = $_GET['username'];
    $namedParameters[':password'] = $_GET['password'];
    $namedParameters[':name'] = $_GET['name'];
    $namedParameters[':email'] = $_GET['email'];
  
    $conn = getDatabaseConnection();    
    $statement = $conn->prepare($sql);
    $statement->execute($namedParameters);    
        
    echo "Record has been added!";
    }
?>

<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="styles.css">
        <title>login</title>
    </head>
    <body>
          <div>
              <form>
          
                    username: <input type="text" name="username" /> <br />
                    password: <input type="password" name="password"><br />
                    name: <input type="text" name="name" /> <br />
                    email: <input type="text" name="email" />
                    <br />          
                    <input type="submit" value="Sign up" name="addForm" />
          
              </form>
          </div>
          
    </body>
</html>
   