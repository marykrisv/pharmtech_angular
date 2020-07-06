<?php
//Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/ConcentrationModel.php';

//instantiate db and connect
$database = new Database();
$db = $database->connect();

// Instantiate concentration object
$cm = new ConcentrationModel ($db);

$data = json_decode(file_get_contents("php://input"));

$cm->conValue = $data->conValue;
$cm->conModifiedBy = $data->conModifiedBy;
$cm->conModifiedOn = $data->conModifiedOn;
$cm->conId = $data->conId;

//trigger exception in a "try" block
try {
    $result = $cm->checkValueUpdate();
    $num = $result->rowCount();
    if ($num > 0) {
        echo json_encode(
            array(
                'errorCode' => 05,
                'message' => 'ERROR. Concentration value already exists!',
                'success' => false
            )
        );
    } else {
        //concentration query
        $result = $cm->updateConcentration();

        //get row count
        $num = $result->rowCount();

        //create concentration
        if ($num > 0) {
            echo json_encode(
                array(
                    'message' => 'Concentration successfully udpated!',
                    'success' => true
                )
            );
        } else {
            echo json_encode(
                array(
                    'errorCode' => '03',
                    'message' => 'ERROR. Concentration not updated!',
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