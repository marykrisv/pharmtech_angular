<?php
//Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE');
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

//create user
if ($um->delete()) {
    echo json_encode(
        array('message' => 'User Delete')
    );
} else {
    echo json_encode(
        array('message' => 'User not delete')
    );
}
?>