<?php
//Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/UserModel.php';

//instantiate db and connect
$database = new Database();
$db = $database->connect();

// Instantiate user object
$um = new UserModel($db);

//get loc id
$um->userLocId = isset($_GET['locid']) ? $_GET['locid'] : die();
//get search by
$um->userStatus = isset($_GET['status']) ? $_GET['status'] : die();
$um->limit = isset($_GET['limit']) ? $_GET['limit']: 50;

//trigger exception in a "try" block
try {
    //user query
    $result = $um->viewByStatusOneLocation();

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
                'userId' => $userId,
                'userName' => $userName,
                'userPassword' => $userPassword,            
                'userFname' => $userFname,
                'userMname' => $userMname,
                'userLname' => $userLname,
                'userGender' => $userGender,
                'userBirthdate' => $userBirthdate,
                'userAddress' => $userAddress,
                'userCitizenship' => $userCitizenship,
                'userContactNo' => $userContactNo,
                'userRole' => $userRole,
                'userLicenseNo' => $userLicenseNo,
                'userStatus' => $userStatus,
                'userIsNew' => $userIsNew,
                'userLocId' => $userLocId,
                'userCreatedOn' => $userCreatedOn,
                'userCreatedBy' => $userCreatedBy,
                'userModifiedOn' => $userModifiedOn,
                'userModifiedBy' => $userModifiedBy,
                'userDeleted' => $userDeleted,
                'locName' => $locName,
                'total' => $total
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
                'message' => 'ERROR. No user found!'
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