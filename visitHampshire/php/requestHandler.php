<?php
$type = htmlentities($_GET['type']);
$connection = curl_init();
curl_setopt($connection, CURLOPT_URL, "https://edward2.solent.ac.uk/~wad1901/api/accommodation/Hampshire/{$type}");
curl_setopt($connection,CURLOPT_RETURNTRANSFER,1);
curl_setopt($connection,CURLOPT_HEADER, 0);
$response = curl_exec($connection);
$info = curl_getinfo($connection);

if($info['http_code']==200){
    echo $response;
} 
else{
    echo $info['http_code'] ;
}
curl_close($connection);

?>