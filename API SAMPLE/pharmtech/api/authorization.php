<?php
if (!isset($_SERVER ['PHP_AUTH_USER'])) {
    header ("WWW-Authenticatoin: Basic realm=\"Private Area\"");
    header ("HTTP/1.0 401 Unauthorized");
    print "Sorry, you need a proper credentials";
    exit;
} else {
    if (($_SERVER['PHP_AUTH_USER'] == 'mary' && ($_SERVER['PHP_AUTH_PW'] == '1234'))) {
        print "You are in the private area";
    } else {
        header ("WWW-Authenticatoin: Basic realm=\"Private Area\"");
        header ("HTTP/1.0 401 Unauthorized");
        print "Sorry, you need a proper credentials";
        exit;
    }
}
?>