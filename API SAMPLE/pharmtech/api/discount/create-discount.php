<?php
//Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/DiscountModel.php';

//instantiate db and connect
$database = new Database();
$db = $database->connect();

// Instantiate discount object
$dm = new DiscountModel ($db);

$data = json_decode(file_get_contents("php://input"));

$dm->disName = $data->disName;
$dm->disPercent = $data->disPercent;
$dm->disCreatedBy = $data->disCreatedBy;

//trigger exception in a "try" block
try {
    $result = $dm->checkNameAdd();
    $num = $result->rowCount();
    if ($num > 0) {
        echo json_encode(
            array(
                'errorCode' => 05,
                'message' => 'ERROR. Discount value already exists!',
                'success' => false
            )
        );
    } else {
        //concentration query
        $result = $dm->createDiscount();

        //get row count
        $num = $result->rowCount();

        //create concentration
        if ($num > 0) {
            echo json_encode(
                array(
                    'message' => 'Discount successfully created!',
                    'success' => true
                )
            );
        } else {
            echo json_encode(
                array(
                    'errorCode' => '03',
                    'message' => 'ERROR. Discount not created!',
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