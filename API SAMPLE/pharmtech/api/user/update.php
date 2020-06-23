<?php
//Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/UserModel.php';

//instantiate db and connect
$database = new Database();
$db = $database->connect();

// Instantiate user object
$um = new UserModel($db);

$data = json_decode(file_get_contents("php://input"));

//set ID to update
$um->userId = $data->userId;

$um->userName = $data->userName;
$um->userFname = $data->userFname;
$um->userLname = $data->userLname;

//create user
if ($um->update()) {
    echo json_encode(
        array('message' => 'User Updated')
    );
} else {
    echo json_encode(
        array('message' => 'User not updated')
    );
}
?>