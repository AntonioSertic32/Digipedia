<?php
include "connection.php";
session_start();

$oPostData = file_get_contents("php://input");
$oPostData = json_decode($oPostData);
$sActionID = $oPostData->action_id;

if (isset($_POST['action_id'])) {
    $sActionID = $_POST['action_id'];
}
$oJson = array();
switch ($sActionID) {

    
    case 'check_logged_in':
        if (isset($_SESSION['user_id'])) {

            echo json_encode(array(
                "status" => 1,
                "user_id" => $_SESSION['user_id'],
            ));
        } else {
            echo json_encode(array(
                "status" => 0,
            ));
        }
        break;

    
    case 'login':
        $Username = $oPostData->username;
        $Password = $oPostData->password;

        $sQuery = "SELECT * FROM user WHERE username='$Username' AND password='$Password'";
        $oRecord = $oConnection->query($sQuery);
        $row = $oRecord->fetch();
        $count = $oRecord->rowCount();

        if ($count > 0) {
            $_SESSION['user_id'] = $row['user_id'];
            $_SESSION['username'] = $row['username'];
            echo json_encode(array(
                "status" => 1,
                "user_id" => $_SESSION['user_id'],
            ));
        } else {
            echo json_encode(array(
                "status" => 0,
            ));
        }
        break;

    case 'check_if_admin':
        if (isset($_SESSION['user_id'])) {
            $UserID = $_SESSION['user_id'];
            $sQuery = "SELECT * FROM user WHERE user_id='$UserID'";
            $oRecord = $oConnection->query($sQuery);
            $row = $oRecord->fetch();
            $count = $oRecord->rowCount();

            if ($count > 0) {
                $_SESSION['user_id'] = $row['user_id'];
                $_SESSION['type'] = $row['type'];
                echo json_encode(array(
                    "status" => 1,
                    "user_id" => $_SESSION['user_id'],
                    "type" => $_SESSION['type'],
                ));
            } else {
                echo json_encode(array(
                    "status" => 0,
                ));
            }
        }

        break;

    
    case 'register':
        $Username = $oPostData->username;
        $Password = $oPostData->password;
        $Type = $oPostData->type;

        $sQuery = "INSERT INTO user (username, password, type) VALUES (:username, :password, :type)";

        $oData = array(
            'username' => $Username,
            'password' => $Password,
            'type' => $Type,
        );

        try
        {
            $oStatement = $oConnection->prepare($sQuery);
            $oStatement->execute($oData);
            echo 1;
        } catch (PDOException $error) {
            echo $error;
            echo 0;
        }
        break;

    case 'logout':
        session_destroy();
        break;

    
    case 'add_article':
        $CategoryID = $oPostData->categoryID;
        $Article_title = $oPostData->article_title;
        $Article_content = $oPostData->article_content;

        echo $sQuery = "INSERT INTO article (article_title, article_content, categoryID) VALUES (:article_title, :article_content, :categoryID)";
        $oStatement = $oConnection->prepare($sQuery);
        $oData = array(
            'article_title' => $Article_title,
            'article_content' => $Article_content,
            'categoryID' => $CategoryID,
        );
        try
        {
            $oStatement->execute($oData);
            echo 1;
        } catch (PDOException $error) {
            echo $error;
            echo 0;
        }
        break;

    case 'edit_article':
        $Article_title = $oPostData->article_title;
        $Article_content = $oPostData->article_content;
        $ArticleID = $oPostData->article_id;
        $UserID = $_SESSION['user_id'];
        $Date = date('Y-m-d H:i:s');

        $sQuery = "UPDATE article SET article_title='$Article_title', article_content='$Article_content' WHERE articleID ='$ArticleID'";

        $sQueryEdit = "INSERT INTO edit_history(user_id, article_id, date) VALUES (:user_id, :article_id, :date)";
        $oStatement = $oConnection->prepare($sQuery);

        $oEditStatement = $oConnection->prepare($sQueryEdit);

        $oEditData = array(
            'user_id' => $UserID,
            'article_id' => $ArticleID,
            'date' => $Date,
        );
        try
        {
            $oStatement->execute();
            $oEditStatement->execute($oEditData);
            echo 1;
        } catch (PDOException $error) {
            echo $error;
            echo 0;
        }
        break;

    case 'delete_article':
        $ArticleID = $oPostData->article_id;
        $sQuery = "DELETE FROM article WHERE articleID ='$ArticleID' ";
        $sQuerySubarticle = "DELETE FROM subarticle WHERE articleID ='$ArticleID' ";
        $oStatement = $oConnection->prepare($sQuery);
        $oStatementSubarticle = $oConnection->prepare($sQuerySubarticle);
        try
        {
            $oStatement->execute();
            $oStatementSubarticle->execute();
            echo 1;
        } catch (PDOException $error) {
            echo $error;
            echo 0;
        }
        break;

    case 'add_category':
        $Category_name = $oPostData->categoryName;

        $sQuery = "INSERT INTO category (categoryName) VALUES (:categoryName)";
        $oStatement = $oConnection->prepare($sQuery);
        $oData = array(
            'categoryName' => $Category_name,
        );
        try
        {
            $oStatement->execute($oData);
            echo 1;
        } catch (PDOException $error) {
            //echo $error;
            echo 0;
        }
        break;
    case 'add_user':
        $Username = $oPostData->username;
        $Password = $oPostData->password;
        $Type = $oPostData->type;
        $sQuery = "INSERT INTO user (username, password, type) VALUES (:username, :password, :type)";
        $oStatement = $oConnection->prepare($sQuery);
        $oData = array(
            'username' => $Username,
            'password' => $Password,
            'type' => $Type,
        );
        try
        {
            $oStatement->execute($oData);
            echo 1;
        } catch (PDOException $error) {
            echo $error;
            echo 0;
        }
        break;

    case 'delete_category':
        $CategoryID = $oPostData->category_id;
        //echo 
        $sQuery = "DELETE FROM category WHERE categoryID ='$CategoryID' ";
        $sQueryArticle = "DELETE FROM article WHERE categoryID ='$CategoryID' ";
        $oStatement = $oConnection->prepare($sQuery);
        $oStatementArticle = $oConnection->prepare($sQueryArticle);
        try
        {
            $oStatement->execute();
            $oStatementArticle->execute();
            echo 1;
        } catch (PDOException $error) {
            echo $error;
            echo 0;
        }
    break;

        case 'add_subarticle':
        $articleID = $oPostData->articleID;
        $sub_title = $oPostData->sub_title;
        $sub_content = $oPostData->sub_content;

        $sQuery = "INSERT INTO subarticle (sub_title, sub_content, articleID) VALUES (:sub_title, :sub_content, :articleID)";
        $oStatement = $oConnection->prepare($sQuery);
        $oData = array(
            'sub_title' => $sub_title,
            'sub_content' => $sub_content,
            'articleID' => $articleID,
        );
        try
        {
            $oStatement->execute($oData);
            echo 1;
        } catch (PDOException $error) {
            echo $error;
            echo 0;
        }
    break;

    case 'edit_subarticle':
        $SubarticleID = $oPostData->subarticle_id;
        $sub_title = $oPostData->sub_title;
        $sub_content = $oPostData->sub_content;
        $UserID = $_SESSION['user_id'];
        $Date = date('Y-m-d H:i:s');

        $sQuery = "UPDATE subarticle SET sub_title=:sub_title, sub_content=:sub_content WHERE subarticleID =$SubarticleID";

        $sQueryEdit = "INSERT INTO edit_history(user_id, article_id, date) VALUES (:user_id, :article_id, :date)";
        $oStatement = $oConnection->prepare($sQuery);

        $oEditStatement = $oConnection->prepare($sQueryEdit);

        $oData = array(
            'sub_title' => $sub_title,
            'sub_content' => $sub_content,
        );

        $oEditData = array(
            'user_id' => $UserID,
            'article_id' => $SubarticleID,
            'date' => $Date,
        );
        try
        {
            $oStatement->execute();
            $oEditStatement->execute($oEditData);
            echo 1;
        } catch (PDOException $error) {
            echo $error;
            echo 0;
        }
    break;

    case 'delete_subarticle':
        $SubarticleID = $oPostData->subarticle_id;
        echo $sQuery = "DELETE FROM subarticle WHERE subarticleID= $SubarticleID ";
        $oStatement = $oConnection->prepare($sQuery);
        try
        {
            $oStatement->execute();
            echo 1;
        } catch (PDOException $error) {
            echo $error;
            echo 0;
        }

    break;

    default:
        echo "greška";
        break;
}
 //slika
 /*
$connect = mysqli_connect("localhost", "root", "", "testing");  
if(!empty($_FILES))  
{  
     $path = 'upload/' . $_FILES['file']['name'];  
     if(move_uploaded_file($_FILES['file']['tmp_name'], $path))  
     {  
          $insertQuery = "INSERT INTO tbl_images(name) VALUES ('".$_FILES['file']['name']."')";  
          if(mysqli_query($connect, $insertQuery))  
          {  
               echo 'File Uploaded';  
          }  
          else  
          {  
               echo 'File Uploaded But not Saved';  
          }  
     }  
}  
else  
{  
     echo 'Some Error';  
}  
*/