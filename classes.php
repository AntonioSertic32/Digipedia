<?php
class Configuration
{
    public $host = 'localhost';
    public $dbName = 'wikipedia';
    public $username = 'root';
    public $password = '';
};
class Admin
{
    public $id = '';
    public $korisnicko_ime = '';
    public $lozinka = '';
    public function __construct($nID, $sKorisnicko_ime, $sLozinka)
    {
        $this->id = $nID;
        $this->korisnicko_ime = $sKorisnicko_ime;
        $this->lozinka = $sLozinka;
    }
}
class Clanak
{
    public $articleID = 'N/A';
    public $article_title = 'N/A';
    public $article_content = 'N/A';
    public $categoryID = 'N/A';
    public function __construct($articleID = null, $article_title = null, $article_content = null, $categoryID = null)
    {
        if ($articleID) {
            $this->articleID = $articleID;
        }

        if ($article_title) {
            $this->article_title = $article_title;
        }

        if ($article_content) {
            $this->article_content = $article_content;
        }

        if ($categoryID) {
            $this->categoryID = $categoryID;
        }

    }
}
class Kategorija
{
    public $categoryID = 'N/A';
    public $categoryName = 'N/A';
    public function __construct($categoryID = null, $categoryName = null)
    {
        if ($categoryID) {
            $this->categoryID = $categoryID;
        }

        if ($categoryName) {
            $this->categoryName = $categoryName;
        }

    }
}
class Podclanak
{
    public $id = '';
    public $title = '';
    public $content = '';
    public $mainArticleID = '';
    public function __construct($nID, $sTitle, $sContent, $nMainArticleID)
    {
        $this->id = $nID;
        $this->title = $sTitle;
        $this->content = $sContent;
        $this->mainArticleID = $nMainArticleID;
    }
}

class SingleClanak
{
    public $categoryName = 'N/A';
    public $article_title = 'N/A';
    public $article_content = 'N/A';
    //public $content ='N/A';
    public function __construct($categoryName, $article_title, $article_content)
    {
        $this->$categoryName = $$categoryName;
        $this->article_title = $article_title;
        $this->article_content = $article_content;
        //$this->content = $content;
    }
}
