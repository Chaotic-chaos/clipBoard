<?php
/**
 * Created by PhpStorm.
 * User: life0
 * Date: 2018/9/15
 * Time: 10:35
 */
require_once "./config.php";
$action = $_GET['action'];
switch ($action){
    case "query":
        query();
        break;
    case "insert":
        insert();
        break;
}

function query(){
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD);
//数据库是否连接成功，测试用
//        if(!$con){
//            $data_status = "Database failed";
//        }
//        else{
//            $data_status =  "Database connected";
//        }
//切换当前数据库
    mysqli_select_db($con, DB_NAME);
//数据库语句定义
    $sql = "SELECT * FROM webs";
    $res = mysqli_query($con, $sql);
    $result_number_rows = mysqli_num_rows($res);
    if (!$result_number_rows) {
        echo "No Records in database!";
    } else {
        $res_array = array();
        //映射为关联数组
        while ($row = mysqli_fetch_assoc($res)) {
            array_push($res_array, $row);
        }
        $finish = json_encode($res_array, JSON_UNESCAPED_UNICODE);
        echo $finish;
    }
    mysqli_close($con);
}

function insert(){
    $key_words = $_POST['key_words'];
    $url = $_POST['url'];
    $current_date = date("Y-m-d");
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD);
//数据库是否连接成功，测试用
//        if(!$con){
//            $data_status = "Database failed";
//        }
//        else{
//            $data_status =  "Database connected";
//        }
//切换当前数据库
    mysqli_select_db($con, DB_NAME);
//数据库语句定义
    $sql = "INSERT INTO webs VALUES(null, '".$current_date."','".$key_words."','".$url."')";
    mysqli_query($con, $sql);
    $res = mysqli_insert_id($con);
    if(!$res){
        echo "failed";
    }
    else{
        echo "success";
    }
    mysqli_close($con);
}