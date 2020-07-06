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
$pm = new PrivilegeModel($db);

$data = json_decode(file_get_contents("php://input"));

$pm->priUserId = $data->priUserId;

//trigger exception in a "try" block
try {
    //user query
    $result = $pm->getPrivilege();

    //get row count
    $num = $result->rowCount();

    //Check if any user
    if ($num > 0) {
        // user array
        // $user_arr = array();
        $user_arr['data'] = array();

        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $user_item = array(
                'priUserId' => $priUserId,
                'priDashboard' => $priDashboard,
                'priUser' => $priUser,
                'priInventory' => $priInventory,
                'priManage' => $priManage,
                'priPatientManagement' => $priPatientManagement,
                'priPharmacyCorner' => $priPharmacyCorner,
                'priNotification' => $priNotification,
                'priPos' => $priPos
            );

            //push to "data"
            array_push($user_arr['data'], $user_item);
        }

        //turn into JSON output
        echo json_encode($user_arr);
    } else {
        echo json_encode (
            array(
                'errorCode' => '01',
                'message' => 'ERROR. No privilege found!'
            )
        );
    }
} catch(PDOException $e) {
    echo json_encode(
        array(
            'errorCode' => '04',
            'message' => $e->getMessage()
        )
    );
} catch(Exception $e) {
    echo json_encode(
        array(
            'errorCode' => '02',
            'message' => $e->getMessage()
        )
    );
}





?>