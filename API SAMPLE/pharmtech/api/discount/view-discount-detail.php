<?php
//Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/DiscountModel.php';

//instantiate db and connect
$database = new Database();
$db = $database->connect();

// Instantiate discount object
$dm = new DiscountModel($db);

//get discount id
$dm->disId = isset($_GET['id']) ? $_GET['id'] : die();

//trigger exception in a "try" block
try {
    //discount query
    $result = $dm->viewDiscountDetail();

    //get row count
    $num = $result->rowCount();

    //Check if any discount
    if ($num > 0) {
        // discount array
        $dis_arr['data'] = array();

        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $dis_item = array(
                'disId' => $disId,
                'disName' => $disName,
                'disPercent' => $disPercent,
                'disCreatedOn' => $disCreatedOn,
                'disModifiedOn' => $disModifiedOn,
                'disDeleted' => $disDeleted,
                'disCreatedBy' => $ucUsername,
                'disModifiedBy' => $umUsername
            );

            //push to "data"
            array_push($dis_arr['data'], $dis_item);
        }

        //turn into JSON output
        echo json_encode($dis_arr);
    } else {
        echo json_encode (
            array(
                'errorCode' => '01',
                'message' => 'ERROR. No discount found!'
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