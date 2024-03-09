<?php
// header('Access-Control-Allow-Origin: *');
// print_r(file_get_contents('php://input'));
$q = json_decode(file_get_contents('php://input'), true);
$limit = 9;
  if ($q){
    $data = [];
    // Genera la query
    $query = "SELECT * FROM productes WHERE (";
    $keys = array_keys($q);
    $i = 1;
    foreach ($q as $key=>$value) {
       foreach ($value as $k=>$v){
        if ($k<count($value)-1){
          $query .= " ".$key."= ? or ";
        }else {
          $query .= " ".$key."= ?)";
        }
        $data[]=$v;
      }
      if ($i < count($keys)){
        $query .= " and (";
      };
      $i++;
    }
    $sql = $query . "ORDER BY preu ASC LIMIT " . $limit;
  }else {
    $sql = "SELECT * FROM productes ORDER BY preu ASC LIMIT $limit";
  }
 
  try {
    $dbh = new PDO('mysql:host=192.168.50.20;dbname=cataleg;charset=utf8','root', 'Thos-2024');
    $sth = $dbh->prepare($sql);
    $sth->execute($data);
    $result = $sth->fetchAll(PDO::FETCH_ASSOC);
  } catch (PDOException $e) {
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
  }
 echo json_encode($result);
