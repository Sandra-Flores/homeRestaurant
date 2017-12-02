<head>
<meta charset="UTF-8">
<title>header</title>  
<link type="text/css" rel="stylesheet" href="css/styles2.css"/>
</head>

<body>
    <header style="width: 100%; height: 60px; background-color: #222222;">
      <nav >
          <ul style="float: right; margin-top: 20px; margin-right: 60px;">
            <!--  <li style="list-style: none; float: left; margin-right: 20px"><a href="index.php" style="color: #fff; font-family: Arial; font-size: 16px;">HOME</a></li> -->
              <?php
                echo"<form method='post' action='loginProcess.php' style='float:left'>
                    <input type='text' name='username' placeholder='Username' style='float:left; border:none; margin-right:6px;'/>
                    <input type='password' name='password' placeholder='Password' style='float:left; border:none; margin-right:6px;'/>
                    <input type='submit' value='Login' name='loginForm' style='float:left; border:none; margin-right:20px;background-color:#fff; color:#222; font-size:16px; cursor:pointer;'/>
                </form>";
              ?>
              <li style="list-style: none; float: left; margin-right: 20px"><a href="logout.php" style="color: #fff; font-family: Arial; font-size: 16px;">LOGOUT</a></li>
          </ul>
      </nav>
    </header>
</body>