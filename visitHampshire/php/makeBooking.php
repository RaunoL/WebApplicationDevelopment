<?php
$accID = htmlentities($_POST['accID']);
$thedate = htmlentities($_POST['thedate']);
$username = htmlentities($_POST['username']);
$npeople = htmlentities($_POST['npeople']);
$connection = curl_init();
curl_setopt($connection, CURLOPT_URL, "https://edward2.solent.ac.uk/~wad1901/api/booking/create");
$dataToPost = 
    ["accID" => $accID ,
     "thedate" => $thedate,
     "username" => $username,
     "npeople" => $npeople];
curl_setopt($connection,CURLOPT_RETURNTRANSFER,1);
curl_setopt($connection,CURLOPT_POSTFIELDS,$dataToPost);
$response = curl_exec($connection);
curl_close($connection);
echo $response;