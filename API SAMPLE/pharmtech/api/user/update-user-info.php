<?php
//Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/UserModel.php';

//instantiate db and connect
$database = new Database();
$db = $database->connect();

// Instantiate user object
$um = new UserModel($db);

$data = json_decode(file_get_contents("php://input"));

$um->userId = $data->userId;
$um->userName = $data->userName;
$um->userFname = $data->userFname;
$um->userMname = $data->userMname;
$um->userLname = $data->userLname;
$um->userGender = $data->userGender;
$um->userBirthdate = $data->userBirthdate;
$um->userAddress = $data->userAddress;
$um->userCitizenship = $data->userCitizenship;
$um->userContactNo = $data->userContactNo;
$um->userRole = $data->userRole;
$um->userLicenseNo = $data->userLicenseNo;
$um->userLocId = $data->userLocId;
$um->userModifiedBy = $data->userModifiedBy;
$um->userModifiedOn = $data->userModifiedOn;

//trigger exception in a "try" block
try {

    //check for username duplicate
    //user query
    $result = $um->checkUsernameUpdate();
    $num = $result->rowCount();
    if ($num > 0) {
        echo json_encode(
            array(
                'errorCode' => '05',
                'message' => 'Error. Username already exists!',
                'success' => false
            )
        );
    } else {
        //user query
        $result = $um->updateUserInformation();

        //get row count
        $num = $result->rowCount();

        //create user
        if ($num > 0) {
            echo json_encode(
                array(
                    'message' => 'User successfully updated!',
                    'success' => true
                )
            );
        } else {
            echo json_encode(
                array(
                    'errorCode' => '03',
                    'message' => 'ERROR. User not updated!',
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
    echo json_encode(
        array(
            'errorCode' => '02',
            'message' => $e->getMessage(),
            'success' => false
        )
    );
}
?>