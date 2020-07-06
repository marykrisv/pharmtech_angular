<?php
//Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/DiscountModel.php';

//instantiate db and connect
$database = new Database();
$db = $database->connect();

// Instantiate discount object
$dm = new DiscountModel ($db);

$data = json_decode(file_get_contents("php://input"));

$dm->disId = $data->disId;
$dm->disModifiedOn = $data->disModifiedOn;
$dm->disModifiedBy = $data->disModifiedBy;

//trigger exception in a "try" block
try {
    //discount query
    $result = $dm->deleteDiscount();

    //get row count
    $num = $result->rowCount();

    //create discount
    if ($num > 0) {
        echo json_encode(
            array(
                'message' => 'Discount successfully deleted!',
                'success' => true
            )
        );
    } else {
        echo json_encode(
            array(
                'errorCode' => '03',
                'message' => 'ERROR. Discount not deleted!',
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