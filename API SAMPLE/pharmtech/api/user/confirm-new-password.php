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
$um->userPassword = $data->userPassword;

//trigger exception in a "try" block
try {
    //user query
    $result = $um->confirmNewPassword();

    //get row count
    $num = $result->rowCount();

    // update password
    if ($num > 0) {
        echo json_encode(
            array(
                'message' => 'User password successfully updated!',
                'success' => true
            )
        );
    } else {
        echo json_encode(
            array(
                'errorCode' => '03',
                'message' => 'ERROR. User password not updated!',
                'success' => false
            )
        );
    }
} catch(PDOException $e) {
    echo json_encode(
        array(
            'errorCode' => '04',
            'message' => $e->getMessage(),
            'success' => false
        )
    );
} catch(Exception $e) {
    echo json_encode(
        array(
            'errorCode' => '02',
            'message' => $e->getMessage(),
            'success' => false
        )
    );
}
?>