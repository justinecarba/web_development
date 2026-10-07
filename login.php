
<?php

session_start();

require_once "config.php";


/*
|--------------------------------------------------------------------------
| Only allow POST requests
|--------------------------------------------------------------------------
*/

if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    header("Location: index.html");

    exit;
}


/*
|--------------------------------------------------------------------------
| Get form data
|--------------------------------------------------------------------------
*/

$username =
    trim($_POST["username"] ?? "");

$bounty =
    trim($_POST["bounty"] ?? "");

$password =
    $_POST["password"] ?? "";


/*
|--------------------------------------------------------------------------
| Validate username
|--------------------------------------------------------------------------
*/

if ($username === "") {

    header(
        "Location: index.html?error=username"
    );

    exit;
}


/*
|--------------------------------------------------------------------------
| Validate bounty
|--------------------------------------------------------------------------
*/

if (
    $bounty === "" ||
    !is_numeric($bounty) ||
    $bounty < 0
) {

    header(
        "Location: index.html?error=bounty"
    );

    exit;
}


/*
|--------------------------------------------------------------------------
| Validate password
|--------------------------------------------------------------------------
*/

if ($password === "") {

    header(
        "Location: index.html?error=password"
    );

    exit;
}


/*
|--------------------------------------------------------------------------
| Check login
|--------------------------------------------------------------------------
*/

if (
    $username !== CAPTAIN_USERNAME ||
    $password !== CAPTAIN_PASSWORD
) {

    header(
        "Location: index.html?error=login"
    );

    exit;
}


/*
|--------------------------------------------------------------------------
| Login successful
|--------------------------------------------------------------------------
*/

session_regenerate_id(true);

$_SESSION["captain_name"] =
    $username;

$_SESSION["captain_bounty"] =
    (int)$bounty;


/*
|--------------------------------------------------------------------------
| Go to dashboard
|--------------------------------------------------------------------------
*/

header(
    "Location: dashboard.php"
);

exit;