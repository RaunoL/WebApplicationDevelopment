<?php
$app->post('/booking/create', function ($req, $res, array $args) {
    
    $booking = $req->getParsedBody();
    $npeople = (int)$booking['npeople'];
    $accID = (int)$booking['accID'];

    

    if(is_int($npeople) and is_int($accID)){
        if($accID=="" or $booking['thedate']=="" or $npeople=="" or $booking['username']==""){
            return $res->withStatus(400);
        }

        $year = (int)substr($booking['thedate'], 0, -4);
        $month = (int)substr($booking['thedate'], 2, -2);
        $day = (int)substr($booking['thedate'], 4);
        if(!checkdate($month, $day, $year)){
            return $res->withStatus(400);
        }
    
        $stmt = $this->db->prepare("SELECT * FROM acc_dates WHERE accID=:accID AND thedate=:thedate");
        $stmt->bindParam ('accID', $booking['accID']);
        $stmt->bindParam ('thedate', $booking['thedate']);
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if($results[0]['availability']<$booking['npeople']){
            return $res->withJson($results[0]['availability'], 410);
        }
    
            
        $stmt = $this->db->prepare("INSERT INTO acc_bookings (accID, thedate, username, npeople) VALUES (:accID, :thedate, :username, :npeople)");
        $stmt->bindParam (':accID', $booking['accID']);
        $stmt->bindParam (':thedate', $booking['thedate']);
        $stmt->bindParam (':npeople', $booking['npeople']);
        $stmt->bindParam (':username', $booking['username']);
        $stmt->execute();
    
        $stmt = $this->db->prepare("UPDATE acc_dates
        SET availability = availability - :npeople
        WHERE accID = :accID AND thedate = :thedate");
        $stmt->bindParam (':thedate', $booking['thedate']);
        $stmt->bindParam (':accID', $booking['accID']);
        $stmt->bindParam (':npeople', $booking['npeople']);
        $stmt->execute();    
        return  $res->withJson($booking, 201);
    }
    else{
        return $res->withStatus(400);
    }



});