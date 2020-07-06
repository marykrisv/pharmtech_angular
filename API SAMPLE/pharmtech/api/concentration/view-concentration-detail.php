<?php
//Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/ConcentrationModel.php';

//instantiate db and connect
$database = new Database();
$db = $database->connect();

// Instantiate concentration object
$cm = new ConcentrationModel($db);

//get con id
$cm->conId = isset($_GET['id']) ? $_GET['id'] : die();

//trigger exception in a "try" block
try {
    //concentration query
    $result = $cm->viewConcentrationDetail();

    //get row count
    $num = $result->rowCount();

    //Check if any concentration
    if ($num > 0) {
        // concentration array
        $con_arr['data'] = array();

        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $con_item = array(
                'conId' => $conId,
                'conValue' => $conValue,
                'conCreatedOn' => $conCreatedOn,
                'conModifiedOn' => $conModifiedOn,
                'conDeleted' => $conDeleted,
                'conCreatedBy' => $ucUsername,
                'conModifiedBy' => $umUsername
            );

            //push to "data"
            array_push($con_arr['data'], $con_item);
        }

        //turn into JSON output
        echo json_encode($con_arr);
    } else {
        echo json_encode (
            array(
                'errorCode' => '01',
                'message' => 'ERROR. No concentration found!'
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
            'errorCode'=> '02',
            'message' => $e->getMessage()
        )
    );
}
?>