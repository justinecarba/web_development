
<?php

session_start();


/*
|--------------------------------------------------------------------------
| Protect dashboard
|--------------------------------------------------------------------------
*/

if (
    !isset($_SESSION["captain_name"])
) {

    header(
        "Location: index.html"
    );

    exit;
}


$captainName =
    $_SESSION["captain_name"];

$captainBounty =
    $_SESSION["captain_bounty"];


/*
|--------------------------------------------------------------------------
| Determine rank
|--------------------------------------------------------------------------
*/

if ($captainBounty >= 1000000000) {

    $rank = "EMPEROR";
    $rarity = "MYTHIC";

} elseif ($captainBounty >= 500000000) {

    $rank = "WARLORD";
    $rarity = "LEGENDARY";

} elseif ($captainBounty >= 100000000) {

    $rank = "COMMANDER";
    $rarity = "EPIC";

} elseif ($captainBounty >= 10000000) {

    $rank = "SUPERNOVA";
    $rarity = "RARE";

} else {

    $rank = "ROOKIE";
    $rarity = "COMMON";
}


$formattedBounty =
    number_format($captainBounty);

?>

<!DOCTYPE html>

<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>
        Grand Line Dashboard
    </title>

    <link
        rel="stylesheet"
        href="style.css"
    >

</head>

<body
    data-rarity="<?php echo strtolower($rarity); ?>"
>

    <div class="stars"></div>

    <main class="login-page">

        <div class="card">

            <div class="card-header">

                <div class="logo">
                    ☠
                </div>

                <h1>
                    WELCOME
                </h1>

                <p>
                    GRAND LINE
                </p>

                <div class="rarity-badge">

                    <?php
                    echo htmlspecialchars(
                        $rarity
                    );
                    ?>

                </div>

            </div>


            <div class="rank-preview">

                <span>
                    CAPTAIN
                </span>

                <strong>

                    <?php
                    echo htmlspecialchars(
                        $captainName
                    );
                    ?>

                </strong>

            </div>


            <div class="rank-preview">

                <span>
                    BOUNTY
                </span>

                <strong>
                    ฿<?php
                    echo $formattedBounty;
                    ?>
                </strong>

            </div>


            <div class="rank-preview">

                <span>
                    RANK
                </span>

                <strong>

                    <?php
                    echo $rank;
                    ?>

                </strong>

            </div>


            <button
                class="login-button"
                onclick="window.location.href='logout.php'"
            >

                <span>
                    RETURN TO SEA
                </span>

                <span>
                    →
                </span>

            </button>

        </div>

    </main>

</body>

</html>