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
        <link rel="stylesheet" type="text/css" href="styles.css">
        <title>login</title>
    </head>
    <body>
       <!-- <script>
          window.fbAsyncInit = function() {
            FB.init({
              appId            : 'your-app-id',
              autoLogAppEvents : true,
              xfbml            : true,
              version          : 'v2.11'
            });
          };
        
          (function(d, s, id){
             var js, fjs = d.getElementsByTagName(s)[0];
             if (d.getElementById(id)) {return;}
             js = d.createElement(s); js.id = id;
             js.src = "https://connect.facebook.net/en_US/sdk.js";
             fjs.parentNode.insertBefore(js, fjs);
           }(document, 'script', 'facebook-jssdk'));
        </script>-->
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
   