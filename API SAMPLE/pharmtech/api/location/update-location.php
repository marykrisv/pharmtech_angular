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

$lm->locName = $data->locName;
$lm->locDescription = $data->locDescription;
$lm->locLatitude = $data->locLatitude;
$lm->locLongitude = $data->locLongitude;
$lm->locModifiedBy = $data->locModifiedBy;
$lm->locModifiedOn = $data->locModifiedOn;
$lm->locId = $data->locId;

//trigger exception in a "try" block
try {
    $result = $lm->checkNameUpdate();
    $num = $result->rowCount();
    if ($num > 0) {
        echo json_encode(
            array(
                'errorCode' => 05,
                'message' => 'ERROR. Location name already exists!',
                'success' => false
            )
        );
    } else {
        //user query
        $result = $lm->updateLocation();

        //get row count
        $num = $result->rowCount();

        //create user
        if ($num > 0) {
            echo json_encode(
                array(
                    'message' => 'Location successfully udpated!',
                    'success' => true
                )
            );
        } else {
            echo json_encode(
                array(
                    'errorCode' => '03',
                    'message' => 'ERROR. Location not updated!',
                    'success' => false
                )
            );
        }
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