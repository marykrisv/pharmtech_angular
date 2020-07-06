<?php
//Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/PrivilegeModel.php';

//instantiate db and connect
$database = new Database();
$db = $database->connect();

// Instantiate user object
$pm = new PrivilegeModel ($db);

$data = json_decode(file_get_contents("php://input"));

$pm->priUserId = $data->priUserId;
$pm->priDashboard = $data->priDashboard;
$pm->priUser = $data->priUser;
$pm->priInventory = $data->priInventory;
$pm->priManage = $data->priManage;
$pm->priPatientManagement = $data->priPatientManagement;
$pm->priPharmacyCorner = $data->priPharmacyCorner;
$pm->priNotifcation = $data->priNotification;
$pm->priPos = $data->priPos;

//trigger exception in a "try" block
try {
    //user query
    $result = $pm->updatePrivilege();

    //get row count
    $num = $result->rowCount();

    //create user
    if ($num > 0) {
        echo json_encode(
            array(
                'message' => 'Privilege successfully created!',
                'success' => true
            )
        );
    } else {
        echo json_encode(
            array(
                'errorCode' => '03',
                'message' => 'ERROR. Privilege not created!',
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