<?php
  header('Access-Control-Allow-Origin: *');
  $taules = ['marca','tipus','emmagatzematge','processador','ram','polzades','grafica'];
  try {
    foreach ($taules as $key => $value){
      $sql = "SELECT * FROM ".$value;
      $dbh = new PDO('mysql:host=192.168.50.20;dbname=cataleg;charset=utf8','root', 'Thos-2024');
      $sth = $dbh->prepare($sql);
      $sth->execute();
      while($result = $sth->fetch(PDO::FETCH_ASSOC)){
        $data[$value][] = $result;
      }
    }
    $sth = null;
    $dbh = null;
  } catch (PDOException $e) {
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
  }
    echo json_encode($data,JSON_PRETTY_PRINT);
