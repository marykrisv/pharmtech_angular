<?php
//Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/UserModel.php';

//instantiate db and connect
$database = new Database();
$db = $database->connect();

// Instantiate user object
$um = new UserModel($db);

$data = json_decode(file_get_contents("php://input"));

$um->userName = $data->userName;
$um->userPassword = $data->userPassword;
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
$um->userStatus = $data->userStatus;
$um->userIsLocked = $data->userIsLocked;
$um->userIsNew = $data->userIsNew;
$um->userLocId = $data->userLocId;
$um->userCreatedBy = $data->userCreatedBy;

//trigger exception in a "try" block
try {
    //user query
    $result = $um->createNewUser();

    //get row count
    $num = $result->rowCount();

    //create user
    if ($num > 0) {
        echo json_encode(
            array(
                'message' => 'User successfully created!',
                'success' => true,
                'userId' => $um->userId
            )
        );
    } else {
        echo json_encode(
            array(
                'message' => 'Error. User not created!',
                'success' => false
            )
        );
    }
}  //catch exception
 catch(PDOException $e) {
    if ($e->errorInfo[1]==1062) {
        echo json_encode(
            array(
                'message' => 'Username already exists!',
                'success' => false
            )
        );
    }
} catch (Exception $e) {
    echo json_encode(
        array(
            'message' => 'Error. User not created!',
            'success' => false
        )
    );
}
?>