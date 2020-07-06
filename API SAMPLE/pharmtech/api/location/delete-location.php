<?php
//Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/LocationModel.php';

//instantiate db and connect
$database = new Database();
$db = $database->connect();

// Instantiate user object
$lm = new LocationModel ($db);

$data = json_decode(file_get_contents("php://input"));

$lm->locId = $data->locId;
$lm->locModifiedOn = $data->locModifiedOn;
$lm->locModifiedBy = $data->locModifiedBy;

//trigger exception in a "try" block
try {
    //user query
    $result = $lm->deleteLocation();

    //get row count
    $num = $result->rowCount();

    //create user
    if ($num > 0) {
        echo json_encode(
            array(
                'message' => 'Location successfully deleted!',
                'success' => true
            )
        );
    } else {
        echo json_encode(
            array(
                'errorCode' => '03',
                'message' => 'ERROR. Location not deleted!',
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
    print($e);
    echo json_encode(
        array(
            'errorCode' => '02',
            'message' => $e->getMessage(),
            'success' => false
        )
    );
}
?>