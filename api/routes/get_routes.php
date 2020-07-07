<?php
$app->get('/accommodation/{location}', function ($req, $res, array $args) {
    $stmt = $this->db->prepare("SELECT * FROM accommodation WHERE location=?");
    $stmt->bindParam (1, $args['location']);
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if(empty($results)){
        return $res->withStatus(404);
    }
    return $res->withJson($results);
});

$app->get('/accommodation/{location}/{type}', function ($req, $res, array $args) {
    $stmt = $this->db->prepare("SELECT * FROM accommodation WHERE location=:location AND type=:type");
    $stmt->bindParam ('location', $args['location']);
    $stmt->bindParam ('type', $args['type']);
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if(empty($results)){
        return $res->withStatus(404);
    }
    return $res->withJson($results);
});

$app->get('/availability/{id}', function ($req, $res, array $args) {
    $stmt = $this->db->prepare("SELECT availability FROM acc_dates WHERE accID=:accID");
    $stmt->bindParam ('accID', $args['id']);
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if(empty($results)){
        return $res->withStatus(404);
    }
    return $res->withJson($results);
});