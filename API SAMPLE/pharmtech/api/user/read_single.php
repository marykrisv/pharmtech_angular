<?php
//Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

//instantiate db and connect
$database = new Database();
$db = $database->connect();

// Instantiate user object
$um = new UserModel($db);

// //get id
// $um->userId = isset($_GET['id']) ? $_GET['id'] : die();

// Instantiate user object
$um = new UserModel($db);

$data = json_decode(file_get_contents("php://input"));

// get post
$um->read_single();

//user query
$user_arr = array(
    'userId' => $um->userId,
    'userName' => $um->userName,
    'userFname' => $um->userFname,
    'userLname' => $um->userLname
);

//print json
echo json_encode($user_arr);
?>