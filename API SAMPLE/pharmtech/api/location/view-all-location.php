<?php
//Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/LocationModel.php';

//instantiate db and connect
$database = new Database();
$db = $database->connect();

// Instantiate location object
$lm = new LocationModel($db);

//trigger exception in a "try" block
try {
    //location query
    $result = $lm->viewAllLocation();

    //get row count
    $num = $result->rowCount();

    //Check if any location
    if ($num > 0) {
        // location array
        $loc_arr['data'] = array();

        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $loc_item = array(
                'locId' => $locId,
                'locName' => $locName,
                'locDescription' => $locDescription,
                'locLatitude' => $locLatitude,
                'locLongitude' => $locLongitude,
                'locCreatedOn' => $locCreatedOn,
                'locCreatedBy' => $locCreatedBy,
                'locModifiedOn' => $locModifiedOn,
                'locModifiedBy' => $locModifiedBy,
                'locDeleted' => $locDeleted,
                'locCreatedBy' => $ucUsername,
                'locModifiedBy' => $umUsername,
                'total' => $total
            );

            //push to "data"
            array_push($loc_arr['data'], $loc_item);
        }

        //turn into JSON output
        echo json_encode($loc_arr);
    } else {
        echo json_encode (
            array(
                'errorCode' => '01',
                'message' => 'ERROR. No location found!'
            )
        );
    }
} catch(PDOException $e) {
    echo json_encode(
        array(
            'errorCode' => '04',
            'message' => $e->errorInfo[1]
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