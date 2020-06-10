<?php
//ini_set('memory_limit', '2048M');
//header('Content-type: text/json');
//header('Content-type: application/json');
header('Content-type: charset=ISO-8859-1');
include "connection.php";

$sJsonID = "";
$category_id = "";
$user_id = "";
$SearchParams = "";

// ja ti ne znam bas php tak da me nemoj drzat za rijec sta tu napisem, brijem da je tak

// ova isset funkcija provjerava jel varijabla setana, znaci gore smo stavili da je svaka ta
// mrtva varijabla prazan string a tu provjeravamo jel puna, ak je onda dovati taj neki kurac
if (isset($_GET['json_id'])) {
    $sJsonID = $_GET['json_id'];
}
if (isset($_GET['category_id'])) {
    $category_id = $_GET['category_id'];
}

if(isset($_GET['article_id'])) {
    $article_id = $_GET['article_id'];
}

if (isset($_GET['user_id'])) {
    $user_id = $_GET['user_id'];
}

if (isset($_GET['search_params'])) {
    $SearchParams = $_GET['search_params'];
}

$oJson = array();
switch ($sJsonID) {
    case 'dohvati_clanke':
        $sQuery = "SELECT articleID, article_title, article_content, categoryID FROM article ";
        $oRecord = $oConnection->query($sQuery);
        while ($oRow = $oRecord->fetch(PDO::FETCH_BOTH)) {
            $oClanci = new Clanak(
                $oRow['articleID'],
                $oRow['article_title'],
                $oRow['article_content'],
                $oRow['categoryID']
            );
            array_push($oJson, $oClanci);
        }
        break;

    case 'dohvati_kategorije':
        $sQuery = "SELECT categoryID, categoryName FROM category";
        $oRecord = $oConnection->query($sQuery);
        while ($oRow = $oRecord->fetch(PDO::FETCH_BOTH)) {
            $oKategorije = new Kategorija(
                $oRow['categoryID'],
                $oRow['categoryName']
            );
            array_push($oJson, $oKategorije);
        }
        break;

    // ovo tu je onaj left join da izjednacim categoryID iz tablice article i category, izi šit
    case 'dohvati_sve_iz_kategorije':
        $sQuery = "SELECT article.articleID, article.article_title, article.article_content, article.categoryID, category.categoryName FROM article LEFT JOIN category ON article.categoryID = category.categoryID WHERE category.categoryID=$category_id
    ";
        $oRecord = $oConnection->query($sQuery);
        while ($oRow = $oRecord->fetch(PDO::FETCH_BOTH)) {
            $oClanciKat = array(
                'articleID' => $oRow['articleID'],
                'article_title' => $oRow['article_title'],
                'article_content' => $oRow['article_content'],
                'categoryID' => $oRow['categoryID'],
                'categoryName' => $oRow['categoryName'],
            );
            array_push($oJson, $oClanciKat);
        }

    // ovo je ona druga funkcija za filtriranje u /category templateu, viš kak ovaj $category_id gore imamo kod isset pa ga mozemo
    // ez tu onda iskoristit
    case 'dohvati_clanke_po_id':
        $sQuery = "SELECT articleID, article_title, article_content, categoryID FROM article  WHERE categoryID = $category_id ";
        $oRecord = $oConnection->query($sQuery);
        while ($oRow = $oRecord->fetch(PDO::FETCH_BOTH)) {
            $oClanak = array(
                'articleID' => $oRow['articleID'],
                'article_title' => $oRow['article_title'],
                'article_content' => $oRow['article_content'],
                'categoryID' => $oRow['categoryID'],
            );
            array_push($oJson, $oClanak);
        }
        break;

        case 'dohvati_kategoriju_po_id':
            $sQuery = "SELECT categoryName FROM category  WHERE categoryID = $category_id ";
            $oRecord = $oConnection->query($sQuery);
            while ($oRow = $oRecord->fetch(PDO::FETCH_BOTH)) {
                $oKategorija = array(
                    'name' => $oRow['categoryName']
                );
                array_push($oJson, $oKategorija);
            }
            break;

    // ovo je fora s ovim operatorom LIKE, to sam proguglo "angularJS + php search" pa sam našo tu foru.
    // doslovno to reci ak te pita. i ovaj % smo kod enesa radili al ne sjecam se tocno, procitaj si tu
    // https://www.w3schools.com/sql/sql_like.asp
    case 'search':
        $sQuery = "SELECT articleID, article_title, article_content, categoryID FROM article WHERE (article_content LIKE '%$SearchParams%' OR article_title LIKE '%$SearchParams%')";
        $oRecord = $oConnection->query($sQuery);

        while ($oRow = $oRecord->fetch(PDO::FETCH_BOTH)) {
            $oSearchedContent = array(
                'articleID' => $oRow['articleID'],
                'article_title' => $oRow['article_title'],
                'article_content' => $oRow['article_content'],
                'categoryID' => $oRow['categoryID'],
            );
            array_push($oJson, $oSearchedContent);
        }
        break;

    case 'dohvati_tip':
        $sQuery = "SELECT DISTINCT type FROM user";
        $oRecord = $oConnection->query($sQuery);
        while ($oRow = $oRecord->fetch(PDO::FETCH_BOTH)) {
            $oType = array(
                'tip' => $oRow['type'],
            );
            array_push($oJson, $oType);
        }
        break;

    case 'edit_history':
        $sQuery = "SELECT edit_history.user_id, edit_history.article_id, edit_history.date, user.username, article.article_title FROM edit_history LEFT JOIN user ON edit_history.user_id = user.user_id LEFT JOIN article ON edit_history.article_id=article.articleID";
        $oRecord = $oConnection->query($sQuery);
        while ($oRow = $oRecord->fetch(PDO::FETCH_BOTH)) {
            $oEditHistory = array(
                'username' => $oRow['username'],
                'date' => $oRow['date'],
                'article_title' => $oRow['article_title'],
            );
            array_push($oJson, $oEditHistory);
        }
        break;
    case 'dohvati_podclanke':
        $sQuery = "SELECT subarticleID, sub_title, sub_content, articleID FROM subarticle";
        $oRecord = $oConnection->query($sQuery);
        while($oRow = $oRecord->fetch(PDO::FETCH_BOTH)) {
            $oPodclanci = new Podclanak(
                $oRow['subarticleID'],
                $oRow['sub_title'],
                $oRow['sub_content'],
                $oRow['articleID']
            );
            array_push($oJson, $oPodclanci);
        }
    break;
}
echo json_encode($oJson);
